"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { BentoItem } from '@/components/ui/MagicBento';

type CarouselProps = {
  items: BentoItem[];
};

export default function AICardCarousel({ items }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  // Auto-Rotation der Karten
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % items.length);
    }, 5000); // 5 Sekunden pro Karte
    
    return () => clearInterval(interval);
  }, [items.length, isPaused]);
  
  // Nächste/vorherige Karte anzeigen
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  };
  
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  };
  
  // Aktuelle Karte
  const item = items[currentIndex];
  
  return (
    <div className="ai-carousel">
      <div 
        className="ai-card-container relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        style={{ padding: '20px 0' }}
      >
        {/* Eine einzelne Karte anzeigen */}
        <motion.div 
          className="ai-card"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          key={`card-${currentIndex}`}
          style={{
            margin: '0 auto',
            width: '100%',
            maxWidth: '95%',
            boxSizing: 'border-box',
            padding: '1.5rem',
            borderRadius: '14px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            minHeight: '250px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: 'linear-gradient(135deg, #1b3a4b 0%, #2c5364 100%)',
            border: '1px solid rgba(255, 255, 255, 0.15)'
          }}
        >
          {item.image && (
            <div className="ai-card-image mb-4" style={{ width: '100%', height: '160px', position: 'relative', borderRadius: '8px', overflow: 'hidden' }}>
              <Image 
                src={item.image} 
                alt={item.title?.toString() || ''}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          )}
          
          <div>
            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
            <p className="text-sm text-white/90">{item.description}</p>
          </div>
        </motion.div>
        
        {/* Navigationspfeile */}
        <button 
          onClick={prevSlide}
          className="slider-nav slider-nav--prev absolute left-0 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 border-none shadow-md flex items-center justify-center cursor-pointer z-10"
          aria-label="Vorherige Karte"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button 
          onClick={nextSlide}
          className="slider-nav slider-nav--next absolute right-0 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 border-none shadow-md flex items-center justify-center cursor-pointer z-10"
          aria-label="Nächste Karte"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      
      {/* Indikatoren */}
      <div className="slider-indicators flex justify-center gap-2 mt-5">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setCurrentIndex(i);
              setIsPaused(true);
              setTimeout(() => setIsPaused(false), 5000);
            }}
            aria-label={`Gehe zu Karte ${i+1}`}
            className={`w-${i === currentIndex ? '6' : '2'} h-2 rounded-full bg-${i === currentIndex ? '[#A3E635]' : 'white/30'} border-0 p-0 cursor-pointer transition-all duration-300`}
            style={{
              width: i === currentIndex ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              backgroundColor: i === currentIndex ? '#A3E635' : 'rgba(255, 255, 255, 0.3)',
            }}
          />
        ))}
      </div>
      
      {/* Auto-Scroll Indikator */}
      {!isPaused && (
        <div className="auto-scroll-indicator w-full max-w-[100px] mx-auto mt-3 h-[2px] bg-white/10 rounded-px overflow-hidden">
          <motion.div 
            className="auto-scroll-progress h-full bg-[#A3E635] rounded-px"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            key={`progress-${currentIndex}`}
            transition={{ 
              duration: 5, 
              ease: 'linear',
              repeat: 0
            }}
          />
        </div>
      )}
    </div>
  );
}
