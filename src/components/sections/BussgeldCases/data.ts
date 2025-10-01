export type CaseItem = {
  id: string;
  title: string;
  emoji?: string;
  description: string;
  cta?: string;
};

const cases: CaseItem[] = [
  {
    id: 'geschwindigkeit',
    title: 'Geschwindigkeit',
    emoji: '🚗',
    description: 'Viele Bußgeldbescheide entstehen durch einfache Tempolimits. Ob 21 km/h zu viel oder über 70 km/h – bei Fahrverbot und Punkten helfen wir sofort weiter.',
    cta: 'Jetzt kostenlos prüfen lassen →'
  },
  {
    id: 'rotlicht',
    title: 'Rotlichtverstoß',
    emoji: '🚦',
    description: 'Ein Rotlichtverstoß kann teuer werden – vor allem bei qualifizierten Verstößen. Wir prüfen, ob Messung oder Beweislage fehlerhaft ist.',
    cta: 'Bußgeldbescheid prüfen →'
  },
  {
    id: 'abstand',
    title: 'Abstand',
    emoji: '📏',
    description: 'Moderne Messsysteme werten Fahrverhalten sekundengenau aus. Nicht immer korrekt. Wir helfen, wenn Bußgeld, Punkte oder Fahrverbot drohen.',
    cta: 'Abstandsmessung prüfen →'
  },
  {
    id: 'handy',
    title: 'Handy am Steuer',
    emoji: '📱',
    description: 'Schon der kurze Blick aufs Display kann teuer werden. Doch nicht jede Kontrolle ist rechtlich einwandfrei. Wir prüfen, ob das Verfahren korrekt ablief.',
    cta: 'Handyverstoß bewerten →'
  },
  {
    id: 'parken',
    title: 'Parken & Halten',
    emoji: '🅿️',
    description: 'Egal ob Halteverbot, Feuerwehrzufahrt oder auf dem Gehweg – Bußgelder sind schnell verteilt. Wir sagen dir, ob sich Einspruch lohnt.',
    cta: 'Parkverstoß analysieren →'
  },
  {
    id: 'alkohol',
    title: 'Alkohol / Drogen',
    emoji: '🍷',
    description: 'Verfahren mit Alkohol oder Drogen am Steuer führen häufig zu Fahrverbot und MPU. Wir prüfen deine Rechte und zeigen dir Auswege.',
    cta: 'Verfahren prüfen lassen →'
  },
  {
    id: 'unfall',
    title: 'Verkehrsunfall',
    emoji: '💥',
    description: 'Auch bei Unfällen können Bußgelder drohen – etwa wegen Fahrlässigkeit oder fehlender Abstand. Wir helfen bei der Einschätzung deiner Verantwortung.',
    cta: 'Unfallakte prüfen →'
  }
];

export default cases;


