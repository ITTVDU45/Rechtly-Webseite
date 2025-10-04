"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import Section from '@/components/ui/Section';

export default function HeroSection() {
  const router = useRouter();

  const handleFallEinreichen = () => {
    router.push('/anliegen-pruefen/kfz-gutachten');
  };

  return (
    <Section className="pt-32 md:pt-44 pb-35 md:pb-48 bg-gradient-to-br text-white" style={{ background: 'linear-gradient(135deg, #1b3a4b 0%, #2c5364 100%)', minHeight: '65vh', display: 'flex', alignItems: 'center' }}>
      <div className="max-w-7xl mx-auto px-5 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold">Kfz-Gutachten einfach & digital</h1>
        <p className="mt-6 text-lg md:text-xl">Unfall gehabt? Wir bringen dich zum passenden Gutachter – kostenlos & stressfrei.</p>
        <p className="text-sm text-slate-300 mt-3">*wenn Sie unverschuldet in einen Verkehrsunfall geraten sind.</p>

        <div className="mt-10">
          <button 
            className="rounded-2xl text-slate-900 px-8 md:px-10 py-3 md:py-4 text-lg md:text-xl hover:scale-105 transition-transform duration-200" 
            style={{ background: 'linear-gradient(135deg, rgb(199, 231, 12), rgb(163, 230, 53))' }}
            onClick={handleFallEinreichen}
          >
            Jetzt Fall einreichen
          </button>
        </div>

        

       
      </div>
    </Section>
  );
}
