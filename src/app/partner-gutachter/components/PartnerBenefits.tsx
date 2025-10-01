import React from 'react';
import Section from '@/components/ui/Section';

const BENEFITS = [
  { title: 'Mehr Aufträge', desc: 'Ohne aktive Akquise – wir leiten passende Fälle weiter.' },
  { title: 'Zentrale Fallverwaltung', desc: 'Alle Fälle & Kommunikation an einem Ort.' },
  { title: 'Kommunikation', desc: 'Direkter Austausch mit Mandant & Anwalt.' },
  { title: 'Echtzeit-Statistiken', desc: 'Übersichten zu Performance & Einnahmen.' },
  { title: 'Automatisierte Auszahlung', desc: 'Provisionsabrechnung ohne manuellen Aufwand.' }
];

export default function PartnerBenefits() {
  return (
    <Section className="py-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title text-center">Deine Vorteile als Gutachter-Partner</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map((b) => (
            <div key={b.title} className="p-6 bg-white rounded-xl shadow-md">
              <h3 className="font-semibold">{b.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}


