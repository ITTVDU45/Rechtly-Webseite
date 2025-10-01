import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { mongoClient } from '@/lib/db/connection';

// Validierungsschema für die Telefonnummer
const phoneSchema = z.object({
  phone: z.string().min(10, 'Telefonnummer muss mindestens 10 Zeichen lang sein')
    .regex(/^[\+]?[0-9\s\-\(\)]+$/, 'Ungültige Telefonnummer')
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validierung der Eingabedaten
    const validationResult = phoneSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validierungsfehler',
          details: validationResult.error.issues 
        },
        { status: 400 }
      );
    }

    const { phone } = validationResult.data;

    // MongoDB-Verbindung herstellen und Daten speichern
    try {
      await mongoClient.connect();
      const db = mongoClient.db("rechtly");
      const collection = db.collection("callbacks");
      
      // Eintrag in MongoDB speichern
      const result = await collection.insertOne({
        phone,
        timestamp: new Date(),
        source: 'rechtly-website',
        status: 'neu'
      });
      
      console.log(`Callback in MongoDB gespeichert mit ID: ${result.insertedId}`);
    } catch (dbError) {
      console.error('MongoDB Fehler:', dbError);
      // Wir loggen den Fehler, aber brechen nicht ab
    } finally {
      // Verbindung nicht schließen, da wir einen Connection Pool verwenden
    }

    // Weiterleitung an n8n Webhook
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
    
    if (n8nWebhookUrl) {
      try {
        const response = await fetch(n8nWebhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phone,
            timestamp: new Date().toISOString(),
            source: 'rechtly-website'
          })
        });

        if (!response.ok) {
          console.error('N8N Webhook failed:', response.statusText);
        }
      } catch (error) {
        console.error('Error forwarding to N8N:', error);
        // Fallback: Wir loggen den Fehler, aber geben trotzdem eine positive Antwort
      }
    } else {
      console.log('N8N_WEBHOOK_URL nicht konfiguriert, überspringe Weiterleitung');
    }

    // Erfolgreiche Antwort
    return NextResponse.json({
      success: true,
      message: 'Telefonnummer erfolgreich empfangen und gespeichert',
      data: {
        phone,
        timestamp: new Date().toISOString(),
        id: `callback_${Date.now()}`
      }
    });

  } catch (error) {
    console.error('Callback API Error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Interner Serverfehler' 
      },
      { status: 500 }
    );
  }
}

// OPTIONS für CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}