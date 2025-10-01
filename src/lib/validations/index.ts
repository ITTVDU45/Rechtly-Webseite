import { z } from 'zod';

// Kontaktformular Validierung
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name muss mindestens 2 Zeichen lang sein'),
  email: z.string().email('Ungültige E-Mail-Adresse'),
  telefon: z.string().min(10, 'Telefonnummer muss mindestens 10 Zeichen lang sein'),
  nachricht: z.string().min(10, 'Nachricht muss mindestens 10 Zeichen lang sein'),
  anfrageTyp: z.enum(['allgemein', 'bussgeld', 'kfz-gutachten', 'verkehrsunfall'])
});

// Bußgeld-Anfrage Validierung
export const bussgeldSchema = z.object({
  bußgeldNummer: z.string().min(1, 'Bußgeld-Nummer ist erforderlich'),
  datum: z.string().min(1, 'Datum ist erforderlich'),
  betrag: z.number().min(0, 'Betrag muss positiv sein'),
  verstoß: z.string().min(1, 'Verstoß-Beschreibung ist erforderlich'),
  fahrzeug: z.object({
    kennzeichen: z.string().min(1, 'Kennzeichen ist erforderlich'),
    marke: z.string().min(1, 'Marke ist erforderlich'),
    modell: z.string().min(1, 'Modell ist erforderlich')
  }),
  fahrer: z.object({
    name: z.string().min(2, 'Name muss mindestens 2 Zeichen lang sein'),
    adresse: z.string().min(5, 'Adresse muss mindestens 5 Zeichen lang sein'),
    telefon: z.string().min(10, 'Telefonnummer muss mindestens 10 Zeichen lang sein'),
    email: z.string().email('Ungültige E-Mail-Adresse')
  })
});

// KFZ-Gutachten Anfrage Validierung
export const kfzGutachtenSchema = z.object({
  unfallDatum: z.string().min(1, 'Unfalldatum ist erforderlich'),
  unfallOrt: z.string().min(1, 'Unfallort ist erforderlich'),
  schadenBeschreibung: z.string().min(10, 'Schadenbeschreibung muss mindestens 10 Zeichen lang sein'),
  fahrzeug: z.object({
    kennzeichen: z.string().min(1, 'Kennzeichen ist erforderlich'),
    marke: z.string().min(1, 'Marke ist erforderlich'),
    modell: z.string().min(1, 'Modell ist erforderlich'),
    baujahr: z.number().min(1900).max(new Date().getFullYear() + 1),
    kilometerstand: z.number().min(0)
  }),
  versicherung: z.object({
    name: z.string().min(1, 'Versicherungsname ist erforderlich'),
    vertragsnummer: z.string().min(1, 'Vertragsnummer ist erforderlich')
  })
});

// Verkehrsunfall Anfrage Validierung
export const verkehrsunfallSchema = z.object({
  unfallDatum: z.string().min(1, 'Unfalldatum ist erforderlich'),
  unfallOrt: z.string().min(1, 'Unfallort ist erforderlich'),
  unfallBeschreibung: z.string().min(10, 'Unfallbeschreibung muss mindestens 10 Zeichen lang sein'),
  beteiligte: z.array(z.object({
    name: z.string().min(2, 'Name muss mindestens 2 Zeichen lang sein'),
    kennzeichen: z.string().min(1, 'Kennzeichen ist erforderlich'),
    versicherung: z.string().min(1, 'Versicherung ist erforderlich')
  })).min(1, 'Mindestens ein Beteiligter ist erforderlich'),
  schaden: z.object({
    beschreibung: z.string().min(10, 'Schadenbeschreibung muss mindestens 10 Zeichen lang sein'),
    schadenshöhe: z.number().min(0, 'Schadenshöhe muss positiv sein')
  })
});

// Login Validierung
export const loginSchema = z.object({
  email: z.string().email('Ungültige E-Mail-Adresse'),
  password: z.string().min(6, 'Passwort muss mindestens 6 Zeichen lang sein')
});

// Registrierung Validierung
export const registerSchema = z.object({
  name: z.string().min(2, 'Name muss mindestens 2 Zeichen lang sein'),
  email: z.string().email('Ungültige E-Mail-Adresse'),
  password: z.string().min(6, 'Passwort muss mindestens 6 Zeichen lang sein'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwörter stimmen nicht überein",
  path: ["confirmPassword"]
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type BussgeldData = z.infer<typeof bussgeldSchema>;
export type KfzGutachtenData = z.infer<typeof kfzGutachtenSchema>;
export type VerkehrsunfallData = z.infer<typeof verkehrsunfallSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type RegisterData = z.infer<typeof registerSchema>;
