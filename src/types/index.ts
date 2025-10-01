// Haupttypen für das Rechtly-Projekt

export interface User {
  _id: string;
  email: string;
  name: string;
  role: 'user' | 'admin' | 'lawyer';
  createdAt: Date;
  updatedAt: Date;
}

export interface Anfrage {
  _id: string;
  type: 'bussgeld' | 'kfz-gutachten' | 'verkehrsunfall';
  status: 'pending' | 'in-progress' | 'completed' | 'rejected';
  user: string | User;
  details: BussgeldDetails | KfzGutachtenDetails | VerkehrsunfallDetails;
  documents: Document[];
  createdAt: Date;
  updatedAt: Date;
}

export interface BussgeldDetails {
  bußgeldNummer: string;
  datum: Date;
  betrag: number;
  verstoß: string;
  fahrzeug: {
    kennzeichen: string;
    marke: string;
    modell: string;
  };
  fahrer: {
    name: string;
    adresse: string;
    telefon: string;
    email: string;
  };
}

export interface KfzGutachtenDetails {
  unfallDatum: Date;
  unfallOrt: string;
  schadenBeschreibung: string;
  fahrzeug: {
    kennzeichen: string;
    marke: string;
    modell: string;
    baujahr: number;
    kilometerstand: number;
  };
  versicherung: {
    name: string;
    vertragsnummer: string;
  };
}

export interface VerkehrsunfallDetails {
  unfallDatum: Date;
  unfallOrt: string;
  unfallBeschreibung: string;
  beteiligte: {
    name: string;
    kennzeichen: string;
    versicherung: string;
  }[];
  schaden: {
    beschreibung: string;
    schadenshöhe: number;
  };
}

export interface Document {
  _id: string;
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
  path: string;
  uploadedAt: Date;
}

export interface ContactForm {
  name: string;
  email: string;
  telefon: string;
  nachricht: string;
  anfrageTyp: 'allgemein' | 'bussgeld' | 'kfz-gutachten' | 'verkehrsunfall';
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
