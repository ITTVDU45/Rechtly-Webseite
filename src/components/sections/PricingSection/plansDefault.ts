import type { Plan } from './PricingTemplate';

export const plansDefault: Plan[] = [
  {
    name: 'Starter',
    description: 'Perfekt für einfache Fälle & erste Beratung.',
    price: 'Kostenlos',
    period: 'Ersteinschätzung',
    features: [
      'Kostenlose Ersteinschätzung',
      'Erste Einschätzung der Erfolgsaussichten',
      'E-Mail-Support',
      'Empfehlung für die nächsten Schritte'
    ],
    notIncluded: ['Vollständige Fallbearbeitung', 'Telefonischer Support', 'Persönliche Betreuung', 'Gerichtsvertretung'],
    buttonText: 'Kostenlos starten',
    buttonVariant: 'outline'
  },
  {
    name: 'Business',
    description: 'Umfassende Betreuung für komplexere Fälle.',
    price: '0 €',
    period: 'i. d. R. mit Rechtsschutz',
    notes: ['Mit Rechtsschutzversicherung i. d. R.: 0 € **', 'Kfz-Gutachten (wenn Geschädigter): 0 €†'],
    features: [
      'Vollständige Fallbearbeitung',
      'Persönliche Betreuung durch Anwalt',
      'Telefon- & E-Mail-Support',
      'Dokumentenprüfung & -erstellung',
      'Verhandlungen mit Behörden',
      'Gerichtsvertretung (falls nötig)',
      'Portal-Status, Anwalt- & Gutachter-Chat',
      'KI-gestützte Empfehlungen',
      '24 h Antwortzeit garantiert'
    ],
    notIncluded: ['Mehrere parallele Fälle', 'Prioritäts-SLA'],
    badge: 'Empfohlen',
    color: 'from-green-500 to-emerald-500',
    buttonText: 'Jetzt wählen',
    buttonVariant: 'default'
  },
  {
    name: 'Scale',
    description: 'Für Unternehmen, Flotten & Mehrfachfälle.',
    price: '0 €',
    period: 'i. d. R. mit Rechtsschutz',
    notes: ['Mit Rechtsschutzversicherung i. d. R.: 0 € **', 'Kfz-Gutachten (wenn Geschädigter): 0 €†'],
    features: [
      'Alle Business-Leistungen',
      'Unbegrenzte Fälle',
      'Prioritäts-Support & dedizierter Anwalt',
      'Regelmäßige Updates & strategische Beratung',
      'Schulungen für Mitarbeiter',
      'Maßgeschneiderte Lösungen & Integrationen (API)'
    ],
    notIncluded: [],
    badge: 'Premium',
    color: 'from-green-500 to-emerald-500',
    buttonText: 'Premium starten',
    buttonVariant: 'default'
  }
];

export default plansDefault;



