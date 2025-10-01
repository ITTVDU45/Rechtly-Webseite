"use client";
import React from 'react';
import PricingTemplate, { type Plan } from '@/components/sections/PricingSection/PricingTemplate';

const costsPlans: Plan[] = [
  {
    name: 'Mit Rechtsschutz',
    description: 'In der Regel übernimmt Ihre Rechtsschutzversicherung die anfallenden Kosten.',
    price: '0 €',
    features: ['Kostenübernahme durch RSV in vielen Fällen'],
    notIncluded: [],
    buttonText: 'Jetzt prüfen',
    buttonVariant: 'default'
  },
  {
    name: 'Ohne Rechtsschutz',
    description: 'Feste Pauschalen je Schritt – Sie entscheiden vorab.',
    price: 'Pauschalen',
    features: ['Transparente Pauschalen', 'Keine versteckten Kosten'],
    notIncluded: [],
    buttonText: 'Preise anzeigen',
    buttonVariant: 'outline'
  }
];

export default function Costs() {
  return <PricingTemplate title="Kosten & Transparenz" subtitle="Klares Pricing für Bußgeldfälle" plans={costsPlans} />;
}


