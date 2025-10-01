import mongoose, { Schema, Document as MDocument } from 'mongoose';

export interface IDocument extends MDocument {
  anfrageId: string;
  art: 'BUSSGELD' | 'KFZGUTACHTEN' | 'VERKEHRSUNFALL';
  erstelltAm: Date;
  status: 'offen' | 'in_bearbeitung' | 'abgeschlossen';
  kontakt?: {
    name?: string;
    email?: string;
    telefon?: string;
  };
  dokumente?: Array<{
    typ: 'BUSSGELD' | 'KFZGUTACHTEN' | 'VERKEHRSUNFALL';
    filename: string;
    pfad: string;
    uploadDate?: Date;
  }>;
}

const documentSchema = new Schema<IDocument>({
  anfrageId: {
    type: String,
    required: true,
    index: true
  },
  art: {
    type: String,
    required: true,
    enum: ['BUSSGELD', 'KFZGUTACHTEN', 'VERKEHRSUNFALL']
  },
  erstelltAm: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    required: true,
    enum: ['offen', 'in_bearbeitung', 'abgeschlossen'],
    default: 'offen'
  },
  kontakt: {
    name: String,
    email: String,
    telefon: String
  },
  dokumente: [{
    typ: { type: String, required: true, enum: ['BUSSGELD', 'KFZGUTACHTEN', 'VERKEHRSUNFALL'] },
    filename: { type: String, required: true },
    pfad: { type: String, required: true },
    uploadDate: { type: Date, default: Date.now }
  }]
});

export default mongoose.models.Document || mongoose.model<IDocument>('Document', documentSchema, 'documents');
