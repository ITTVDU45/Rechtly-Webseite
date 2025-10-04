"use client";
import React, { useState, useEffect } from 'react';
import Section from '@/components/ui/Section';
import './PartnerHero.css';

export default function PartnerHero() {
  const [isMobile, setIsMobile] = useState(false);

  // Mobile detection - nur auf Client-Seite ausführen
  useEffect(() => {
    // Vermeidung von Hydration-Fehlern durch Verzögerung der Client-Seiten-Logik
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    
    // Initial check - verzögert ausführen, um Hydration-Fehler zu vermeiden
    const timer = setTimeout(() => {
      checkMobile();
      // Event-Listener erst nach der Hydration hinzufügen
      window.addEventListener('resize', checkMobile);
    }, 0);
    
    // Clean up
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  return (
    <section 
      style={{ 
        background: 'linear-gradient(135deg, #1b3a4b 0%, #2c5364 100%)', 
        minHeight: '60vh', 
        display: 'flex', 
        alignItems: 'center' 
      }} 
      className="pt-32 md:pt-40 pb-32 md:pb-48 text-white partner-hero-section"
    >
      <div className="max-w-7xl mx-auto px-10 lg:px-8 partner-hero-container">
        <div className="rounded-xl shadow-lg p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 bg-white/5 backdrop-blur-sm partner-hero-card">
          <div className="flex-1">
            <h1 className="text-white text-3xl md:text-4xl font-extrabold partner-hero-title">
              Werde Partner‑Gutachter bei Rechtly
            </h1>
            <p className="mt-4 text-white/90 partner-hero-subtitle">
              Nutze deinen Sachverstand – wir übernehmen Marketing, Fälle & Abrechnung.
            </p>
            <div className="mt-6 partner-hero-button-container">
              <a
                href="/partnerschaftsanfrage"
                className="partner-hero-button"
                style={{ background: 'linear-gradient(135deg, #c7e70c 0%, #a3e635 100%)' }}
              >
                <span className="partner-hero-button-text">
                  Jetzt Partner werden
                </span>
              </a>
            </div>
          </div>

          <div className="flex-1 partner-hero-image">
            <div className="w-full h-auto rounded-xl overflow-hidden">
              <img 
                src="/assets/images/Rechtsberatung.png" 
                alt="Gutachter" 
                className="shadow-lg"
                style={{ minHeight: isMobile ? '180px' : '280px' }}
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}