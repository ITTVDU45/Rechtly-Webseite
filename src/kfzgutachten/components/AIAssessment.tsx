"use client";
import React from 'react';
import Section from '@/components/ui/Section';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const checks = [
  'Prüfung deiner Ansprüche auf Schadenersatz',
  'Erkennung von Nutzungsausfall & Wertverlust',
  'Vorprüfung auf Haftungsquote & Beweislage',
  'Verknüpfung mit Rechtsschutzversicherung möglich'
];

export default function AIAssessment() {
  const router = useRouter();
  
  return (
    <Section className="py-16" style={{ background: 'linear-gradient(135deg, #1b3a4b 0%, #2c5364 100%)' }}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Zentrierter Header mit größerem Titel */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4">Automatische Ersteinschätzung deines Falls</h2>
          <p className="mt-2 text-xl text-white/90 max-w-3xl mx-auto">Unsere KI analysiert deine Angaben – schnell, zuverlässig & datenschutzkonform.</p>
          
          {/* Short text above the cards */}
          <p className="mt-4 text-lg text-white/80 max-w-3xl mx-auto">Anhand deiner Angaben liefert unsere KI eine erste Einschätzung zu Haftung, Schadenhöhe und möglichen Ausgleichsansprüchen.</p>
          
          {/* CTA Button */}
          <div className="mt-8 flex justify-center">
            <button 
              onClick={() => router.push('/anliegen-pruefen/verkehrsunfall')}
              className="flex items-center gap-2 px-10 py-4 text-lg font-bold text-[#1B3A4B] rounded-full transition-all duration-300 hover:translate-y-[-2px]"
              style={{ 
                background: 'linear-gradient(135deg, #c7e70c, #a3e635)',
                boxShadow: '0 0 15px rgba(199, 231, 12, 0.4)',
                position: 'relative'
              }}
            >
              <span>Jetzt starten – kostenfrei</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12h14M14 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          
          <p className="mt-3 text-sm text-white/70">Unverbindlich. Ersteinschätzung in wenigen Minuten.</p>
        </div>
        
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Left: text & checks with decorative background cards */}
          <div className="w-full md:w-1/2 relative">

            {/* Decorative stacked background cards (desktop only) */}
            <div className="hidden md:block absolute left-0 top-36 -z-0">
              <div className="space-y-4">
                <div className="rounded-xl p-6 shadow-sm" style={{ width: 420, background: 'linear-gradient(135deg,#c7e70c 0%,#a3e635 100%)' }}>
                  <div className="text-sm font-medium text-slate-900">Automatisierte Fallzuweisung</div>
                  <div className="text-sm text-slate-800 mt-1">Keine Zeit verlieren – wir bringen die passenden Fälle direkt zu Ihnen.</div>
                </div>

                <div className="rounded-xl p-6 shadow-sm" style={{ width: 420, background: 'linear-gradient(135deg,#1b3a4b 0%,#2c5364 100%)' }}>
                  <div className="text-sm font-medium text-white">Digitale Plattform</div>
                  <div className="text-sm text-white/90 mt-1">Alle Dokumente, Kommunikation und Statusmeldungen in einer Oberfläche.</div>
                </div>

                <div className="rounded-xl p-6 shadow-sm" style={{ width: 420, background: 'linear-gradient(135deg,#c7e70c 0%,#a3e635 100%)' }}>
                  <div className="text-sm font-medium text-slate-900">Transparenz & Kontrolle</div>
                  <div className="text-sm text-slate-800 mt-1">Jeder Schritt nachvollziehbar, jederzeit einsehbar.</div>
                </div>

                <div className="rounded-xl p-6 shadow-sm" style={{ width: 420, background: 'linear-gradient(135deg,#1b3a4b 0%,#2c5364 100%)' }}>
                  <div className="text-sm font-medium text-white">Fairer Bonus</div>
                  <div className="text-sm text-white/90 mt-1">50 € pro erfolgreicher Vermittlung.</div>
                </div>
              </div>
            </div>

            {/* Checklist (in front) */}
            <div className="mt-6 grid grid-cols-1 gap-4 relative z-10">
              {checks.map((c) => (
                <div
                  key={c}
                  className="flex items-start gap-4 rounded-xl p-4 shadow-sm bg-white hover:translate-y-[-4px] transition-transform duration-200"
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-neon text-slate-900 shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <path d="M5 13l4 4L19 7" stroke="#07222b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-800">{c}</div>
                    <div className="text-xs text-slate-500 mt-1">Kurz und verständlich geprüft</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: image/illustration (larger) */}
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <div className="w-full max-w-2xl rounded-2xl overflow-hidden bg-gradient-to-br from-slate-50 to-white shadow">
              <Image src="/assets/images/vision.png" alt="KI Analyse" width={860} height={420} className="object-cover w-full h-full" />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
