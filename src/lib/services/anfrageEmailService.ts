/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-require-imports, @typescript-eslint/ban-ts-comment, @typescript-eslint/no-unused-vars */
import nodemailer from 'nodemailer';
import path from 'path';
import Document from '../db/models/Document';
import Image from '../db/models/Image';
import config, { minioClient, BUCKET_NAME } from '../config/backend.config';
import PDFDocument from 'pdfkit';
import fs from 'fs';

const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: config.email.port,
  secure: config.email.secure,
  auth: config.email.auth
});

class AnfrageEmailService {
  static async sendVerkehrsunfallBestaetigungEmails(data: Record<string, unknown>, imageIds: string[]) {
    try {
      const documents = await Document.find({ _id: { $in: imageIds } });
      const docFiles = documents.flatMap((doc: Record<string, any>) =>
        (doc.dokumente && Array.isArray(doc.dokumente))
          ? doc.dokumente.map((d: { filename: string; pfad: string }) => ({ filename: d.filename, pfad: d.pfad }))
          : []
      );

      const attachmentsFromMinio = await Promise.all(
        docFiles.map(async (file: { filename: string; pfad: string }) => {
          try {
            const stream = await minioClient.getObject(BUCKET_NAME, file.pfad);
            const chunks: Buffer[] = [];
            for await (const chunk of stream) {
              chunks.push(chunk as Buffer);
            }
            return { filename: file.filename, content: Buffer.concat(chunks) };
          } catch (err) {
            console.error('Fehler beim Laden aus MinIO:', file.pfad, err);
            return null;
          }
        })
      );

      const validAttachments = attachmentsFromMinio.filter(Boolean) as Array<{ filename: string; content: Buffer }>;
      const pdfBuffer = await generateVerkehrsunfallPdf(data);
      const attachments = [
        { filename: 'LOGO Transparent.png', path: path.join(process.cwd(), 'public/assets/images/LOGO Transparent.png'), cid: 'rechtlylogo' },
        { filename: 'Verkehrsunfall-Anfrage.pdf', content: pdfBuffer },
        ...validAttachments
      ];

      const mailHtml = `...`;
      const mailHtmlTeam = `...`;

      await transporter.sendMail({ from: config.email.from, to: 'Anfragen@rechtly.de', subject: 'Neue Verkehrsunfall-Anfrage', html: mailHtmlTeam, attachments });
      // @ts-expect-error - data may not have typed email property
      await transporter.sendMail({ from: config.email.from, to: (data as any).email, subject: '🚗 Ihre Verkehrsunfall-Anfrage bei Rechtly', html: mailHtml, attachments });
      return true;
    } catch (error) {
      console.error('Fehler beim Senden der E-Mails:', error);
      throw error;
    }
  }
}

function getVerkehrsunfallFormFields(data: any) { return []; }
function generateVerkehrsunfallPdf(data: any) {
  return new Promise<Buffer>((resolve) => {
    const doc = new PDFDocument({ size: 'A4', margin: 40 });
    const buffers: Buffer[] = [];
    doc.on('data', (b: Buffer) => buffers.push(b));
    doc.on('end', () => resolve(Buffer.concat(buffers)));
    doc.end();
  });
}

export default AnfrageEmailService;


