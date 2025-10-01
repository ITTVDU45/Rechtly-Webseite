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
          <button className="w-full rounded-full py-3 font-semibold" style={{ background: 'linear-gradient(135deg,#FACC15 0%,#C7E70C 100%)', color: '#07222b' }}>Partneranfrage senden</button>
        </form>
      </div>
    </Section>
  );
}


