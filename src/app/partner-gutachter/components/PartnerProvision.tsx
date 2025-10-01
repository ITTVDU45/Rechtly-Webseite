import React from 'react';
import Section from '@/components/ui/Section';

export default function PartnerProvision() {
  return (
    <Section className="py-16">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="section-title">Gestaffelte Provision & Beispielrechnung</h2>
        <p className="section-subtitle">Faire, transparente Provisionen – Grund- und Bonusstufen für aktive Partner.</p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl shadow-md bg-white">
            <h3 className="font-semibold">Fallwert</h3>
            <div className="mt-4 text-2xl font-bold">2.500 €</div>
            <div className="text-sm mt-2 text-slate-600">Beispiel</div>
          </div>

          <div className="p-6 rounded-xl shadow-md bg-white">
            <h3 className="font-semibold">Grundprovision</h3>
            <div className="mt-4 text-2xl font-bold">20%</div>
            <div className="text-sm mt-2 text-slate-600">= 500 €</div>
          </div>

          <div className="p-6 rounded-xl shadow-md bg-white">
            <h3 className="font-semibold">Bonus</h3>
            <div className="mt-4 text-2xl font-bold">+5% bei &gt;50 Fällen</div>
            <div className="text-sm mt-2 text-slate-600">Zusätzliche Vergütung</div>
          </div>
        </div>

        <p className="mt-6 text-sm text-slate-500">Beispielwerte, tatsächliche Beträge variieren je nach Vereinbarung.</p>
      </div>
    </Section>
  );
}


