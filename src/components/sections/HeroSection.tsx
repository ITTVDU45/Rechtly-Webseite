"use client";
import './HeroSection/HeroSection.css';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface BenefitItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function IconScale() {
  return (
    <svg className="hero__benefit-svg" viewBox="0 0 24 24" width="48" height="48" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M12 2a1 1 0 0 0-1 1v1.07A6 6 0 0 0 6 10.9V12a6 6 0 1 0 12 0v-1.1a6 6 0 0 0-5-6.83V3a1 1 0 0 0-1-1zm3.5 12H8.5l-1 6h9l-1-6z" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg className="hero__benefit-svg" viewBox="0 0 24 24" width="48" height="48" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M12 1a11 11 0 1 0 11 11A11.012 11.012 0 0 0 12 1zm1 12.59L8.7 9.29a1 1 0 0 1 1.42-1.42L13 11.17V5a1 1 0 0 1 2 0z" />
    </svg>
  );
}

function IconTrophy() {
  return (
    <svg className="hero__benefit-svg" viewBox="0 0 24 24" width="48" height="48" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M17 3h-2V2a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v1H7a2 2 0 0 0-2 2v2a5 5 0 0 0 4 4.9V15a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3v-1.1A5 5 0 0 0 19 7V5a2 2 0 0 0-2-2z" />
    </svg>
  );
}

const HeroSection: React.FC = () => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  // Benefit-Items Daten
  const benefitItems: BenefitItem[] = [
    { icon: <IconScale />, title: 'Sofortige Ersteinschätzung', description: 'In wenigen Sekunden wissen Sie, ob Sie Anspruch haben.' },
    { icon: <IconClock />, title: 'Rund um die Uhr erreichbar', description: 'Unsere smarte Assistentin begleitet Sie 24/7.' },
    { icon: <IconTrophy />, title: 'Hohe Erfolgsquote', description: 'Über 90% erfolgreiche Fälle.' },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Set initial value
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Karussell-Funktionen
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === benefitItems.length - 1 ? 0 : prev + 1));
  }, [benefitItems.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? benefitItems.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Automatischer Wechsel der Slides alle 5 Sekunden
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="hero-wrapper">
      <section className="hero-with-bg" style={{ 
          position: 'relative',
          width: '100%',
          minHeight: '70vh',
          overflow: 'hidden',
          maxHeight: '80vh'
        }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          overflow: 'hidden'
        }}>
          <Image 
            src="/assets/images/Bannerbildneu.png"
            alt="Rechtly Hero Background"
            fill
            sizes="100vw"
            style={{ 
              // show the whole image on all viewport aspect ratios
              objectFit: 'contain', 
              objectPosition: '50% 50%'
            }}
            priority
            className="hero-background-image"
          />
        </div>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(27,58,75,0.85) 0%, rgba(44,83,100,0.65) 100%)',
          zIndex: 1
        }}></div>
        <div className="hero__container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero__content">
            <div className="hero__text">
              <h1>
                <span className="hero__title-line">
                  Ihr Experte für <span className="hero__highlight-animated">Verkehrsrecht</span>
                </span>
              </h1>
              <p className="hero__subtitle">Einfach. Digital. Recht bekommen.</p>
              
              {/* Normale Benefit-Items für Desktop/Tablet */}
              {!isMobile && (
                <div className="hero__benefits">
                  {benefitItems.map((item, index) => (
                    <div className="hero__benefit-item" key={index}>
                      <div className="hero__benefit-icon">
                        {item.icon}
                      </div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Karussell nur für mobile Geräte */}
              {isMobile && (
                <div className="hero__carousel">
                  <div 
                    className="hero__carousel-container swipeable" 
                    ref={carouselRef}
                    onTouchStart={(e) => setTouchStart(e.targetTouches[0].clientX)}
                    onTouchMove={(e) => setTouchEnd(e.targetTouches[0].clientX)}
                    onTouchEnd={() => {
                      if (touchStart && touchEnd) {
                        const distance = touchStart - touchEnd;
                        const isLeftSwipe = distance > 50;
                        const isRightSwipe = distance < -50;
                        
                        if (isLeftSwipe) {
                          nextSlide();
                        } else if (isRightSwipe) {
                          prevSlide();
                        }
                      }
                      setTouchStart(null);
                      setTouchEnd(null);
                    }}
                  >
                    <div className="hero__carousel-controls">
                      <button className="hero__carousel-button touch-target touch-feedback" onClick={prevSlide}>
                        &#10094;
                      </button>
                      <button className="hero__carousel-button touch-target touch-feedback" onClick={nextSlide}>
                        &#10095;
                      </button>
                    </div>
                    <div 
                      className="hero__carousel-track"
                      style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                      {benefitItems.map((item, index) => (
                        <div className="hero__carousel-slide" key={index}>
                          <div className="hero__benefit-item">
                            <div className="hero__benefit-icon">
                              {item.icon}
                            </div>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="hero__carousel-indicators">
                    {benefitItems.map((_, index) => (
                      <div 
                        key={index} 
                        className={`hero__carousel-indicator ${currentSlide === index ? 'active' : ''} touch-target`}
                        onClick={() => goToSlide(index)}
                      />
                    ))}
                  </div>
                </div>
              )}
              
              <button 
                className="hero__cta-button touch-target touch-feedback" 
                onClick={() => router.push('/anliegen-pruefen')}
              >
                Jetzt kostenlos prüfen
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
