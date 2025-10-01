"use client";
import React from 'react';
import '../bussgeld.css';
import ToolsTemplate from '@/components/sections/ToolsSection/ToolsTemplate';

const toolsData = [
  { title: 'Punkte- & Fahrverbot-Rechner', description: 'Berechne Auswirkungen für km/h, Ort und Voreintragungen.', image: '/assets/images/Benefit1.jpg', cta: 'Zum Rechner' },
  { title: 'Bußgeld-Schätzer', description: 'Sofortige Schätzung mit Hinweis auf Toleranzabzug.', image: '/assets/images/Benefit2.jpg', cta: 'Schätzer öffnen' },
  { title: 'RSV-Deckungscheck', description: 'Prüfe, ob eine Rechtsschutzversicherung typischerweise deckt. Formelle Deckungsanfrage übernimmt die Kanzlei.', image: '/assets/images/Benefit3.jpg', cta: 'Deckung prüfen' }
];

export default function Tools() {
  return <ToolsTemplate tools={toolsData} className="mb-12" />;
}


