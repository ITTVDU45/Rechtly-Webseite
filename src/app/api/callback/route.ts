import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

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

    // Hier würde später die Weiterleitung an n8n erfolgen
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
    
    if (n8nWebhookUrl) {
      try {
        // Weiterleitung an n8n (später implementieren)
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
      message: 'Telefonnummer erfolgreich empfangen',
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
