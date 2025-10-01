'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Section from '@/components/ui/Section';
import './Anspruchsleistungen.css';

type Card = { title: string; desc: string; img: string };

const services: Card[] = [
  { title: 'Abschleppdienst', desc: 'Erstattung der Kosten für den Abschleppdienst nach einem Unfall, wenn Ihr Fahrzeug nicht mehr fahrbereit ist.', img: '/assets/images/Unfall.png' },
  { title: 'Ersatzwagen', desc: 'Anspruch auf einen Mietwagen für die gesamte Dauer der Reparatur, wenn Sie unverschuldet in einen Unfall verwickelt wurden.', img: '/assets/images/Verkehrsunfall.png' },
  { title: 'Gutachter', desc: 'Beauftragung eines unabhängigen KFZ-Gutachters zur genauen Kalkulation der Schadenshöhe – bezahlt von der gegnerischen Versicherung.', img: '/assets/images/Was ist Rechtly.png' },
  { title: 'Totalschaden', desc: 'Bei einem wirtschaftlichen Totalschaden haben Sie Anspruch auf die volle Erstattung des Wiederbeschaffungswerts Ihres Fahrzeugs.', img: '/assets/images/Unfallabwicklung-Bild.png' },
  { title: 'Schmerzensgeld', desc: 'Bei Personenschäden steht Ihnen eine angemessene Entschädigung für erlittene Schmerzen und Beeinträchtigungen zu.', img: '/assets/images/Rechtsberatung.png' },
  { title: 'Wertminderung', desc: 'Ausgleich für den Wertverlust Ihres Fahrzeugs nach einem Unfall, auch wenn es fachgerecht repariert wurde.', img: '/assets/images/vision.png' },
  { title: 'Werkstattwahl', desc: 'Sie haben das Recht, selbst zu entscheiden, in welcher Werkstatt Ihr Fahrzeug repariert werden soll – ohne Einschränkungen durch die Versicherung.', img: '/assets/images/Automatisierte Kundengewinnung.png' },
  { title: 'Fiktive Abrechnung', desc: 'Sie können zwischen einer Reparatur oder der Auszahlung des Schadens wählen – die Entscheidung liegt bei Ihnen.', img: '/assets/images/Was ist Rechtly.png' }
];

// Slider-Komponente für die Karten
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
    <div className="anspruch-slider">
      <div 
        className="anspruch-card-container"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        style={{ position: 'relative', padding: '20px 0' }}
      >
        {/* Eine einzelne Karte anzeigen */}
        <div 
          className="anspruch-card anspruch-card--active"
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
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#1B3A4B', fontWeight: 600 }}>
            {card.title}
          </h3>
          <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#4A5568', marginBottom: '1rem' }}>
            {card.desc}
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

export default function Anspruchsleistungen() {
  return (
    <Section className="anspruch-section">
      <div className="anspruch__container">
        <div className="anspruch__header">
          <h2>Recht auf Leistungen</h2>
          <p className="anspruch__intro">Leistungen, die Sie in Anspruch nehmen können</p>
        </div>

        <div className="anspruch__layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center' }}>
          <div className="anspruch__slider" style={{ width: '100%' }}>
            <SliderTrack cards={services} />
          </div>

          <div className="anspruch__image" style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: 640, borderRadius: 16, overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }}>
              <Image src="/assets/images/Unfallabwicklung-Bild.png" alt="Anspruchsleistungen" width={960} height={640} style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
          </div>
        </div>

        <div className="anspruch__cta">
          <div className="anspruch__button-group">
            <button className="anspruch__button">Unfall melden</button>
          </div>
        </div>
      </div>
    </Section>
  );
}