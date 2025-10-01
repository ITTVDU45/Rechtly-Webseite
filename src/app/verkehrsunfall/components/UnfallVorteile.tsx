import React from 'react';
import BenefitTemplate, { BenefitItem } from '@/components/sections/BenefitSection/BenefitTemplate';

const items: BenefitItem[] = [
  { title: 'Schnelle Abwicklung', description: 'Von Fallmeldung bis Rechtsdurchsetzung in einer Plattform.' },
  { title: 'DSGVO‑konform & sicher', description: 'Datenschutz und sichere Aufbewahrung Ihrer Daten.' },
  { title: 'Alles an einem Ort', description: 'Akte, Dokumente und Status jederzeit einsehbar.' },
  { title: 'Partnernetzwerk', description: 'Gutachter, Kanzleien & Versicherungen vernetzt.' }
];

export default function UnfallVorteile() {
  return <BenefitTemplate title="Vorteile mit Rechtly" subtitle="Warum unsere Lösung hilft" items={items} />;
}
