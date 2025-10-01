import React from 'react';
import Section from '@/components/ui/Section';

const principles = [
  { title: 'Innovation', text: 'Wir entwickeln selbst & automatisieren alles, was möglich ist' },
  { title: 'Nähe', text: 'Kommunikation mit echten Experten, kein Bot‑Blabla' },
  { title: 'Erfolg', text: 'Wir analysieren jede Anfrage mit datenbasierten Prognosen' },
  { title: 'Effizienz', text: 'Kein Papier, keine Telefonwarteschleifen' }
];

export default function AboutPrinciples() {
  return (
    <Section className="py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="section-title">Unsere Prinzipien</h2>
        <p className="section-subtitle">Was uns antreibt</p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {principles.map((p) => (
            <div key={p.title} className="rounded-xl bg-white p-6 shadow-sm">
              <div className="text-teal-600 mb-3">💡</div>
              <div className="font-semibold">{p.title}</div>
              <p className="mt-2 text-sm text-slate-600">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
