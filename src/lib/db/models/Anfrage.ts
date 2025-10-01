import mongoose, { Schema, Document } from 'mongoose';

export interface IAnfrage extends Document {
  anfrageTyp: 'bussgeld' | 'verkehrsunfall' | 'kfz-gutachten';
  anrede?: string;
  titel?: string;
  vorname: string;
  nachname: string;
  email: string;
  telefon?: string;
  strasse: string;
  hausnummer?: string;
  plz: string;
  ort: string;
  bussgeld?: {
    vorwurf?: string;
    fahrzeugTyp?: string;
    punktestand?: string;
    probezeit?: string;
    schreiben?: string;
    kostenuebernahme?: string;
    aktenzeichen?: string;
    zustellungsdatum?: Date;
    behoerde?: string;
    kennzeichen?: string;
  };
  verkehrsunfall?: {
    unfallverursacher?: string;
    unfallDatum?: Date;
    unfallZeit?: string;
    strasse?: string;
    plz?: string;
    weitereAngaben?: string;
    unfallhergang?: string;
    reaktion?: {
      gebremst?: boolean;
      ausgewichen?: boolean;
      keineReaktion?: boolean;
    };
    verkehrszeichen?: {
      ampel?: boolean;
      verkehrsschild?: boolean;
      keine?: boolean;
    };
    fahrzeugDetails?: {
      markeModell?: string;
      kennzeichen?: string;
      farbe?: string;
      erstzulassung?: string;
      weitereSchaeden?: string;
    };
    polizei?: {
      verstaendigt?: string;
      polizeibericht?: string[];
    };
    zeugen?: {
      vorhanden?: string;
      details?: string;
    };
    personenschaden?: string;
    rettungsdienst?: string;
  };
  kfzGutachten?: {
    fahrzeugTyp?: string;
    marke?: string;
    modell?: string;
    baujahr?: string;
    kennzeichen?: string;
    schadensart?: string;
    schadensbeschreibung?: string;
    versicherung?: {
      name?: string;
      versicherungsnummer?: string;
    };
  };
  dokumente: Array<{
    id: string;
    name: string;
    path: string;
  }>;
  datenschutz: boolean;
  anwaltEinwilligung: boolean;
  status: 'neu' | 'in_bearbeitung' | 'abgeschlossen';
  erstelltAm: Date;
  aktualisiertAm: Date;
}

const anfrageSchema = new Schema<IAnfrage>({
  anfrageTyp: {
    type: String,
    required: true,
    enum: ['bussgeld', 'verkehrsunfall', 'kfz-gutachten']
  },
  anrede: String,
  titel: String,
  vorname: {
    type: String,
    required: true
  },
  nachname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    match: [/^\S+@\S+\.\S+$/, 'Bitte geben Sie eine gültige E-Mail-Adresse ein']
  },
  telefon: String,
  strasse: {
    type: String,
    required: true
  },
  hausnummer: String,
  plz: {
    type: String,
    required: true,
    match: [/^[0-9]{5}$/, 'Die PLZ muss aus 5 Ziffern bestehen']
  },
  ort: {
    type: String,
    required: true
  },
  bussgeld: {
    vorwurf: String,
    fahrzeugTyp: String,
    punktestand: String,
    probezeit: String,
    schreiben: String,
    kostenuebernahme: String,
    aktenzeichen: String,
    zustellungsdatum: Date,
    behoerde: String,
    kennzeichen: String
  },
  verkehrsunfall: {
    unfallverursacher: String,
    unfallDatum: Date,
    unfallZeit: String,
    strasse: String,
    plz: String,
    weitereAngaben: String,
    unfallhergang: String,
    reaktion: {
      gebremst: Boolean,
      ausgewichen: Boolean,
      keineReaktion: Boolean
    },
    verkehrszeichen: {
      ampel: Boolean,
      verkehrsschild: Boolean,
      keine: Boolean
    },
    fahrzeugDetails: {
      markeModell: String,
      kennzeichen: String,
      farbe: String,
      erstzulassung: String,
      weitereSchaeden: String
    },
    polizei: {
      verstaendigt: String,
      polizeibericht: [String]
    },
    zeugen: {
      vorhanden: String,
      details: String
    },
    personenschaden: String,
    rettungsdienst: String
  },
  kfzGutachten: {
    fahrzeugTyp: String,
    marke: String,
    modell: String,
    baujahr: String,
    kennzeichen: String,
    schadensart: String,
    schadensbeschreibung: String,
    versicherung: {
      name: String,
      versicherungsnummer: String
    }
  },
  dokumente: [{
    id: String,
    name: String,
    path: String
  }],
  datenschutz: {
    type: Boolean,
    required: true,
    default: false
  },
  anwaltEinwilligung: {
    type: Boolean,
    required: true,
    default: false
  },
  status: {
    type: String,
    enum: ['neu', 'in_bearbeitung', 'abgeschlossen'],
    default: 'neu'
  },
  erstelltAm: {
    type: Date,
    default: Date.now
  },
  aktualisiertAm: {
    type: Date,
    default: Date.now
  }
}, { 
  collection: 'Anfragen',
  timestamps: true 
});

// Aktualisiere aktualisiertAm vor jedem Speichern
anfrageSchema.pre('save', function(next) {
  this.aktualisiertAm = new Date();
  next();
});

export default mongoose.models.Anfrage || mongoose.model<IAnfrage>('Anfrage', anfrageSchema);
