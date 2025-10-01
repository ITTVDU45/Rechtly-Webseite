import React from 'react';
import Section from '@/components/ui/Section';
import SmoothScroll from '@/components/ui/SmoothScroll';
import FAQSearch from './FAQSearch';
import { categories } from '../data';

export default function FAQHero() {
  return (
    <Section className="pt-40 md:pt-48 pb-40 md:pb-64" style={{ background: 'linear-gradient(135deg, #1b3a4b 0%, #2c5364 100%)', minHeight: '95vh', display: 'flex', alignItems: 'center' }}>
      <div className="max-w-7xl mx-auto px-6 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-extrabold">Häufige Fragen – alles, was du über Rechtly wissen musst</h1>
        <p className="mt-6 text-lg md:text-xl text-white/90">Hier findest du Antworten rund um Punktestand, Bußgeld, Unfälle, Gutachten & unsere Leistungen.</p>

        <div className="mt-10 max-w-5xl mx-auto">
          <FAQSearch categories={categories} />

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {categories.map((c) => (
              <a key={c.id} href={`#${c.id}`} data-target={c.id} className="faq-anchor rounded-xl bg-white/10 p-7 text-center shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-4px] hover:bg-white/15">
                <div className="text-3xl mb-3">{c.icon}</div>
                <div className="font-semibold text-lg">{c.title}</div>
              </a>
            ))}
          </div>
        </div>
      </div>
      <SmoothScroll />
    </Section>
  );
}
