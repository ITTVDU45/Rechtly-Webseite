import type { BenefitItem } from './BenefitTemplate';

// Export plain data objects only (no component functions) so this file is safe to import from Server Components.
export const benefitsHome: BenefitItem[] = [
  { icon: 'CheckCircle', title: '95% Erfolgsquote', description: 'Unsere Experten erreichen eine außergewöhnlich hohe Erfolgsquote bei der Anfechtung von Bußgeldbescheiden.' },
  { icon: 'Clock', title: '24h Antwortzeit', description: 'Wir garantieren Ihnen eine Antwort innerhalb von 24 Stunden auf alle Ihre Anfragen.' },
  { icon: 'Shield', title: 'DSGVO-konform', description: 'Ihre Daten sind bei uns sicher und werden streng vertraulich behandelt.' },
  { icon: 'Users', title: '10.000+ zufriedene Kunden', description: 'Über 10.000 Kunden vertrauen bereits auf unsere Expertise und Erfahrung.' },
  { icon: 'Award', title: 'ISO-zertifiziert', description: 'Wir arbeiten nach höchsten Qualitätsstandards und sind ISO 9001:2015 zertifiziert.' },
  { icon: 'Headphones', title: 'Persönliche Betreuung', description: 'Jeder Kunde wird persönlich von einem erfahrenen Rechtsanwalt betreut.' },
];

export default benefitsHome;


