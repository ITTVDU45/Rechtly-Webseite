"use client";
import React, { useState, useEffect } from 'react';
import Section from '@/components/ui/Section';
import MagicBento, { BentoItem } from '@/components/ui/MagicBento';
import AICardCarousel from './AICardCarousel';
import './PartnerAI.css';

const AI_ITEMS: BentoItem[] = [
  {
    id: 1,
    title: "Automatische Fallanalyse",
    description: "Unsere KI analysiert jeden Fall vor der Zuweisung und bereitet relevante Daten für dich auf.",
    image: "/assets/images/Rechtly Bild mit Logo.png"
  },
  {
    id: 2,
    title: "Priorisierung von Fällen",
    description: "Intelligente Sortierung nach Dringlichkeit, Komplexität und Standort für optimale Arbeitsplanung.",
    image: "/assets/images/Rechtly Bild KFZ GUTACHTEN.png"
  },
  {
    id: 3,
    title: "Prädiktive Erfolgsschätzung",
    description: "KI-basierte Vorhersage der Erfolgswahrscheinlichkeit und möglicher Schadenshöhe.",
    image: "/assets/images/Rechtly Bild Unfall.png"
  },
  {
    id: 4,
    title: "Automatische Benachrichtigungen",
    description: "Erinnerungen zu wichtigen Fristen und Updates für alle Beteiligten ohne manuellen Aufwand.",
    image: "/assets/images/Rechtly Bild Blitzer.png"
  },
  {
    id: 5,
    title: "Vorstrukturierte Berichtsvorlagen",
    description: "KI-optimierte Vorlagen für schnellere Gutachtenerstellung mit automatischer Dateneinfügung.",
    image: "/assets/images/Rechtly Bild Strafzettel.png"
  }
];

export default function PartnerAI() {
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
    <Section className="py-16 bg-gradient-to-br from-[#1b3a4b] to-[#2c5364] text-white partner-ai-section">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title text-center text-white mb-10">Unsere KI-Unterstützung für Gutachter</h2>
        <p className="text-center text-white/90 max-w-3xl mx-auto mb-12 section-subtitle">
          Nutze unsere KI-Tools, um deine Arbeit zu optimieren, Zeit zu sparen und die Qualität deiner Gutachten zu verbessern.
        </p>
        
        {/* Desktop: BentoGrid */}
        <div className="desktop-only-grid">
          <MagicBento items={AI_ITEMS} />
        </div>
        
        {/* Mobile: Carousel */}
        <div className="mobile-only-carousel">
          <AICardCarousel items={AI_ITEMS} />
        </div>
        
        {/* CTA Button */}
        <div className="text-center mt-8 md:mt-12">
          <a 
            href="#partner-cta" 
            className="ai-cta-button"
          >
            Jetzt Partner werden
          </a>
        </div>
      </div>
    </Section>
  );
}