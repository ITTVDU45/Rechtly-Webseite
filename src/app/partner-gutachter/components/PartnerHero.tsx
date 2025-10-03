"use client";
import React from 'react';
import Section from '@/components/ui/Section';

export default function PartnerHero() {
  return (
    <section 
      style={{ 
        background: 'linear-gradient(135deg, #1b3a4b 0%, #2c5364 100%)', 
        minHeight: '60vh', 
        display: 'flex', 
        alignItems: 'center' 
      }} 
      className="pt-32 md:pt-40 pb-32 md:pb-48 text-white"
    >
      <div className="max-w-7xl mx-auto px-10 lg:px-8">
        <div className="rounded-xl shadow-lg p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 bg-white/5 backdrop-blur-sm">
          <div className="flex-1">
            <h1 className="text-white text-3xl md:text-4xl font-extrabold">Werde Partner‑Gutachter bei Rechtly</h1>
            <p className="mt-4 text-white/90">Nutze deinen Sachverstand – wir übernehmen Marketing, Fälle & Abrechnung.</p>
            <div className="mt-6">
              <a
                href="#partner-cta"
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
                  Jetzt Partner werden
                </span>
              </a>
            </div>
          </div>

          <div className="flex-1">
            <div className="w-full h-auto rounded-xl overflow-hidden">
              <img 
                src="/assets/images/Rechtsberatung.png" 
                alt="Gutachter" 
                className="w-full h-full object-cover shadow-lg"
                style={{ minHeight: '280px' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}