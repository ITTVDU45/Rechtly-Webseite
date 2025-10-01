import React from 'react';
import Section from '@/components/ui/Section';

export default function PartnerPlatform() {
  return (
    <Section className="py-16">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="section-title">Alles zentral in einer Plattform</h2>
        <p className="mt-4 text-slate-600">Dashboard, Kommunikation, Dokumentenmanagement und Analytics – alles in einer Oberfläche.</p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h3 className="font-semibold">Dashboard</h3>
            <p className="mt-2 text-sm text-slate-600">Übersicht über Fälle, Status und Einnahmen.</p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-md">
            <h3 className="font-semibold">Chat & Dokumente</h3>
            <p className="mt-2 text-sm text-slate-600">Sichere Kommunikation und Upload-Funktionen.</p>
          </div>
        </div>
      </div>
    </Section>
  );
}


