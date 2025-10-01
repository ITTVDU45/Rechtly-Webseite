import React from 'react';
import Section from '@/components/ui/Section';

const items = [
  { title: 'Ersatzfahrzeug', desc: 'Bereitstellung eines Ersatzfahrzeugs während der Reparatur.' },
  { title: 'Schadensgutachten', desc: 'Schnelle Beauftragung von zertifizierten Gutachtern.' },
  { title: 'Fachanwalt', desc: 'Rechtsberatung und Durchsetzung Ihrer Ansprüche.' },
  { title: 'Nutzungsausfall', desc: 'Prüfung und Durchsetzung von Nutzungsausfallansprüchen.' }
];

export default function Ersatzleistungen() {
  return (
    <Section className="py-12" style={{ background: 'linear-gradient(135deg, #1b3a4b 0%, #2c5364 100%)' }}>
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="section-title text-white" style={{ color: '#ffffff' }}>Ersatzleistungen bei Rechtly</h2>
        <p className="section-subtitle text-white" style={{ color: '#ffffff' }}>Leistungen, die wir vermitteln und abwickeln können</p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {items.map((it) => (
            <div key={it.title} className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-slate-800">{it.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{it.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <button className="rounded-2xl text-slate-900 px-6 py-3" style={{ background: 'linear-gradient(135deg, rgb(199, 231, 12), rgb(163, 230, 53))' }}>Jetzt Anspruch prüfen lassen</button>
        </div>
      </div>
    </Section>
  );
}
