// multer and express don't ship types in this workspace; import as any to avoid TS errors in the frontend bundle
// eslint-disable-next-line @typescript-eslint/no-var-requires
const multer: any = require('multer');
// Avoid importing express types if not installed; keep runtime require only
// eslint-disable-next-line @typescript-eslint/no-var-requires
const express: any = require('express');
// Avoid importing express types; declare lightweight local types to avoid dependency on @types/express
type Request = any;
type Response = any;
import Document from '../db/models/Document';
const { minioClient, BUCKET_NAME } = require('../config/backend.config');

// Multer Konfiguration für Memory Storage
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req: any, file: any, cb: any) => {
    if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Nur Bilder und PDFs sind erlaubt'));
    }
  }
});

// Generiere eine eindeutige Anfrage-ID
const generateAnfrageId = () => {
  const now = new Date();
  return `REQ-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`;
};

// Generiere einen sicheren Dateinamen
const generateSafeFilename = (originalname: string) => {
  const timestamp = Date.now();
  const extension = originalname.split('.').pop();
  const sanitizedName = originalname.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
  return `${sanitizedName}-${timestamp}.${extension}`;
};

export default class UploadService {
  static getMulterUpload() {
    return upload.array('files');
  }

  static async handleUpload(req: Request, res: Response) {
    try {
      console.log('Upload request received:', { files: (req as any).files?.length || 0, body: req.body });

      if (!(req as any).files || (req as any).files.length === 0) {
        return res.status(400).json({ success: false, error: 'Keine Dateien zum Hochladen gefunden' });
      }

      const anfrageId = (req as any).body.anfrageId || generateAnfrageId();
      const dokumentTyp = (req as any).body.dokumentTyp || 'BUSSGELD';

      const uploadedFiles: any[] = [];

      for (const file of (req as any).files) {
        try {
          const safeFilename = generateSafeFilename(file.originalname);
          const minioPath = `anfragen/${anfrageId}/${dokumentTyp}/${safeFilename}`;

          await minioClient.putObject(BUCKET_NAME, minioPath, file.buffer, {
            'Content-Type': file.mimetype,
            'Content-Length': file.size
          });

          const document = new Document({
            anfrageId,
            art: dokumentTyp,
            kontakt: { name: req.body.name || '', email: req.body.email || '', telefon: req.body.telefon || '' },
            dokumente: [{ typ: dokumentTyp, filename: safeFilename, pfad: minioPath, uploadDate: new Date() }]
          });

          await document.save();

          uploadedFiles.push({ id: document._id, originalname: file.originalname, filename: safeFilename, path: minioPath, mimetype: file.mimetype, size: file.size });
        } catch (fileError) {
          console.error('Error processing individual file:', fileError);
          continue;
        }
      }

      if (uploadedFiles.length === 0) {
        return res.status(500).json({ success: false, error: 'Keine Dateien konnten hochgeladen werden', details: 'Alle Uploads sind fehlgeschlagen' });
      }

      return res.json({ success: true, files: uploadedFiles, anfrageId });
    } catch (error: any) {
      console.error('Upload-Fehler:', error);
      return res.status(500).json({ success: false, error: 'Fehler beim Hochladen der Dateien', details: error.message });
    }
  }

  static async deleteFile(fileId: string) {
    try {
      const document = await Document.findById(fileId);
      if (!document) throw new Error('Dokument nicht gefunden');

      await minioClient.removeObject(BUCKET_NAME, document.dokumente[0].pfad);
      await Document.findByIdAndDelete(fileId);
      return true;
    } catch (error) {
      console.error('Fehler beim Löschen:', error);
      throw error;
    }
  }
}


