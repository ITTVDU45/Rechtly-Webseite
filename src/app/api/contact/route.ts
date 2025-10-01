import { NextResponse } from 'next/server';
import type { TransportOptions } from 'nodemailer';
import type { Transporter } from 'nodemailer';
import nodemailer from 'nodemailer';

// Einfache Validierungsfunktionen
function validateEmail(email: string): boolean {
  return /\S+@\S+\.\S+/.test(email);
}

function validatePhone(phone: string): boolean {
  return !phone || /^(\+49|0)[0-9]{6,14}$/.test(phone.replace(/\s/g, ''));
}

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  message: string;
  recaptchaToken?: string;
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json() as ContactFormData;
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

    // Für Vercel-Deployment: Speichere die Anfrage nur lokal und sende keine E-Mail
    // In einer späteren Phase kann hier die MongoDB-Integration und E-Mail-Versand hinzugefügt werden
    console.log('Kontaktanfrage empfangen:');
    console.log({
      firstName,
      lastName,
      email,
      phone,
      address,
      message: message.substring(0, 50) + (message.length > 50 ? '...' : ''),
      timestamp: new Date().toISOString()
    });

    // Erfolgreiche Antwort
    return NextResponse.json({
      success: true,
      message: 'Deine Nachricht wurde erfolgreich empfangen.',
    });

  } catch (error) {
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
export async function OPTIONS(): Promise<NextResponse> {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}