import React from 'react';
import Section from '@/components/ui/Section';

export default function AboutHero() {
  return (
    // Erhöhter top-padding, damit Hero nicht mit dem Header überlappt
    <Section className="pt-36 md:pt-52 pb-12 text-white" style={{ background: 'linear-gradient(135deg, #1b3a4b 0%, #2c5364 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold">Recht einfach: Deine digitale Lösung im Verkehrsrecht</h1>
        <p className="mt-4 text-lg text-slate-200">Wir kombinieren juristische Expertise mit smarter Technologie – für Menschen, die ihre Rechte kennen und durchsetzen wollen.</p>
        <div className="mt-8">
          <button className="rounded-2xl text-slate-900 px-6 py-3" style={{ background: 'linear-gradient(135deg, rgb(199, 231, 12), rgb(163, 230, 53))' }}>Jetzt Sofort‑Einschätzung starten</button>
        </div>
      </div>
    </Section>
  );
}
