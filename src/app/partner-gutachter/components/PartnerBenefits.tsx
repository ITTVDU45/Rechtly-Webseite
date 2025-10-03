'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Section from '@/components/ui/Section';

const BENEFITS = [
  { title: 'Mehr Aufträge', desc: 'Ohne aktive Akquise – wir leiten passende Fälle weiter.' },
  { title: 'Zentrale Fallverwaltung', desc: 'Alle Fälle & Kommunikation an einem Ort.' },
  { title: 'Kommunikation', desc: 'Direkter Austausch mit Mandant & Anwalt.' },
  { title: 'Echtzeit-Statistiken', desc: 'Übersichten zu Performance & Einnahmen.' },
  { title: 'Automatisierte Auszahlung', desc: 'Provisionsabrechnung ohne manuellen Aufwand.' }
];

// Slider-Komponente für die Benefits
function SliderTrack({ cards }: { cards: typeof BENEFITS }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Mobile detection - nur auf Client-Seite ausführen
  useEffect(() => {
    // Vermeidung von Hydration-Fehlern durch Verzögerung der Client-Seiten-Logik
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
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
  
  // Auto-Rotation der Karten
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % cards.length);
    }, 5000); // 5 Sekunden pro Karte
    
    return () => clearInterval(interval);
  }, [cards.length, isPaused]);
  
  // Nächste/vorherige Karte anzeigen
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  };
  
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  };
  
  // Aktuelle Karte
  const card = cards[currentIndex];
  
  return (
    <div className="benefits-slider">
      <div 
        className="benefits-card-container"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        style={{ position: 'relative', padding: '20px 0' }}
      >
        {/* Eine einzelne Karte anzeigen */}
        <motion.div 
          className="benefits-card benefits-card--active"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          key={`card-${currentIndex}`} // Eindeutiger Key für Animation bei Kartenwechsel
          style={{
            margin: '0 auto',
            width: '100%',
            maxWidth: isMobile ? '100%' : '95%',
            boxSizing: 'border-box',
            padding: isMobile ? '1.5rem' : '2rem',
            borderRadius: isMobile ? '14px' : '16px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            minHeight: isMobile ? '220px' : '280px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            backgroundColor: '#fff',
            transition: 'all 300ms ease-in-out',
            background: currentIndex % 2 === 0 
              ? 'linear-gradient(135deg, #c7e70c 0%, #a3e635 100%)' 
              : 'linear-gradient(135deg, #1b3a4b 0%, #2c5364 100%)'
          }}
        >
          <h3 style={{ 
            fontSize: isMobile ? '1.3rem' : '1.5rem', 
            marginBottom: '1rem', 
            color: currentIndex % 2 === 0 ? '#1B3A4B' : '#ffffff', 
            fontWeight: 600 
          }}>
            {card.title}
          </h3>
          <p style={{ 
            fontSize: isMobile ? '0.95rem' : '1rem', 
            lineHeight: '1.6', 
            color: currentIndex % 2 === 0 ? '#1B3A4B' : '#ffffff', 
            opacity: currentIndex % 2 === 0 ? 0.8 : 0.9,
            marginBottom: '1rem' 
          }}>
            {card.desc}
          </p>
        </motion.div>
        
        {/* Navigationspfeile */}
        <button 
          onClick={prevSlide}
          className="slider-nav slider-nav--prev"
          aria-label="Vorheriger Vorteil"
          style={{
            position: 'absolute',
            left: isMobile ? '-10px' : '-15px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: isMobile ? '36px' : '40px',
            height: isMobile ? '36px' : '40px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: 'none',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            zIndex: 10
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button 
          onClick={nextSlide}
          className="slider-nav slider-nav--next"
          aria-label="Nächster Vorteil"
          style={{
            position: 'absolute',
            right: isMobile ? '-10px' : '-15px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: isMobile ? '36px' : '40px',
            height: isMobile ? '36px' : '40px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: 'none',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            zIndex: 10
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      
      {/* Indikatoren */}
      <div 
        className="slider-indicators"
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          marginTop: '20px'
        }}
      >
        {cards.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setCurrentIndex(i);
              setIsPaused(true);
              setTimeout(() => setIsPaused(false), 5000);
            }}
            aria-label={`Gehe zu Vorteil ${i+1}`}
            className={`slider-indicator ${i === currentIndex ? 'slider-indicator--active' : ''}`}
            style={{
              width: i === currentIndex ? (isMobile ? '20px' : '24px') : (isMobile ? '6px' : '8px'),
              height: isMobile ? '6px' : '8px',
              borderRadius: '4px',
              backgroundColor: i === currentIndex ? '#A3E635' : '#ccc',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              transition: 'width 300ms ease'
            }}
          />
        ))}
      </div>
      
      {/* Auto-Scroll Indikator */}
      {!isPaused && (
        <div className="auto-scroll-indicator" style={{ 
          width: '100%', 
          maxWidth: '100px', 
          margin: '10px auto 0',
          height: '2px',
          backgroundColor: 'rgba(0,0,0,0.1)',
          borderRadius: '1px',
          overflow: 'hidden'
        }}>
          <motion.div 
            className="auto-scroll-progress"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            key={`progress-${currentIndex}`} // Eindeutiger Key für die Animation
            transition={{ 
              duration: 5, 
              ease: 'linear',
              repeat: 0
            }}
            style={{
              height: '100%',
              backgroundColor: '#A3E635',
              borderRadius: '1px'
            }}
          />
        </div>
      )}
    </div>
  );
}

export default function PartnerBenefits() {
  const [isMobile, setIsMobile] = useState(false);

  // Mobile detection - nur auf Client-Seite ausführen
  useEffect(() => {
    // Vermeidung von Hydration-Fehlern durch Verzögerung der Client-Seiten-Logik
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
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
    <Section className="py-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title text-center mb-12">Deine Vorteile als Gutachter-Partner</h2>
        
        {/* Responsive Layout: Desktop = 2 columns, Mobile = stacked with image on top */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Auf Mobilgeräten: Bild oben, Slider unten */}
          {isMobile && (
            <div className="md:order-2 mb-8">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <Image 
                  src="/assets/images/Rechtly Bild handshake.png" 
                  alt="Partner Handshake" 
                  width={600} 
                  height={400} 
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ width: '100%', height: 'auto', display: 'block' }} 
                  className="object-cover"
                />
              </div>
            </div>
          )}
          
          {/* Slider - immer sichtbar */}
          <div className="md:order-1">
            <SliderTrack cards={BENEFITS} />
          </div>
          
          {/* Auf Desktop: Bild rechts */}
          {!isMobile && (
            <div className="md:order-2">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <Image 
                  src="/assets/images/Rechtly Bild handshake.png" 
                  alt="Partner Handshake" 
                  width={600} 
                  height={400} 
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ width: '100%', height: 'auto', display: 'block' }} 
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}