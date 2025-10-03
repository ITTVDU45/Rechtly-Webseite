"use client";
import React from 'react';
import Section from '@/components/ui/Section';

export default function Hero() {
  return (
    <Section className="section--lg partner-hero" style={{ background: 'linear-gradient(135deg, #1b3a4b 0%, #2c5364 100%)', minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
      <div className="max-w-7xl mx-auto px-5 flex flex-col items-center">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white">Partnerprogramm von Rechtly</h1>
          <p className="mt-6 text-lg md:text-xl text-white">Werden Sie Partner und erhalten Sie Provision für vermittelte Fälle.</p>
        </div>
        
        <div className="partner-hero__inner w-full">
          <div className="partner-hero__copy text-white">
            <form className="partner-form" onSubmit={(e) => { e.preventDefault(); alert('Danke — Anfrage gesendet'); }}>
              <div className="partner-form__card w-full md:w-[420px] bg-white rounded-2xl p-6 shadow-lg text-[#07222b]">
                <div className="mb-3">
                  <label htmlFor="name" className="text-sm font-medium">Name</label>
                  <input id="name" name="name" type="text" required className="w-full mt-2 p-3 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A3E635]/40" />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <input id="email" name="email" type="email" required className="w-full mt-2 p-3 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A3E635]/40" />
                </div>

                <label className="flex items-center gap-2 text-sm mb-4"><input type="checkbox" required className="h-4 w-4" /> <span>Ich stimme der Verarbeitung meiner Daten zu.</span></label>

                <button type="submit" className="w-full rounded-full py-3 font-semibold" style={{ background: 'linear-gradient(135deg, rgb(199, 231, 12) 0%, rgb(139, 195, 74) 100%)', color: '#07222b' }}>Beitreten</button>
              </div>
            </form>
          </div>

          <div className="partner-hero__image">
            <img src="/assets/images/anspruchskauf.png" alt="Partner Visual" />
          </div>
        </div>
      </div>
    </Section>
  );
}


