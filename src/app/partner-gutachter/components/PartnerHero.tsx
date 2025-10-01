"use client";
import React from 'react';
import Section from '@/components/ui/Section';

export default function PartnerHero() {
  return (
    <Section className="bg-gradient-to-br from-[#0f3b45] to-[#2c5364] text-white py-16">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2">
          <h1 className="text-3xl md:text-4xl font-extrabold">Werde Partner‑Gutachter bei Rechtly</h1>
          <p className="mt-4 text-lg">Nutze deinen Sachverstand – wir übernehmen Marketing, Fälle & Abrechnung.</p>
          <div className="mt-6">
            <a href="#partner-cta" className="inline-block rounded-full px-5 py-3 font-semibold" style={{ background: 'linear-gradient(135deg,#FACC15 0%,#C7E70C 100%)', color: '#07222b' }}>Jetzt Partner werden</a>
          </div>
        </div>

        <div className="md:w-1/2">
          <img src="/assets/images/Rechtsberatung.png" alt="Gutachter" className="w-full rounded-xl shadow-lg object-cover" />
        </div>
      </div>
    </Section>
  );
}


