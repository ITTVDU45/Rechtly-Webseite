import mongoose, { Schema, Document as MDocument } from 'mongoose';

export interface IBussgeld extends MDocument {
  person: {
    vorname: string;
    nachname: string;
    email: string;
    telefon?: string;
  };
  adresse: {
    strasse: string;
    hausnummer?: string;
    plz: string;
    ort: string;
  };
  bussgeld: {
    datum: Date;
    beschreibung: string;
    dokumente?: mongoose.Types.ObjectId[];
  };
  datenschutz: boolean;
  status: string;
  erstelltAm: Date;
}

const bussgeldSchema = new Schema<IBussgeld>({
  person: {
    vorname: { type: String, required: true },
    nachname: { type: String, required: true },
    email: { type: String, required: true, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Bitte geben Sie eine gültige E-Mail-Adresse ein'] },
    telefon: { type: String, required: false, default: '' }
  },
  adresse: {
    strasse: { type: String, required: true },
    hausnummer: { type: String, required: false, default: '' },
    plz: { type: String, required: true },
    ort: { type: String, required: true }
  },
  bussgeld: {
    datum: { type: Date, required: true },
    beschreibung: { type: String, required: true },
    dokumente: [{ type: Schema.Types.ObjectId, ref: 'Image' }]
  },
  datenschutz: { type: Boolean, required: true, default: false },
  status: { type: String, enum: ['neu', 'in_bearbeitung', 'abgeschlossen'], default: 'neu' },
  erstelltAm: { type: Date, default: Date.now }
}, { collection: 'Anfragen' });

(bussgeldSchema as any).pre('save', function(this: any, next: (err?: unknown) => void) {
  // mongoose document augmentation: field added by schema extension
  this.aktualisiertAm = new Date();
  next();
});

export default mongoose.models.Bussgeld || mongoose.model<IBussgeld>('Bussgeld', bussgeldSchema);


