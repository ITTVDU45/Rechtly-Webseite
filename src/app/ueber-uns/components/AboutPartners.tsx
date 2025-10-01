import React from 'react';
import Section from '@/components/ui/Section';
import Image from 'next/image';

const logos = ['/assets/images/LOGO.png','/assets/images/Logo.png','/assets/images/Logo Weiß.png','/assets/images/trust_mobile-1-1024x64.png'];

export default function AboutPartners() {
  return (
    <Section className="py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="section-title">Starkes Netzwerk für starke Fälle</h2>
        <p className="section-subtitle">Unsere Partner: Kanzleien, Gutachter und Flottenkunden</p>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 items-center">
          {logos.map((l, i) => (
            <div key={i} className="flex items-center justify-center p-4 bg-white rounded-xl shadow-sm">
              <Image src={l} alt={`Partner ${i}`} width={160} height={64} className="object-contain" />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
