"use client";
import React from 'react';
import BenefitTemplate from '@/components/sections/BenefitSection/BenefitTemplate';

const bussgeldUSPs = [
  { icon: 'CheckCircle', title: 'Alles in einer Plattform', description: 'Mandant, Gutachter, Anwalt – alle Schritte digital vereint.' },
  { icon: 'Clock', title: 'Automatisierung', description: 'Weniger Papierkram dank automatisierter Workflows.' },
  { icon: 'Shield', title: 'Live-Status', description: 'Jederzeit sehen, was als Nächstes passiert.' },
  { icon: 'Users', title: 'Direktkontakt', description: 'Sichere Chat- und Upload-Funktionen für schnelle Kommunikation.' },
  { icon: 'Award', title: 'Fair & transparent', description: 'Klare Kostenübersicht ohne überraschende Gebühren.' },
  { icon: 'Headphones', title: 'Provisionen/Partner', description: '50 € pro vermittelte Angelegenheit für Partner.' },
];

export default function USPs() {
  return <BenefitTemplate title="Vorteile auf einen Blick" items={bussgeldUSPs as any} />;
}


