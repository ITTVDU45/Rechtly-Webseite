import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function GET(request: Request) {
  // URL-Parameter auslesen
  const url = new URL(request.url);
  const recipient = url.searchParams.get('email') || 'info@it-techvision.de';
  
  try {
    // SMTP-Konfiguration aus der Umgebung auslesen
    const smtpConfig = {
      host: process.env.SMTP_HOST || 'smtp.office365.com',
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true' || false,
      auth: {
        user: process.env.SMTP_USER || 'noreply@rechtly.de',
        pass: process.env.SMTP_PASS || 'B^230659779465oq!'
      }
    };
    
    // Transporter erstellen
    const transporter = nodemailer.createTransport(smtpConfig);
    
    // Test-E-Mail senden
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@rechtly.de',
      to: recipient,
      subject: 'Rechtly E-Mail-Test (Direkt)',
      html: `
        <h1>Rechtly E-Mail-Test</h1>
        <p>Diese E-Mail wurde direkt mit Nodemailer gesendet, um die SMTP-Konfiguration zu testen.</p>
        <p>Zeitstempel: ${new Date().toISOString()}</p>
        <p>SMTP-Host: ${smtpConfig.host}</p>
        <p>SMTP-Port: ${smtpConfig.port}</p>
        <p>SMTP-Secure: ${smtpConfig.secure}</p>
        <p>SMTP-User: ${smtpConfig.auth.user}</p>
      `
    });
    
    return NextResponse.json({
      success: true,
      message: "Test-E-Mail wurde gesendet",
      smtpConfig: {
        host: smtpConfig.host,
        port: smtpConfig.port,
        secure: smtpConfig.secure,
        user: smtpConfig.auth.user,
        // Passwort aus Sicherheitsgründen nicht zurückgeben
        pass: '********'
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
        host: process.env.SMTP_HOST || 'smtp.office365.com',
        port: Number(process.env.SMTP_PORT || 587),
        secure: process.env.SMTP_SECURE === 'true' || false,
        user: process.env.SMTP_USER || 'noreply@rechtly.de',
        // Passwort aus Sicherheitsgründen nicht zurückgeben
        pass: '********'
      }
    }, { status: 500 });
  }
}
