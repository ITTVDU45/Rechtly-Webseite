'use client';

import React, { useState, useEffect } from 'react';
import '../TeamSlider.css';

type TeamMember = {
  name: string;
  title: string;
};

type TeamSliderProps = {
  members: TeamMember[];
};

export default function TeamSlider({ members }: TeamSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Mount detection für SSR
  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-rotation der Karten
  useEffect(() => {
    if (isPaused || !mounted) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % members.length);
    }, 5000); // 5 Sekunden pro Karte
    
    return () => clearInterval(interval);
  }, [members.length, isPaused, mounted]);
  
  // Nächste/vorherige Karte anzeigen
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % members.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  };
  
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + members.length) % members.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  };

  return (
    <div 
      className="team-slider-container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div 
        className="team-slider"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {members.map((member, index) => (
          <div key={index} className="team-slide">
            <div className="team-card">
              <div className="h-24 w-24 rounded-full bg-slate-100 mb-4" />
              <h4 className="font-semibold text-xl text-[#1B3A4B]">{member.name}</h4>
              <div className="text-sm text-slate-600">{member.title}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="team-navigation">
        <button 
          className="team-nav-button" 
          onClick={prevSlide}
          aria-label="Vorheriges Teammitglied"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18l-6-6 6-6" stroke="#1B3A4B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className="team-indicators">
          {members.map((_, index) => (
            <button
              key={index}
              className={`team-indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Gehe zu Teammitglied ${index + 1}`}
            />
          ))}
        </div>
        <button 
          className="team-nav-button" 
          onClick={nextSlide}
          aria-label="Nächstes Teammitglied"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18l6-6-6-6" stroke="#1B3A4B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Auto-Scroll Indikator */}
      {!isPaused && mounted && (
        <div className="auto-scroll-indicator" style={{ 
          width: '100%', 
          maxWidth: '100px', 
          margin: '10px auto 0',
          height: '2px',
          backgroundColor: 'rgba(0,0,0,0.1)',
          borderRadius: '1px',
          overflow: 'hidden'
        }}>
          <div 
            className="auto-scroll-progress"
            style={{
              height: '100%',
              width: '0%',
              backgroundColor: '#A3E635',
              borderRadius: '1px',
              transition: 'width 5s linear',
              animation: 'progress 5s linear infinite'
            }}
          />
        </div>
      )}
    </div>
  );
}
