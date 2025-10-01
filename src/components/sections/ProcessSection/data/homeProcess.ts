import type { ProcessStep } from '../ProcessTemplate';

export const homeProcessSteps: ProcessStep[] = [
  { id: 1, title: 'Anliegen prüfen', lead: 'Kurz prüfen & einordnen', desc: 'Wählen Sie aus, welche Art von rechtlicher Unterstützung Sie benötigen. Schnell & digital.', icon: '🔍' },
  { id: 2, title: 'Kostenlose Bewertung', lead: 'Ersteinschätzung', desc: 'Erhalten Sie eine erste kostenlose Einschätzung Ihres Falls von unseren Experten.', icon: '✅' },
  { id: 3, title: 'Expertenunterstützung', lead: 'Fachanwalt übernimmt', desc: 'Profitieren Sie von der Unterstützung unserer erfahrenen Rechtsexperten bei der Durchsetzung Ihrer Ansprüche.', icon: '👩‍⚖️' }
];

export default homeProcessSteps;


