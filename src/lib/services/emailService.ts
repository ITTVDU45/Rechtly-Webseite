import type { Transporter } from 'nodemailer';
import nodemailer from 'nodemailer';
import config from '../config/backend.config';

interface MailOptions {
  from?: string;
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  attachments?: Array<{
    filename: string;
    content: Buffer | string;
    contentType?: string;
  }>;
}

interface MailResponse {
  messageId?: string;
  accepted?: string[];
  rejected?: string[];
  response?: string;
}

class EmailService {
  transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.email.host,
      port: config.email.port,
      secure: config.email.secure,
      auth: config.email.auth
    });
  }

  async sendMail(options: MailOptions): Promise<MailResponse> {
    const mailOptions: MailOptions = {
      from: options.from || config.email.from,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
      attachments: options.attachments
    };

    try {
      // Für Vercel-Deployment: Simuliere E-Mail-Versand
      console.log('E-Mail würde gesendet werden:', {
        from: mailOptions.from,
        to: mailOptions.to,
        subject: mailOptions.subject
      });
      
      // Simuliere eine erfolgreiche Antwort
      return {
        messageId: `dummy-message-id-${Date.now()}`,
        accepted: Array.isArray(mailOptions.to) ? mailOptions.to : [mailOptions.to],
        rejected: [],
        response: 'OK'
      };
    } catch (error) {
      console.error('Fehler beim Senden der E-Mail', error);
      throw error;
    }
  }

  async sendActivationEmail(email: string, token: string): Promise<MailResponse> {
    const url = `${config.domains.base}/activate/${token}`;
    return this.sendMail({
      to: email,
      subject: 'Aktivieren Sie Ihr Rechtly-Konto',
      html: `<p>Bitte aktivieren Sie Ihr Konto: <a href="${url}">${url}</a></p>`
    });
  }

  async sendAnfrageConfirmation(email: string, anfrageTyp: string, anfrageId: string): Promise<MailResponse> {
    const subject = `Ihre ${anfrageTyp}-Anfrage wurde erfolgreich eingereicht`;
    const html = `<p>Ihre Anfrage (${anfrageId}) wurde eingereicht. Wir melden uns zeitnah.</p>`;
    return this.sendMail({ to: email, subject, html });
  }

  async sendAdminNotification(anfrageTyp: string, anfrageId: string, email: string): Promise<MailResponse> {
    const subject = `Neue ${anfrageTyp}-Anfrage: ${anfrageId}`;
    const html = `<p>Neue Anfrage eingegangen: ${anfrageId} (${anfrageTyp}) - Kunde: ${email}</p>`;
    return this.sendMail({ to: config.support.email || 'anfragen@rechtly.de', subject, html });
  }
}

export default new EmailService();