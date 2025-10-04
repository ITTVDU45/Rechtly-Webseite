"use client";
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Section from '@/components/ui/Section';
import { Zap, Clock, Ruler, Smartphone, MapPin, Coffee, ZapOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import '../bussgeld.css';

type Category = {
  id: number;
  title: string;
  lead: string;
  href: string;
  icon: React.ReactNode;
};

const categories: Category[] = [
  { id: 1, title: 'Geschwindigkeit', lead: 'Viele Bußgeldbescheide entstehen durch einfache Tempolimits. Ob 21 km/h zu viel oder über 70 km/h – bei Fahrverbot und Punkten helfen wir sofort weiter.', href: '/anliegen-pruefen/bussgeld', icon: <Zap size={24} /> },
  { id: 2, title: 'Rotlichtverstoß', lead: 'Ein Rotlichtverstoß kann teuer werden – vor allem bei qualifizierten Verstößen. Wir prüfen Messung und Beweislage.', href: '/anliegen-pruefen/bussgeld', icon: <Clock size={24} /> },
  { id: 3, title: 'Abstand', lead: 'Moderne Messsysteme werten Fahrverhalten sekundengenau aus. Nicht immer korrekt. Wir helfen bei Bußgeld, Punkten oder Fahrverbot.', href: '/anliegen-pruefen/bussgeld', icon: <Ruler size={24} /> },
  { id: 4, title: 'Handy am Steuer', lead: 'Schon der kurze Blick aufs Display kann teuer werden. Wir prüfen, ob die Kontrolle rechtlich einwandfrei war.', href: '/anliegen-pruefen/bussgeld', icon: <Smartphone size={24} /> },
  { id: 5, title: 'Parken & Halten', lead: 'Egal ob Halteverbot oder Feuerwehrzufahrt – Bußgelder sind schnell verteilt. Wir sagen, ob Einspruch lohnt.', href: '/anliegen-pruefen/bussgeld', icon: <MapPin size={24} /> },
  { id: 6, title: 'Alkohol / Drogen', lead: 'Verfahren mit Alkohol oder Drogen führen oft zu Fahrverbot und MPU. Wir prüfen Ihre Rechte und zeigen Auswege.', href: '/anliegen-pruefen/bussgeld', icon: <Coffee size={24} /> },
  { id: 7, title: 'Verkehrsunfall', lead: 'Auch bei Unfällen können Bußgelder drohen – etwa wegen Fahrlässigkeit oder fehlender Abstand. Wir helfen bei der Einschätzung.', href: '/anliegen-pruefen/verkehrsunfall', icon: <ZapOff size={24} /> }
];

// Slider-Komponente im ApproachSection-Stil
function SliderTrack({ categories, router }: { categories: Category[], router: any }) {
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
      setCurrentIndex(prev => (prev + 1) % categories.length);
    }, 5000); // 5 Sekunden pro Karte
    
    return () => clearInterval(interval);
  }, [categories.length, isPaused]);
  
  // Nächste/vorherige Karte anzeigen
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % categories.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  };
  
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + categories.length) % categories.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  };
  
  // Aktuelle Kategorie
  const category = categories[currentIndex];
  const isEven = currentIndex % 2 === 0;
  
  return (
    <div className="approach-slider">
      <div 
        className="approach-card-container"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        style={{ position: 'relative', padding: '20px 0' }}
      >
        {/* Eine einzelne Karte anzeigen */}
        <motion.article 
          className={`feature__card ${isEven ? 'card--green' : 'card--blue'}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          key={`card-${currentIndex}`} // Eindeutiger Key für Animation bei Kartenwechsel
          onClick={() => router.push(category.href)}
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
            cursor: 'pointer'
          }}
        >
          <div className="feature__card-top">
            <div className="feature__card-icon">{category.icon}</div>
            <h3 className="feature__card-title">{category.title}</h3>
          </div>
          <p className="feature__card-lead">{category.lead}</p>
          <div className="mt-4">
            <span className="feature__cta">Jetzt prüfen lassen →</span>
          </div>
        </motion.article>
        
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
        {categories.map((_, i) => (
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

export default function Categories() {
  const router = useRouter();
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
    <Section className="section--white bussgeld-categories py-16 my-8">
      <div className="section__container">
        <div className="text-center mb-8">
          <h2 className="section-title">Typische Bußgeldfälle</h2>
          <p className="section-subtitle">Schnelle Einschätzung: Wähle das Thema, das zu deinem Anliegen passt.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            {/* Neue Slider-Komponente im ApproachSection-Stil */}
            <SliderTrack categories={categories} router={router} />
          </div>

          <div className="flex items-center justify-center">
            <div className="w-full max-w-md rounded-3xl overflow-hidden">
              <Image 
                src="/assets/images/Typische Bussgeldfaelleneu.png" 
                alt="Typische Bußgeldfälle" 
                width={640} 
                height={480} 
                priority
                className="object-cover" 
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '16px'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}


