"use client";
import React from 'react';
import Section from '@/components/ui/Section';

export default function UnfallHero() {
  return (
    <Section className="pt-32 md:pt-40 pb-32 md:pb-48 bg-gradient-to-br text-white" style={{ background: 'linear-gradient(135deg, #1b3a4b 0%, #2c5364 100%)', minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold">Verkehrsunfall gehabt? Wir übernehmen die Abwicklung.</h1>
        <p className="mt-6 text-lg md:text-xl">Rechtlich abgesichert – einfach, digital und mit voller Kontrolle im Portal.</p>
        <div className="mt-10">
          <button className="rounded-2xl text-slate-900 px-8 md:px-10 py-3 md:py-4 text-lg md:text-xl" style={{ background: 'linear-gradient(135deg, rgb(199, 231, 12), rgb(163, 230, 53))' }}>Unfall melden</button>
        </div>
      </div>
    </Section>
  );
}
