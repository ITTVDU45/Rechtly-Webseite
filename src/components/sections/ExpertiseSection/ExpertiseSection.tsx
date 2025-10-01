'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import './ExpertiseSection.css';
// motion import kept for potential micro-animations; currently unused
// Lightweight slider: avoid external swiper dependency for faster dev/runtime
import { FaCar, FaBalanceScale, FaTrafficLight, FaFileContract, FaShieldAlt } from 'react-icons/fa';

type Card = { icon: React.ReactNode; title: string; description: string };

// Removed unused `advantages` dataset to satisfy linting; keep cards used in UI

const cards: Card[] = [
  { icon: <FaCar />, title: 'Digital & unkompliziert', description: 'KFZ-Gutachten bequem online – kein Papierkram, keine Wartezeiten.' },
  { icon: <FaBalanceScale />, title: 'Kostenlose Ersteinschätzung', description: 'Laden Sie Ihre Schadenbilder hoch und erhalten Sie eine erste Einschätzung – völlig kostenlos.' },
  { icon: <FaTrafficLight />, title: 'Direkter Kontakt zu KFZ-Gutachtern', description: 'Kommunikation leicht gemacht – alle Updates & Rückfragen in einem Portal.' },
  { icon: <FaFileContract />, title: 'Automatische Gutachter-Zuteilung', description: 'Wir finden den passenden Gutachter für Sie – schnell & zuverlässig.' },
  { icon: <FaShieldAlt />, title: 'Höchstmögliche Schadenssumme sichern', description: 'Optimierte Schadensbewertung für eine maximale Erstattung durch die Versicherung.' }
];

// Vereinfachte Slider-Komponente, die immer nur eine Karte zeigt
function SliderTrack({ cards }: { cards: Card[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
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
    <div className="expertise-slider">
      <div 
        className="expertise-card-container"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        style={{ position: 'relative', padding: '20px 0' }}
      >
        {/* Eine einzelne Karte anzeigen */}
        <div 
          className="advantage-card advantage-card--active"
          style={{
            margin: '0 auto',
            width: '100%',
            maxWidth: '100%',
            boxSizing: 'border-box',
            padding: '2rem',
            borderRadius: '16px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            minHeight: '300px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            backgroundColor: '#fff',
            transition: 'all 300ms ease-in-out'
          }}
        >
          <div className="advantage-card__icon" style={{ marginBottom: '1rem' }}>
            {card.icon}
          </div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#1B3A4B', fontWeight: 600 }}>
            {card.title}
          </h3>
          <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#4A5568', marginBottom: '1rem' }}>
            {card.description}
          </p>
        </div>
        
        {/* Navigationspfeile */}
        <button 
          onClick={prevSlide}
          className="slider-nav slider-nav--prev"
          aria-label="Vorherige Karte"
          style={{
            position: 'absolute',
            left: '-15px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '40px',
            height: '40px',
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
          &#10094;
        </button>
        <button 
          onClick={nextSlide}
          className="slider-nav slider-nav--next"
          aria-label="Nächste Karte"
          style={{
            position: 'absolute',
            right: '-15px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '40px',
            height: '40px',
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
          &#10095;
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
              width: i === currentIndex ? '24px' : '8px',
              height: '8px',
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
    </div>
  );
}

const ExpertiseSection: React.FC = () => {
  const router = useRouter();

  return (
    <section className="expertise-section">
      <div className="expertise__container">
        <div className="expertise__header">
          <h2>Ihr Kfz-Gutachten – Einfach, Schnell & Digital mit Rechtly</h2>
          <p className="expertise__intro">Schluss mit mühsamer Suche nach einem Kfz-Gutachter, endlosen Telefonaten und langen Wartezeiten. Mit Rechtly bieten wir Ihnen eine All-in-One Lösung: Von der Kfz-Gutachtenerstellung über anwaltliche Unterstützung bis hin zur vollständig digitalen Abwicklung – alles automatisiert und stressfrei.</p>
        </div>

        {/* Layout: links = Slider (eine Karte sichtbar), rechts = Bild */}
        <div className="expertise__layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center' }}>
          <div className="expertise__slider" style={{ width: '100%' }}>
            <SliderTrack cards={cards} />
          </div>

          <div className="expertise__image" style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: 640, borderRadius: 16, overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }}>
              <Image src="/assets/images/Bundesweites Netzwerk.png" alt="Kfz Gutachten" width={960} height={640} style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
          </div>
        </div>

        <div className="expertise__cta">
          <div className="expertise__button-group">
            <button className="expertise__button" onClick={() => router.push('/anfrage/bussgeldanfrage')}>Kfz-Gutachten Online anfordern</button>
            <button className="expertise__button expertise__button--secondary" onClick={() => router.push('/kfz-gutachten')}>Mehr dazu</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;


