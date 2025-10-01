"use client";
import React from 'react';
import FAQTemplate from '@/components/sections/FAQSection/FAQTemplate';

const FAQ_ITEMS = [
  { id: 1, question: 'Welche Voraussetzungen gelten?', answer: 'Sie sollten ein eingetragenes Gutachterbüro oder entsprechende Qualifikation besitzen.' },
  { id: 2, question: 'Wie berechnet sich die Provision?', answer: 'Provision basiert auf dem Fallwert; Basis- und Bonusstufen möglich.' },
  { id: 3, question: 'Wann erfolgt Auszahlung?', answer: 'Nach Abschluss und Abrechnung des Falls, in der Regel monatlich.' },
  { id: 4, question: 'Kann ich Fälle ablehnen?', answer: 'Ja – Sie behalten die Kontrolle über die Annahme von Fällen.' }
];

export default function PartnerFAQ() {
  return <FAQTemplate items={FAQ_ITEMS} title="Häufige Fragen zur Gutachter-Partnerschaft" />;
}


