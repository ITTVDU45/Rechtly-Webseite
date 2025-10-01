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
              <div className="feature__carousel-controls">
                <button 
                  className="feature__carousel-button feature__carousel-button--prev" 
                  onClick={prevSlide} 
                  aria-label="Vorherige Karte"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button 
                  className="feature__carousel-button feature__carousel-button--next" 
                  onClick={nextSlide} 
                  aria-label="Nächste Karte"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              <div 
                className="feature__carousel-track" 
                style={{ 
                  transform: `translateX(-${currentSlide * 100}%)`,
                  width: '100%',
                  maxWidth: '100%',
                  boxSizing: 'border-box'
                }} 
                onTouchStart={handleTouchStart} 
                onTouchMove={handleTouchMove} 
                onTouchEnd={handleTouchEnd}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                {features.map((feature, index) => {
                  // Bildpfad für jede Karte bestimmen
                  let imagePath = '';
                  const imageBase = '/assets/images/';
                  
                  // Spezifische Bilder für jede Karte
                  if (feature.id === 1 || /Geschwindigkeit/i.test(feature.title)) imagePath = `${imageBase}Geschwindigkeitsverstoß.jpg`;
                  else if (/Rotlicht/i.test(feature.title)) imagePath = `${imageBase}Rotlichtverstoß.jpg`;
                  else if (/Abstand/i.test(feature.title)) imagePath = `${imageBase}Abstandsverstoß.jpg`;
                  else if (/Handy|Handyverstoß/i.test(feature.title)) imagePath = `${imageBase}Digitale Prozesse.png`;
                  else if (/Unfall|Verkehrsunfall/i.test(feature.title)) imagePath = `${imageBase}Verkehrsunfall.png`;
                  else if (/Alkohol|Drogen/i.test(feature.title)) imagePath = `${imageBase}Benefit2.jpg`;
                  else imagePath = `${imageBase}Benefit1.jpg`;
                  
                  return (
                    <div className="feature__carousel-slide" key={index}>
                      <motion.div 
                        className="feature__card" 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ duration: 0.5 }} 
                        onClick={() => router.push('/anliegen-pruefen/bussgeld')}
                      >
                        <div className="feature__card-image">
                          <Image 
                            src={imagePath} 
                            alt={feature.title} 
                            width={420} 
                            height={240} 
                            className="feature__card-img"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                          <div className="feature__card-overlay"></div>
                        </div>
                        <div className="feature__card-content">
                          <div className="feature__card-icon">{feature.icon}</div>
                          <h3>{feature.title}</h3>
                          <p>{feature.description}</p>
                          <div className="feature__card-arrow">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="feature__carousel-progress">
              <div 
                className="feature__carousel-progress-bar" 
                style={{ 
                  width: `${(currentSlide + 1) / features.length * 100}%` 
                }}
              ></div>
            </div>
            
            <div className="feature__carousel-indicators">
              {features.map((_, index) => (
                <button 
                  key={index} 
                  className={`feature__carousel-indicator ${currentSlide === index ? 'active' : ''}`} 
                  onClick={() => goToSlide(index)}
                  aria-label={`Gehe zu Karte ${index + 1}`}
                />
              ))}
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



