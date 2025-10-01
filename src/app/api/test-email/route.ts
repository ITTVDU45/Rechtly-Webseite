import { NextResponse } from 'next/server';
import emailService from '@/lib/services/emailService';

export async function GET(request: Request) {
  // URL-Parameter auslesen
  const url = new URL(request.url);
  const recipient = url.searchParams.get('email') || 'test@example.com';
  
  try {
    // SMTP-Konfiguration aus der Umgebung auslesen
    const smtpConfig = {
      host: process.env.SMTP_HOST || process.env.EMAIL_HOST || 'nicht konfiguriert',
      port: process.env.SMTP_PORT || process.env.EMAIL_PORT || 'nicht konfiguriert',
      secure: process.env.SMTP_SECURE || process.env.EMAIL_SECURE || 'nicht konfiguriert',
      user: process.env.SMTP_USER || process.env.EMAIL_USER || 'nicht konfiguriert',
      from: process.env.SMTP_FROM || process.env.EMAIL_FROM || 'nicht konfiguriert'
    };
    
    // Test-E-Mail senden
    const info = await emailService.sendMail({
      to: recipient,
      subject: 'Rechtly E-Mail-Test',
      html: `
        <h1>Rechtly E-Mail-Test</h1>
        <p>Diese E-Mail wurde gesendet, um die SMTP-Konfiguration zu testen.</p>
        <p>Zeitstempel: ${new Date().toISOString()}</p>
      `
    });
    
    return NextResponse.json({
      success: true,
      message: "Test-E-Mail wurde gesendet",
      smtpConfig: {
        ...smtpConfig,
        // Passwort aus Sicherheitsgründen nicht zurückgeben
        pass: (process.env.SMTP_PASS || process.env.EMAIL_PASS) ? '********' : 'nicht konfiguriert'
      },
      emailInfo: info,
      recipient
    });
  } catch (error: any) {
    console.error("E-Mail-Fehler:", error);
    
    return NextResponse.json({
      success: false,
      message: "Fehler beim Senden der Test-E-Mail",
      error: error.message,
      smtpConfig: {
        host: process.env.SMTP_HOST || process.env.EMAIL_HOST || 'nicht konfiguriert',
        port: process.env.SMTP_PORT || process.env.EMAIL_PORT || 'nicht konfiguriert',
        secure: process.env.SMTP_SECURE || process.env.EMAIL_SECURE || 'nicht konfiguriert',
        user: process.env.SMTP_USER || process.env.EMAIL_USER || 'nicht konfiguriert',
        from: process.env.SMTP_FROM || process.env.EMAIL_FROM || 'nicht konfiguriert',
        // Passwort aus Sicherheitsgründen nicht zurückgeben
        pass: (process.env.SMTP_PASS || process.env.EMAIL_PASS) ? '********' : 'nicht konfiguriert'
      }
    }, { status: 500 });
  }
}