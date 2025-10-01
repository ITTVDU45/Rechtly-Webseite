import React from 'react';
import Section from '@/components/ui/Section';

const STEPS = [
  'Rechtly weist dir passende Fälle zu',
  'Du kontaktierst Mandant & Anwalt',
  'Gutachten vor Ort oder digital durchführen',
  'Ergebnis & Dokumente hochladen',
  'Provision berechnet & ausgezahlt'
];

export default function PartnerProcess() {
  return (
    <Section className="py-16">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="section-title">So funktioniert’s in 5 Schritten</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
          {STEPS.map((s, i) => (
            <div key={s} className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-10 h-10 rounded-full bg-[#C7E70C] flex items-center justify-center font-bold">{i + 1}</div>
              <p className="mt-3 text-sm text-slate-700">{s}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}


