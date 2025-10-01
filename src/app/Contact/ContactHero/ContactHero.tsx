import React from 'react';

export default function ContactHero(): JSX.Element {
  return (
    <section style={{ background: 'linear-gradient(135deg, #1b3a4b 0%, #2c5364 100%)', minHeight: '60vh', display: 'flex', alignItems: 'center' }} className="pt-32 md:pt-40 pb-32 md:pb-48 text-white">
      <div className="max-w-7xl mx-auto px-10 lg:px-8">
        <div className="rounded-xl shadow-lg p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 bg-white/5 backdrop-blur-sm">
          <div className="flex-1">
            <h1 className="text-white text-3xl md:text-4xl font-extrabold">Kontakt aufnehmen</h1>
            <p className="mt-4 text-white/90">Wir sind für dich da – per E‑Mail, Telefon oder persönlich vor Ort.</p>
            <div className="mt-6">
              <a
                href="#form"
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
                  Nachricht senden
                </span>
              </a>
            </div>
          </div>

          <div className="flex-1">
            <div className="w-full h-44 md:h-56 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <svg width="160" height="160" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <defs>
                  <linearGradient id="heroNeon" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#c7e70c" />
                    <stop offset="100%" stopColor="#a3e635" />
                  </linearGradient>
                </defs>
                <rect x="3" y="4" width="18" height="10" rx="1" fill="none" stroke="url(#heroNeon)" strokeWidth="1.5" />
                <path d="M22 14v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-3" fill="none" stroke="url(#heroNeon)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 10v4" fill="none" stroke="url(#heroNeon)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


