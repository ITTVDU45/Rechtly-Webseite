import mongoose, { Schema, Document as MDocument } from 'mongoose';

export interface IKfzGutachten extends MDocument {
  schuld: 'unfallgegner' | 'selbst';
  bilder?: Record<string, Array<{ id?: string; name?: string; path?: string }>>;
  schadenBeschreibung: string;
  vorname: string;
  name: string;
  email: string;
  telefonnummer: string;
  strasse: string;
  hausnummer: string;
  plz: string;
  ort: string;
  datenschutz: boolean;
  status: string;
  erstelltAm: Date;
  aktualisiertAm: Date;
}

const kfzGutachtenSchema = new Schema<IKfzGutachten>({
  schuld: { type: String, enum: ['unfallgegner', 'selbst'], required: true },
  bilder: {
    vorneRechts: [{ id: String, name: String, path: String }],
    hintenLinks: [{ id: String, name: String, path: String }],
    schadenBereich: [{ id: String, name: String, path: String }],
    detailBilder: [{ id: String, name: String, path: String }],
    kilometerstand: [{ id: String, name: String, path: String }],
    fahrzeugschein: [{ id: String, name: String, path: String }]
  },
  schadenBeschreibung: { type: String, required: true },
  vorname: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, match: [/^\S+@\S+\.\S+$/, 'Bitte geben Sie eine gültige E-Mail-Adresse ein'] },
  telefonnummer: { type: String, required: true },
  strasse: { type: String, required: true },
  hausnummer: { type: String, required: true },
  plz: { type: String, required: true, match: [/^[0-9]{5}$/, 'Bitte geben Sie eine gültige PLZ ein'] },
  ort: { type: String, required: true },
  datenschutz: { type: Boolean, required: true, default: false },
  status: { type: String, enum: ['neu', 'in_bearbeitung', 'abgeschlossen', 'abgelehnt'], default: 'neu' },
  erstelltAm: { type: Date, default: () => new Date() },
  aktualisiertAm: { type: Date, default: () => new Date() }
});

(kfzGutachtenSchema as any).pre('save', function(this: any, next: (err?: unknown) => void) {
  // mongoose document augmentation: field added by schema extension
  this.aktualisiertAm = new Date();
  next();
});

export default mongoose.models.KfzGutachten || mongoose.model<IKfzGutachten>('KfzGutachten', kfzGutachtenSchema);


