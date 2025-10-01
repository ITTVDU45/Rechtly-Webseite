'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Zap, 
  Cpu, 
  User, 
  Folder, 
  MessageSquare, 
  Users 
} from 'lucide-react';
import './ApproachSection.css';

type Card = { icon: React.ReactNode; title: string; description: string };

const cards: Card[] = [
  {
    icon: <Zap size={32} />,
    title: 'Zukunftsweisende Legal-Tech-Plattform',
    description: 'Mit modernster Technologie und automatisierten Workflows digitalisieren wir den gesamten Rechtsprozess – schnell, effizient und fehlerfrei.'
  },
  {
    icon: <Cpu size={32} />,
    title: 'Automatisierte Überprüfung',
    description: 'Unsere KI analysiert Ihren Fall in Sekunden und gibt Ihnen eine erste Einschätzung – sofort und kostenlos.'
  },
  {
    icon: <User size={32} />,
    title: 'KI-Mitarbeiter begleiten Sie',
    description: 'Lehnen Sie sich zurück! Unsere KI-gestützten Assistenten übernehmen die Abwicklung, damit Sie sich um nichts kümmern müssen.'
  },
  {
    icon: <Folder size={32} />,
    title: 'Ihr persönliches Mandantenportal',
    description: 'Alle Dokumente, Nachrichten und Statusupdates an einem Ort – jederzeit abrufbar und transparent.'
  },
  {
    icon: <MessageSquare size={32} />,
    title: '24/7 KI-gestützter Chat',
    description: 'Unsere smarte KI-Assistentin steht Ihnen rund um die Uhr zur Seite – für schnelle Antworten und sofortige Unterstützung.'
  },
  {
    icon: <Users size={32} />,
    title: 'Direkte Verbindung zu Anwälten & Gutachtern',
    description: 'Kein Warten, keine Umwege – kommunizieren Sie direkt mit unseren Verkehrsrechtsexperten und Kfz-Gutachtern über unsere Plattform.'
  }
];

// Vereinfachte Slider-Komponente, die immer nur eine Karte zeigt
function SliderTrack({ cards }: { cards: Card[] }) {
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
    <div className="approach-slider">
      <div 
        className="approach-card-container"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        style={{ position: 'relative', padding: '20px 0' }}
      >
        {/* Eine einzelne Karte anzeigen */}
        <motion.div 
          className="approach-card approach-card--active"
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
            minHeight: isMobile ? '250px' : '300px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            backgroundColor: '#fff',
            transition: 'all 300ms ease-in-out'
          }}
        >
          <div className="approach-card__icon" style={{ marginBottom: '1rem', color: '#A3E635' }}>
            {card.icon}
          </div>
          <h3 style={{ 
            fontSize: isMobile ? '1.3rem' : '1.5rem', 
            marginBottom: '1rem', 
            color: '#1B3A4B', 
            fontWeight: 600 
          }}>
            {card.title}
          </h3>
          <p style={{ 
            fontSize: isMobile ? '0.95rem' : '1rem', 
            lineHeight: '1.6', 
            color: '#4A5568', 
            marginBottom: '1rem' 
          }}>
            {card.description}
          </p>
        </motion.div>
        
        {/* Navigationspfeile */}
        <button 
          onClick={prevSlide}
          className="slider-nav slider-nav--prev"
          aria-label="Vorherige Karte"
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
          aria-label="Nächste Karte"
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
            aria-label={`Gehe zu Karte ${i+1}`}
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

const ApproachSection: React.FC = () => {
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
    <section className="approach-section">
      <div className="approach__container">
        <div className="approach__header">
          <h2>Wir machen Recht digital & unkompliziert</h2>
          <p className="approach__intro">Bei uns stehen automatisierte Prozesse, digitale Workflows und innovative Technologien im Mittelpunkt – damit Ihr Fall schnell, effizient und fehlerfrei bearbeitet wird. Mit Rechtly erleben Sie eine völlig neue Art der Rechtsberatung: unkompliziert, verständlich und jederzeit zugänglich.</p>
        </div>

        {/* Responsive Layout: Desktop = 2 columns, Mobile = stacked with image on top */}
        <div className="approach__layout">
          <div className="approach__image">
            <div className="approach__image-container">
              <Image 
                src="/assets/images/innovation.webp" 
                alt="Digital Legal Tech" 
                width={960} 
                height={640} 
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ width: '100%', height: 'auto', display: 'block' }} 
              />
            </div>
          </div>

          <div className="approach__slider">
            <SliderTrack cards={cards} />
          </div>
        </div>

        <div className="approach__cta">
          <div className="approach__button-group">
            <Link href="/ueber-uns" className="approach__button">Mehr über uns</Link>
            <Link href="/kontakt" className="approach__button approach__button--secondary">Kontakt aufnehmen</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApproachSection;