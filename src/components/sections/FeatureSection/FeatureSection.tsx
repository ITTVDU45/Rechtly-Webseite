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
// Button removed because unused in this section
import './FeatureSection.css';
import MagicBento, { type BentoItem } from '@/components/ui/MagicBento';
import { cn } from '@/lib/utils';

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

const FeatureSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const router = useRouter();

  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    // Initialisierung und Aktualisierung des isMobile-Status beim Laden und Resize
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
    };
    
    // Verzögerte Initialisierung, um Hydration-Fehler zu vermeiden
    const timer = setTimeout(() => {
      handleResize();
      // Event-Listener für Resize erst nach der Hydration hinzufügen
      window.addEventListener('resize', handleResize);
    }, 0);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev === features.length - 1 ? 0 : prev + 1));
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  };
  
  const prevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? features.length - 1 : prev - 1));
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  };
  
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  };

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) nextSlide();
    if (touchStart - touchEnd < -50) prevSlide();
  };

  useEffect(() => {
    if (isMobile && !isPaused) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
    // Leere Rückgabefunktion, wenn nicht mobil oder pausiert
    return () => {};
  }, [isMobile, currentSlide, isPaused]);

  return (
    <section className="feature" ref={containerRef}>
      <div className="feature__container">
        <div className="feature__header">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            Sicher unterwegs mit Rechtly – wir bringen Sie digital auf die Spur
          </motion.h2>
          <motion.p className="feature__description" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
            Ein Moment der Unachtsamkeit, eine unerwartete Kontrolle – und schon drohen Bußgelder oder Punkte. Ob Geschwindigkeitsverstoß, Rotlichtverstoß, Abstandsverstoß, Handyverstoß, Alkohol- oder Drogenverstoß oder ein Verkehrsunfall – mit Rechtly müssen Sie sich keine Sorgen machen. Unsere digitale Plattform mit automatisierten Workflows und KI-gestützten Assistenten übernimmt die Prüfung und Abwicklung Ihres Falls – schnell, unkompliziert und ohne lästigen Papierkram. Lehnen Sie sich zurück, wir kümmern uns um Ihr Recht!
          </motion.p>
        </div>

        <div className="feature__content">

          {/* Neues Bento-Grid mit überarbeiteter MagicBento-Komponente */}
          <div className="feature__cards">
            {(() => {
              const imageBase = '/assets/images/';
              
              // Größen werden jetzt direkt in der MagicBento-Komponente definiert
              
              const items: BentoItem[] = features.map((feature, i) => {
                // Bildpfad für jede Karte bestimmen
                let imagePath = '';
                
                // Spezifische Bilder für jede Karte
                if (feature.id === 1 || /Geschwindigkeit/i.test(feature.title)) imagePath = `${imageBase}Geschwindigkeitsverstoß.jpg`;
                else if (/Rotlicht/i.test(feature.title)) imagePath = `${imageBase}Rotlichtverstoß.jpg`;
                else if (/Abstand/i.test(feature.title)) imagePath = `${imageBase}Abstandsverstoß.jpg`;
                else if (/Handy|Handyverstoß/i.test(feature.title)) imagePath = `${imageBase}Digitale Prozesse.png`;
                else if (/Unfall|Verkehrsunfall/i.test(feature.title)) imagePath = `${imageBase}Verkehrsunfall.png`;
                else if (/Alkohol|Drogen/i.test(feature.title)) imagePath = `${imageBase}Benefit2.jpg`;
                else imagePath = `${imageBase}Benefit1.jpg`;
                
                // Sicherstellen, dass der Pfad korrekt kodiert ist
                try {
                  imagePath = encodeURI(imagePath);
                } catch (e) {
                  imagePath = `${imageBase}Benefit1.jpg`;
                }
                
                return {
                  id: feature.id,
                  title: feature.title,
                  description: feature.description,
                  icon: feature.icon,
                  image: imagePath
                };
              });

              return <MagicBento items={items} />;
            })()}
          </div>

          <div className={`feature__carousel ${isMobile ? 'active' : ''}`}>
            <div className="feature__carousel-container">
              <div 
                className="feature__card-container"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                style={{ position: 'relative', padding: '20px 0' }}
              >
                {/* Eine einzelne Karte anzeigen */}
                <motion.div 
                  className="feature__card feature__card--active"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  key={`card-${currentSlide}`}
                  style={{
                    margin: '0 auto',
                    width: '100%',
                    maxWidth: isMobile ? '100%' : '95%',
                    boxSizing: 'border-box',
                    padding: isMobile ? '1.5rem' : '2rem',
                    borderRadius: isMobile ? '14px' : '16px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    minHeight: isMobile ? '450px' : '500px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    backgroundColor: '#fff',
                    transition: 'all 300ms ease-in-out',
                    cursor: 'pointer'
                  }}
                  onClick={() => router.push('/anliegen-pruefen/bussgeld')}
                >
                  {/* Bildpfad für aktuelle Karte bestimmen */}
                  {(() => {
                    const feature = features[currentSlide];
                    const imageBase = '/assets/images/';
                    let imagePath = '';
                    
                    // Spezifische Bilder für jede Karte
                    if (feature.id === 1 || /Geschwindigkeit/i.test(feature.title)) imagePath = `${imageBase}Bußgeld.webp`;
                    else if (/Rotlicht/i.test(feature.title)) imagePath = `${imageBase}Bußgeldbescheid-Bild.png`;
                    else if (/Abstand/i.test(feature.title)) imagePath = `${imageBase}Bussgeld1.jpg`;
                    else if (/Handy|Handyverstoß/i.test(feature.title)) imagePath = `${imageBase}Digitale Prozesse.png`;
                    else if (/Unfall|Verkehrsunfall/i.test(feature.title)) imagePath = `${imageBase}Verkehrsunfall.png`;
                    else if (/Alkohol|Drogen/i.test(feature.title)) imagePath = `${imageBase}Benefit2.jpg`;
                    else imagePath = `${imageBase}Benefit1.jpg`;
                    
                    return (
                      <>
                        <div className="feature__card-image" style={{ 
                          marginBottom: '1.5rem', 
                          borderRadius: '12px', 
                          overflow: 'hidden',
                          width: '100%',
                          maxWidth: '280px',
                          height: '160px',
                          margin: '0 auto 1.5rem auto'
                        }}>
                          <Image 
                            src={imagePath} 
                            alt={feature.title} 
                            width={280} 
                            height={160} 
                            className="feature__card-img"
                            sizes="(max-width: 768px) 100vw, 280px"
                            style={{ 
                              width: '100%', 
                              height: '100%', 
                              objectFit: 'cover',
                              display: 'block' 
                            }}
                          />
                        </div>
                        <div className="feature__card-icon" style={{ marginBottom: '1rem', color: '#A3E635' }}>
                          {feature.icon}
                        </div>
                        <h3 style={{ 
                          fontSize: isMobile ? '1.3rem' : '1.5rem', 
                          marginBottom: '1rem', 
                          color: '#1B3A4B', 
                          fontWeight: 600 
                        }}>
                          {feature.title}
                        </h3>
                        <p style={{ 
                          fontSize: isMobile ? '0.95rem' : '1rem', 
                          lineHeight: '1.6', 
                          color: '#4A5568', 
                          marginBottom: '1rem' 
                        }}>
                          {feature.description}
                        </p>
                        <div className="feature__card-arrow" style={{ color: '#A3E635' }}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </>
                    );
                  })()}
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
                {features.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setCurrentSlide(i);
                      setIsPaused(true);
                      setTimeout(() => setIsPaused(false), 5000);
                    }}
                    aria-label={`Gehe zu Karte ${i+1}`}
                    className={`slider-indicator ${i === currentSlide ? 'slider-indicator--active' : ''}`}
                    style={{
                      width: i === currentSlide ? (isMobile ? '20px' : '24px') : (isMobile ? '6px' : '8px'),
                      height: isMobile ? '6px' : '8px',
                      borderRadius: '4px',
                      backgroundColor: i === currentSlide ? '#A3E635' : '#ccc',
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
                    key={`progress-${currentSlide}`}
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
          </div>
        </div>

        {/* large hero CTA removed per design request */}

        <section className="prozess-section">
          <div className="section-container">
            {/* heading removed as requested */}

            {/* Single tiled Card with steps (compact variant similar to ProcessSection) */}
            <motion.div className="prozess-card-wrapper" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
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
                  <button className="cta-button primary large" onClick={() => router.push('/anliegen-pruefen/bussgeld')}>
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



