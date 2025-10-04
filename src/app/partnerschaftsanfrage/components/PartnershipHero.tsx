import React from 'react';
import Section from '@/components/ui/Section';

export default function PartnershipHero() {
  return (
    <Section className="py-20 text-white" style={{ background: 'linear-gradient(135deg, rgb(27, 58, 75) 0%, rgb(44, 83, 100) 100%)' }}>
      <div className="max-w-4xl mx-auto text-center px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          Werden Sie unser Partner
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
          Starten Sie eine erfolgreiche Partnerschaft mit Rechtly und erweitern Sie Ihr Geschäft mit unserem innovativen Rechtsberatungs-System
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <div className="bg-green-500 text-white px-6 py-3 rounded-full font-semibold">
            ✓ Kostenlose Beratung
          </div>
          <div className="bg-green-500 text-white px-6 py-3 rounded-full font-semibold">
            ✓ Flexible Konditionen
          </div>
          <div className="bg-green-500 text-white px-6 py-3 rounded-full font-semibold">
            ✓ Schnelle Umsetzung
          </div>
        </div>
      </div>
    </Section>
  );
}
