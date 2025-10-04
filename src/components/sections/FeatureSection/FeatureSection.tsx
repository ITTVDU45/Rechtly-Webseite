'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  FiMapPin,
  FiAlertCircle,
  FiMinus,
  FiSmartphone,
  FiDroplet,
  FiTruck,
  FiUpload,
  FiMessageSquare,
  FiCheckCircle,
  FiFileText
} from 'react-icons/fi';
import './FeatureSection.css';

type Feature = {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
};

type ProzessSchritt = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const features: Feature[] = [
  { id: 1, icon: <FiMapPin size={32} />, title: 'Geschwindigkeitsverstoß', description: 'Zu schnell unterwegs? Lassen Sie Ihren Fall digital prüfen – schnell und unkompliziert!' },
  { id: 2, icon: <FiAlertCircle size={32} />, title: 'Rotlichtverstoß', description: 'Eine rote Ampel übersehen? Wir helfen Ihnen, Einspruch einzulegen. Jetzt online prüfen lassen!' },
  { id: 3, icon: <FiMinus size={32} />, title: 'Abstandsverstoß', description: 'Zu wenig Abstand gehalten? Wir analysieren Ihren Fall und klären Ihre Chancen. Jetzt prüfen lassen!' },
  { id: 4, icon: <FiSmartphone size={32} />, title: 'Handyverstoß', description: 'Handy am Steuer? Wir prüfen, ob Ihr Bußgeldbescheid gerechtfertigt ist – starten Sie die digitale Prüfung!' },
  { id: 5, icon: <FiDroplet size={32} />, title: 'Alkohol- / Drogenverstoß', description: 'Alkohol- oder Drogentest nicht bestanden? Lassen Sie sich von Experten unterstützen – direkt online!' },
  { id: 6, icon: <FiTruck size={32} />, title: 'Verkehrsunfall', description: 'Unverschuldet in einen Unfall geraten? Unsere Plattform übernimmt die Abwicklung für Sie – jetzt Fall einreichen!' }
];

const prozessSchritte: ProzessSchritt[] = [
  { icon: <FiUpload size={32} />, title: 'Bußgeldfall melden', description: 'Tragen Sie alle relevanten Informationen zu Ihrem Bußgeldbescheid ein (Aktenzeichen, Datum, Angaben zur Messung). Wir prüfen die Erfolgsaussichten.' },
  { icon: <FiFileText size={32} />, title: 'Belege & Fotos hochladen', description: 'Laden Sie Belege, Messprotokolle oder Fotos hoch – wir werten Ihre Unterlagen zur Verteidigung aus.' },
  { icon: <FiMessageSquare size={32} />, title: 'Erste rechtliche Einschätzung', description: 'Unsere KI und Experten prüfen Ihre Unterlagen und geben eine erste juristische Einschätzung sowie Empfehlungen für das weitere Vorgehen.' },
  { icon: <FiCheckCircle size={32} />, title: 'Widerspruch & Vertretung', description: 'Wir übernehmen Widerspruch, Kommunikation mit Behörden und – falls nötig – Ihre gerichtliche Vertretung.' }
];

// Slider-Komponente für die Feature-Karten
function SliderTrack({ features }: { features: Feature[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  
  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    const timer = setTimeout(() => {
      checkMobile();
      window.addEventListener('resize', checkMobile);
    }, 0);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  // Auto-Rotation
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % features.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [features.length, isPaused]);
  
  // Navigation
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % features.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  };
  
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + features.length) % features.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  };
  
  // Aktuelle Feature-Karte
  const feature = features[currentIndex];
  
  return (
    <div className="feature-slider">
      <div 
        className="feature-card-container"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Eine einzelne Karte anzeigen */}
        <motion.div 
          className="feature-card feature-card--active"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          key={`card-${currentIndex}`}
          onClick={() => router.push('/anliegen-pruefen/bussgeld')}
        >
          <div className="feature-card__icon">
            {feature.icon}
          </div>
          <h3 className="feature-card__title">
            {feature.title}
          </h3>
          <p className="feature-card__description">
            {feature.description}
          </p>
          <div className="feature-card__cta">
            <span>Anliegen prüfen</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </motion.div>
        
        {/* Navigationspfeile */}
        <button 
          onClick={prevSlide}
          className="slider-nav slider-nav--prev"
          aria-label="Vorherige Karte"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button 
          onClick={nextSlide}
          className="slider-nav slider-nav--next"
          aria-label="Nächste Karte"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      
      {/* Indikatoren */}
      <div className="slider-indicators">
        {features.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setCurrentIndex(i);
              setIsPaused(true);
              setTimeout(() => setIsPaused(false), 5000);
            }}
            aria-label={`Gehe zu Karte ${i+1}`}
            className={`slider-indicator ${i === currentIndex ? 'slider-indicator--active' : ''}`}
          />
        ))}
      </div>
      
      {/* Auto-Scroll Indikator */}
      {!isPaused && (
        <div className="auto-scroll-indicator">
          <motion.div 
            className="auto-scroll-progress"
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

const FeatureSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    const timer = setTimeout(() => {
      handleResize();
      window.addEventListener('resize', handleResize);
    }, 0);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="feature" ref={containerRef}>
      <div className="feature__container">
        <div className="feature__header">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6 }}
          >
            Sicher unterwegs mit Rechtly – wir bringen Sie digital auf die Spur
          </motion.h2>
          <motion.p 
            className="feature__description" 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Ein Moment der Unachtsamkeit, eine unerwartete Kontrolle – und schon drohen Bußgelder oder Punkte. 
            Ob Geschwindigkeitsverstoß, Rotlichtverstoß, Abstandsverstoß, Handyverstoß, Alkohol- oder Drogenverstoß 
            oder ein Verkehrsunfall – mit Rechtly müssen Sie sich keine Sorgen machen. Unsere digitale Plattform 
            mit automatisierten Workflows und KI-gestützten Assistenten übernimmt die Prüfung und Abwicklung Ihres 
            Falls – schnell, unkompliziert und ohne lästigen Papierkram. Lehnen Sie sich zurück, wir kümmern uns um Ihr Recht!
          </motion.p>
        </div>

        {/* Responsive Layout: Desktop = 2 columns (Slider links, Bild rechts), Mobile = stacked */}
        <div className="feature__layout">
          <div className="feature__slider">
            <SliderTrack features={features} />
          </div>
          
          <div className="feature__image">
            <div className="feature__image-container">
              <Image 
                src="/assets/images/Typische Bussgeldfaelleneu.png" 
                alt="Rechtly Digitale Plattform" 
                width={960} 
                height={640} 
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '16px' }} 
              />
            </div>
          </div>
        </div>

        <section className="prozess-section">
          <div className="section-container">
            <motion.div 
              className="prozess-card-wrapper" 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.6 }}
            >
              <div className="prozess-card">
                <div className="prozess-steps-list">
                  {prozessSchritte.map((schritt, index) => (
                    <div key={index} className="prozess-step">
                      <div className="prozess-step-number">{index + 1}</div>
                      <div className="prozess-step-icon">{schritt.icon}</div>
                      <div className="prozess-step-content">
                        <h3 className="prozess-step-title">{schritt.title}</h3>
                        <p className="prozess-step-desc">{schritt.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="prozess-card-cta">
                  <button 
                    className="cta-button primary large" 
                    onClick={() => window.location.href = '/anliegen-pruefen/bussgeld'}
                  >
                    <FiTruck className="button-icon" />
                    Kostenloser Bußgeldcheck
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default FeatureSection;