"use client";
import React from 'react';
import Section from '@/components/ui/Section';

export default function PartnerCTA() {
  return (
    <Section id="partner-cta" className="py-16 bg-gradient-to-br from-[#0f3b45] to-[#2c5364] text-white text-center rounded-xl">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-extrabold">Starte deine Partnerschaft mit Rechtly</h2>
        <p className="mt-3">Wir melden uns innerhalb von 24 h. Unverbindlich & kostenfrei.</p>

        <form className="mt-6 max-w-md mx-auto bg-white/10 p-6 rounded-xl">
          <input className="w-full rounded-md p-3 mb-3" placeholder="Name" />
          <input className="w-full rounded-md p-3 mb-3" placeholder="E-Mail" />
          <input className="w-full rounded-md p-3 mb-3" placeholder="Unternehmen / Praxis" />
          <button 
            className="w-full rounded-xl py-3 font-semibold transition-all duration-300 shadow-sm" 
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
              Partneranfrage senden
            </span>
          </button>
        </form>
      </div>
    </Section>
  );
}


