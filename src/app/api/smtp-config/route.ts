import { NextResponse } from 'next/server';
import config from '@/lib/config/backend.config';

export async function GET() {
  try {
    // SMTP-Konfiguration aus dem Config-Objekt auslesen
    const smtpConfig = {
      host: config.email.host || 'nicht konfiguriert',
      port: config.email.port || 'nicht konfiguriert',
      secure: config.email.secure || false,
      user: config.email.auth?.user || 'nicht konfiguriert',
      from: config.email.from || 'nicht konfiguriert'
    };
    
    return NextResponse.json({
      success: true,
      message: "SMTP-Konfiguration geladen",
      smtpConfig: {
        ...smtpConfig,
        // Passwort aus Sicherheitsgründen nicht zurückgeben
        pass: config.email.auth?.pass ? '********' : 'nicht konfiguriert'
      },
      environment: process.env.NODE_ENV || 'development'
    });
  } catch (error: any) {
    console.error("Fehler beim Abrufen der SMTP-Konfiguration:", error);
    
    return NextResponse.json({
      success: false,
      message: "Fehler beim Abrufen der SMTP-Konfiguration",
      error: error.message
    }, { status: 500 });
  }
}
