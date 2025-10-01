import nodemailer from 'nodemailer';
import config from '../config/backend.config';
import logger from '../utils/logger';

class EmailService {
  transporter: any;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.email.host,
      port: config.email.port,
      secure: config.email.secure,
      auth: config.email.auth
    });
  }

  async sendMail(options: { from?: string; to: string | string[]; subject: string; html?: string; text?: string; attachments?: any[] }) {
    const mailOptions = {
      from: options.from || config.email.from,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
      attachments: options.attachments
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      logger.info(`E-Mail gesendet: ${info?.messageId}`);
      return info;
    } catch (error: any) {
      logger.error('Fehler beim Senden der E-Mail', { error: error?.message });
      throw error;
    }
  }

  async sendActivationEmail(email: string, token: string) {
    const url = `${config.domains.base}/activate/${token}`;
    return this.sendMail({
      to: email,
      subject: 'Aktivieren Sie Ihr Rechtly-Konto',
      html: `<p>Bitte aktivieren Sie Ihr Konto: <a href="${url}">${url}</a></p>`
    });
  }

  async sendAnfrageConfirmation(email: string, anfrageTyp: string, anfrageId: string) {
    const subject = `Ihre ${anfrageTyp}-Anfrage wurde erfolgreich eingereicht`;
    const html = `<p>Ihre Anfrage (${anfrageId}) wurde eingereicht. Wir melden uns zeitnah.</p>`;
    return this.sendMail({ to: email, subject, html });
  }

  async sendAdminNotification(anfrageTyp: string, anfrageId: string, email: string) {
    const subject = `Neue ${anfrageTyp}-Anfrage: ${anfrageId}`;
    const html = `<p>Neue Anfrage eingegangen: ${anfrageId} (${anfrageTyp}) - Kunde: ${email}</p>`;
    return this.sendMail({ to: config.support.email || 'anfragen@rechtly.de', subject, html });
  }
}

export default new EmailService();
