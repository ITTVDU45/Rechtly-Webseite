import { NextResponse } from 'next/server';
import { mongoClient } from '@/lib/db/connection';
import { ObjectId } from 'mongodb';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // In MongoDB speichern
    try {
      await mongoClient.connect();
      const db = mongoClient.db("rechtly");
      const collection = db.collection("anfragen");
      
      // Füge Zeitstempel hinzu
      const documentToInsert = {
        ...body,
        erstelltAm: new Date(),
        aktualisiertAm: new Date(),
        status: 'neu'
      };
      
      const result = await collection.insertOne(documentToInsert);
      console.log(`Anfrage in MongoDB gespeichert mit ID: ${result.insertedId}`);
      
      // Dokumente-Referenzen aktualisieren, falls vorhanden
      if (body.dokumente && body.dokumente.length > 0) {
        const dokumenteCollection = db.collection("dokumente");
        
        for (const dokument of body.dokumente) {
          await dokumenteCollection.updateOne(
            { _id: new ObjectId(dokument.id) },
            { $set: { anfrageId: result.insertedId.toString() } }
          );
        }
      }
    } catch (dbError) {
      console.error('MongoDB Fehler:', dbError);
      // Wir loggen den Fehler, fahren aber fort
    }

    // An n8n Webhook weiterleiten
    const webhook = process.env.N8N_WEBHOOK_URL;
    if (webhook) {
      await fetch(webhook, { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({
          ...body,
          timestamp: new Date().toISOString(),
          source: 'rechtly-website-anliegen'
        }) 
      });
    } else {
      console.log('N8N_WEBHOOK_URL nicht konfiguriert, überspringe Weiterleitung');
    }

    return NextResponse.json({ 
      ok: true, 
      message: 'Anfrage erfolgreich gespeichert',
      id: `anliegen_${Date.now()}`
    });
  } catch (e: any) {
    console.error('Fehler bei der Verarbeitung der Anfrage:', e);
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}