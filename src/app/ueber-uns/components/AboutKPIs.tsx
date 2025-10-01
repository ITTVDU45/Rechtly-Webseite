import React from 'react';
import Section from '@/components/ui/Section';

const kpis = [
  { label: 'Über Anfragen', value: 'XX.000' },
  { label: 'Weiterempfehlungsrate', value: '98%' },
  { label: 'Schnitt: Rückmeldung', value: '<6h' },
  { label: 'Support', value: '24/7' }
];

export default function AboutKPIs() {
  return (
    <Section className="py-12 text-white" style={{ background: 'linear-gradient(135deg, #1b3a4b 0%, #2c5364 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="section-title text-white" style={{ color: '#ffffff' }}>Was uns antreibt – und was wir erreicht haben</h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {kpis.map((k) => (
            <div key={k.label} className="rounded-xl bg-white p-6 shadow-sm">
              <div className="text-3xl font-extrabold" style={{ background: 'linear-gradient(135deg,#c7e70c 0%,#a3e635 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>{k.value}</div>
              <div className="mt-2 text-sm text-slate-600">{k.label}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
