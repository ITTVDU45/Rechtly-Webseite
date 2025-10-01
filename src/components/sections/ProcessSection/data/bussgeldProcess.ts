import type { ProcessStep } from '../ProcessTemplate';

export const bussgeldProcessSteps: ProcessStep[] = [
  {
    id: 1,
    title: 'Bußgeldfall melden',
    lead: 'Tragen Sie alle relevanten Informationen ein',
    desc: 'Tragen Sie alle relevanten Informationen zu Ihrem Bußgeldbescheid ein (Aktenzeichen, Datum, Angaben zur Messung). Wir prüfen die Erfolgsaussichten.',
    icon: '📝',
  },
  {
    id: 2,
    title: 'Belege & Fotos hochladen',
    lead: 'Unterlagen sicher hochladen',
    desc: 'Laden Sie Belege, Messprotokolle oder Fotos hoch – wir werten Ihre Unterlagen zur Verteidigung aus.',
    icon: '📷',
  },
  {
    id: 3,
    title: 'Erste rechtliche Einschätzung',
    lead: 'KI & Experten prüfen Ihren Fall',
    desc: 'Unsere KI und Experten prüfen Ihre Unterlagen und geben eine erste juristische Einschätzung sowie Empfehlungen für das weitere Vorgehen.',
    icon: '⚖️',
  },
  {
    id: 4,
    title: 'Widerspruch & Vertretung',
    lead: 'Wir übernehmen Widerspruch & Kommunikation',
    desc: 'Wir übernehmen Widerspruch, Kommunikation mit Behörden und – falls nötig – Ihre gerichtliche Vertretung.',
    icon: '🤝',
  },
];

export default bussgeldProcessSteps;


