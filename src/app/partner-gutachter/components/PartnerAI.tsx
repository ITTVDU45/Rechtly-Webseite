import React from 'react';
import Section from '@/components/ui/Section';

const AI_ITEMS = [
  'Automatische Fallanalyse vor Zuweisung',
  'Priorisierung von Fällen',
  'Prädiktive Erfolgsschätzung',
  'Automatische Benachrichtigungen & Fristen',
  'Vorstrukturierte Berichtsvorlagen'
];

export default function PartnerAI() {
  return (
    <Section className="py-16 bg-slate-50">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="section-title">Unsere künstliche Unterstützung für dich</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {AI_ITEMS.map((it) => (
            <div key={it} className="p-6 bg-white rounded-xl shadow-md">
              <h3 className="font-semibold">{it}</h3>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}


