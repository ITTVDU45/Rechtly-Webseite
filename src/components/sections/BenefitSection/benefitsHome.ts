import type { BenefitItem } from './BenefitTemplate';

// Export plain data objects only (no component functions) so this file is safe to import from Server Components.
export const benefitsHome: BenefitItem[] = [
  { icon: 'CheckCircle', title: 'Technologische Unterstützung', description: 'Unsere Plattform nutzt moderne Technologien, um effiziente Abläufe, schnelle Kommunikation und digitale Fallbearbeitung zu ermöglichen.' },
  { icon: 'Clock', title: '24h Antwortzeit', description: 'Wir garantieren Ihnen eine Antwort innerhalb von 24 Stunden auf alle Ihre Anfragen.' },
  { icon: 'Shield', title: 'DSGVO-konform', description: 'Ihre Daten sind bei uns sicher und werden streng vertraulich behandelt.' },
  { icon: 'Users', title: 'Hohe Mandantenzufriedenheit', description: 'Mehr als 10.000 Mandantinnen und Mandanten haben bereits unsere Dienste in Anspruch genommen – mit durchweg positiver Resonanz.' },
  { icon: 'Award', title: 'Transparente Abläufe', description: 'Sie behalten jederzeit die volle Übersicht – vom Erstkontakt bis zur finalen Einschätzung.' },
  { icon: 'Headphones', title: 'Persönliche Betreuung', description: 'Jeder Kunde wird persönlich von einem erfahrenen Rechtsanwalt betreut.' },
];

export default benefitsHome;


