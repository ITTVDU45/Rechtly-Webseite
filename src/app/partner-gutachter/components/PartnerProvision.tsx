import React from 'react';
import Section from '@/components/ui/Section';

export default function PartnerProvision() {
  return (
    <Section className="py-16">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="section-title">Gestaffelte Provision & Beispielrechnung</h2>
        <p className="section-subtitle">Faire, transparente Provisionen – Grund- und Bonusstufen für aktive Partner.</p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl" 
               style={{ background: 'linear-gradient(135deg, #c7e70c 0%, #a3e635 100%)' }}>
            <h3 className="font-semibold text-[#1b3a4b]">Fallwert</h3>
            <div className="mt-4 text-2xl font-bold text-[#1b3a4b]">2.500 €</div>
            <div className="text-sm mt-2 text-[#1b3a4b]/80">Beispiel</div>
          </div>

          <div className="p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl" 
               style={{ background: 'linear-gradient(135deg, #1b3a4b 0%, #2c5364 100%)' }}>
            <h3 className="font-semibold text-white">Grundprovision</h3>
            <div className="mt-4 text-2xl font-bold text-white">bis zu 20%</div>
            <div className="text-sm mt-2 text-white/80">= 500 €</div>
          </div>

          <div className="p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl" 
               style={{ background: 'linear-gradient(135deg, #c7e70c 0%, #a3e635 100%)' }}>
            <h3 className="font-semibold text-[#1b3a4b]">Bonussystem</h3>
            <div className="mt-4 text-2xl font-bold text-[#1b3a4b]">+5%, +7% oder +10%</div>
            <div className="text-sm mt-2 text-[#1b3a4b]/80">bei zusätzlichen Fällen möglich</div>
          </div>
        </div>

        <p className="mt-6 text-sm text-slate-500">Beispielwerte, tatsächliche Beträge variieren je nach Vereinbarung.</p>
        
        <div className="mt-10">
          <a 
            href="#infobroschure" 
            className="inline-block rounded-xl py-3 px-6 transition-all duration-300 shadow-sm"
            style={{ background: 'linear-gradient(135deg, #c7e70c 0%, #a3e635 100%)' }}
          >
            <span
              style={{
                background: 'linear-gradient(135deg, #1b3a4b 0%, #2c5364 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                display: 'inline-block'
              }}
            >
              Infobroschüre anfordern
            </span>
          </a>
        </div>
      </div>
    </Section>
  );
}


