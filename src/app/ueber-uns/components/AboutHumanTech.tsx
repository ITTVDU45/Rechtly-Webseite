import React from 'react';
import Section from '@/components/ui/Section';
import Image from 'next/image';

export default function AboutHumanTech() {
  return (
    <Section className="py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="rounded-2xl overflow-hidden shadow">
            <Image src="/assets/images/innovation.webp" alt="Tech & Legal" width={720} height={420} className="object-cover w-full h-full" />
          </div>
        </div>
        <div>
          <h2 className="section-title">Technologie trifft Rechtsberatung – bei uns kein Widerspruch</h2>
          <p className="section-subtitle">Rechtly wurde gegründet, um den Zugang zum Verkehrsrecht einfacher, schneller und transparenter zu machen. Hinter der Plattform stehen erfahrene Juristen, Entwickler, KI‑Engineers und Strategen mit einem Ziel: Dir zu deinem Recht zu verhelfen – ohne Papierkram, aber mit Verstand.</p>
        </div>
      </div>
    </Section>
  );
}
