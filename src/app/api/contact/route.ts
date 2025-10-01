import { NextResponse } from 'next/server';
import emailService from '@/lib/services/emailService';
import { mongoClient } from '@/lib/db/connection';

// Einfache Validierungsfunktionen
function validateEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email);
}

function validatePhone(phone: string) {
  return !phone || /^(\+49|0)[0-9]{6,14}$/.test(phone.replace(/\s/g, ''));
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, address, message, recaptchaToken } = body;

    // Validierung der Eingabedaten
    if (!firstName || !lastName) {
      return NextResponse.json({ success: false, error: 'Bitte gib deinen Vor- und Nachnamen ein.' }, { status: 400 });
    }

    if (!validateEmail(email)) {
      return NextResponse.json({ success: false, error: 'Bitte gib eine gültige E-Mail-Adresse ein.' }, { status: 400 });
    }

    if (phone && !validatePhone(phone)) {
      return NextResponse.json({ success: false, error: 'Bitte gib eine gültige Telefonnummer ein.' }, { status: 400 });
    }

    if (!message || message.length < 10) {
      return NextResponse.json({ success: false, error: 'Deine Nachricht sollte mindestens 10 Zeichen enthalten.' }, { status: 400 });
    }

    // Optional: reCAPTCHA-Validierung
    if (recaptchaToken) {
      // Hier könnte die reCAPTCHA-Validierung erfolgen
      // Für diese Implementierung überspringen wir die tatsächliche Validierung
    }

    // In MongoDB speichern
    try {
      await mongoClient.connect();
      const db = mongoClient.db("rechtly");
      const collection = db.collection("kontaktanfragen");
      
      const result = await collection.insertOne({
        firstName,
        lastName,
        email,
        phone,
        address,
        message,
        timestamp: new Date(),
        status: 'neu'
      });
      
      console.log(`Kontaktanfrage in MongoDB gespeichert mit ID: ${result.insertedId}`);
    } catch (dbError) {
      console.error('MongoDB Fehler:', dbError);
      // Wir loggen den Fehler, fahren aber fort
    }

    // Direkt mit Nodemailer senden, ohne emailService
    try {
      const nodemailer = require('nodemailer');
      
      // Transporter erstellen
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.office365.com',
        port: Number(process.env.SMTP_PORT || 587),
        secure: process.env.SMTP_SECURE === 'true' || false,
        auth: {
          user: process.env.SMTP_USER || 'noreply@rechtly.de',
          pass: process.env.SMTP_PASS || 'B^230659779465oq'
        }
      });
      
      // E-Mail an Support senden
      await transporter.sendMail({
        from: 'noreply@rechtly.de',
        to: 'support@rechtly.de',
        subject: 'Neue Kontaktanfrage über die Webseite',
        html: `
          <h1>Neue Kontaktanfrage</h1>
          <p><strong>Von:</strong> ${firstName} ${lastName}</p>
          <p><strong>E-Mail:</strong> ${email}</p>
          <p><strong>Telefon:</strong> ${phone || 'Nicht angegeben'}</p>
          <p><strong>Adresse:</strong> ${address || 'Nicht angegeben'}</p>
          <p><strong>Nachricht:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <p><small>Diese Anfrage wurde am ${new Date().toLocaleDateString('de-DE')} um ${new Date().toLocaleTimeString('de-DE')} über das Kontaktformular der Webseite gesendet.</small></p>
        `
      });
      
      // Bestätigungsmail an den Absender senden
      await transporter.sendMail({
        from: 'noreply@rechtly.de',
        to: email,
        subject: 'Deine Anfrage bei Rechtly',
        html: `
          <h1>Vielen Dank für deine Anfrage!</h1>
          <p>Hallo ${firstName} ${lastName},</p>
          <p>wir haben deine Kontaktanfrage erhalten und werden uns schnellstmöglich bei dir melden.</p>
          <p>Deine Nachricht:</p>
          <blockquote style="border-left: 4px solid #ccc; padding-left: 15px; margin-left: 0; color: #666;">
            ${message.replace(/\n/g, '<br>')}
          </blockquote>
          <p>Mit freundlichen Grüßen,<br>Dein Rechtly-Team</p>
          <hr>
          <p><small>Dies ist eine automatisch generierte E-Mail. Bitte antworte nicht auf diese Nachricht.</small></p>
        `
      });
      
      console.log('E-Mails erfolgreich gesendet');
    } catch (emailError) {
      console.error('Fehler beim Senden der E-Mails:', emailError);
      // Wir loggen den Fehler, fahren aber fort
    }

    // Erfolgreiche Antwort
    return NextResponse.json({
      success: true,
      message: 'Deine Nachricht wurde erfolgreich versendet.',
    });

  } catch (error: any) {
    console.error('Kontaktformular API Error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Es ist ein Fehler aufgetreten. Bitte versuche es später erneut.' 
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