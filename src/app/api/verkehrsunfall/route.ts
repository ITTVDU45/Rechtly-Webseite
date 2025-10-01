import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import connectDB from '@/lib/db/connection';
import Anfrage from '@/lib/db/models/Anfrage';
import Document from '@/lib/db/models/Document';
import emailService from '@/lib/services/emailService';

// Validierungsschema für Verkehrsunfall-Anfrage
const verkehrsunfallSchema = z.object({
  vorname: z.string().min(2, 'Vorname muss mindestens 2 Zeichen lang sein'),
  nachname: z.string().min(2, 'Nachname muss mindestens 2 Zeichen lang sein'),
  email: z.string().email('Ungültige E-Mail-Adresse'),
  telefon: z.string().optional(),
  strasse: z.string().min(1, 'Straße ist erforderlich'),
  hausnummer: z.string().optional(),
  plz: z.string().regex(/^[0-9]{5}$/, 'PLZ muss aus 5 Ziffern bestehen'),
  ort: z.string().min(1, 'Ort ist erforderlich'),
  unfallverursacher: z.string().optional(),
  unfallDatum: z.string().min(1, 'Unfalldatum ist erforderlich'),
  unfallZeit: z.string().optional(),
  weitereAngaben: z.string().optional(),
  unfallhergang: z.string().optional(),
  reaktion: z.object({
    gebremst: z.boolean().optional(),
    ausgewichen: z.boolean().optional(),
    keineReaktion: z.boolean().optional()
  }).optional(),
  verkehrszeichen: z.object({
    ampel: z.boolean().optional(),
    verkehrsschild: z.boolean().optional(),
    keine: z.boolean().optional()
  }).optional(),
  fahrzeugDetails: z.object({
    markeModell: z.string().optional(),
    kennzeichen: z.string().optional(),
    farbe: z.string().optional(),
    erstzulassung: z.string().optional(),
    weitereSchaeden: z.string().optional()
  }).optional(),
  polizei: z.object({
    verstaendigt: z.string().optional(),
    polizeibericht: z.array(z.string()).optional()
  }).optional(),
  zeugen: z.object({
    vorhanden: z.string().optional(),
    details: z.string().optional()
  }).optional(),
  personenschaden: z.string().optional(),
  rettungsdienst: z.string().optional(),
  bilder: z.array(z.object({
    id: z.string()
  })).optional(),
  dsgvoEinwilligung: z.boolean().refine(val => val === true, 'DSGVO-Einwilligung ist erforderlich'),
  anwaltEinwilligung: z.boolean().refine(val => val === true, 'Anwalt-Einwilligung ist erforderlich')
});

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    // Validierung der Eingabedaten
    const validationResult = verkehrsunfallSchema.safeParse(body);
    
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

    const data = validationResult.data;

    // Extrahiere die Bild-IDs aus den hochgeladenen Bildern
    const imageIds = data.bilder?.map(bild => bild.id) || [];
    
    // Hole die Bild-Metadaten aus der Document-Collection
    let dokumente: Array<{ id: string; name: string; path: string }> = [];
    
    if (imageIds.length > 0) {
      const documents = await Document.find({ _id: { $in: imageIds } });
      dokumente = documents.map(doc => ({
        id: doc._id.toString(),
        name: doc.filename || doc.originalName || '',
        path: doc.path || ''
      }));
    }

    // Baue das Anfrage-Objekt für MongoDB
    const anfrageObj = {
      anfrageTyp: 'verkehrsunfall',
      vorname: data.vorname,
      nachname: data.nachname,
      email: data.email,
      telefon: data.telefon || '',
      strasse: data.strasse,
      hausnummer: data.hausnummer || '',
      plz: data.plz,
      ort: data.ort,
      verkehrsunfall: {
        unfallverursacher: data.unfallverursacher,
        unfallDatum: new Date(data.unfallDatum),
        unfallZeit: data.unfallZeit,
        strasse: data.strasse,
        plz: data.plz,
        weitereAngaben: data.weitereAngaben,
        unfallhergang: data.unfallhergang,
        reaktion: data.reaktion,
        verkehrszeichen: data.verkehrszeichen,
        fahrzeugDetails: data.fahrzeugDetails,
        polizei: data.polizei,
        zeugen: data.zeugen,
        personenschaden: data.personenschaden,
        rettungsdienst: data.rettungsdienst
      },
      dokumente,
      datenschutz: data.dsgvoEinwilligung,
      anwaltEinwilligung: data.anwaltEinwilligung,
      status: 'neu'
    };

    // Speichere die Anfrage in MongoDB
    const anfrage = new Anfrage(anfrageObj);
    await anfrage.save();

    // Sende Bestätigungs-E-Mail an den Kunden
    await emailService.sendAnfrageConfirmation(
      data.email, 
      'Verkehrsunfall', 
      anfrage._id.toString()
    );

    // Sende Benachrichtigung an den Admin
    await emailService.sendAdminNotification(
      'Verkehrsunfall',
      anfrage._id.toString(),
      data.email
    );

    // Erfolgreiche Antwort
    return NextResponse.json({
      success: true,
      message: 'Verkehrsunfall-Anfrage erfolgreich eingereicht',
      data: {
        anfrageId: anfrage._id,
        status: anfrage.status,
        eingereichtAm: anfrage.erstelltAm
      }
    });

  } catch (error) {
    console.error('Verkehrsunfall API Error:', error);
    
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
