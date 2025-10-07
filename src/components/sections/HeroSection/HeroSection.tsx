'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import './HeroSection.css';

interface BenefitItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function IconScale() {
  return (
    <svg className="hero__benefit-svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M12 2a1 1 0 0 0-1 1v1.07A6 6 0 0 0 6 10.9V12a6 6 0 1 0 12 0v-1.1a6 6 0 0 0-5-6.83V3a1 1 0 0 0-1-1zm3.5 12H8.5l-1 6h9l-1-6z" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg className="hero__benefit-svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M12 1a11 11 0 1 0 11 11A11.012 11.012 0 0 0 12 1zm1 12.59L8.7 9.29a1 1 0 0 1 1.42-1.42L13 11.17V5a1 1 0 0 1 2 0z" />
    </svg>
  );
}

function IconTrophy() {
  return (
    <svg className="hero__benefit-svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M17 3h-2V2a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v1H7a2 2 0 0 0-2 2v2a5 5 0 0 0 4 4.9V15a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3v-1.1A5 5 0 0 0 19 7V5a2 2 0 0 0-2-2z" />
    </svg>
  );
}

const HeroSection: React.FC = () => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const [isHeroVisible, setIsHeroVisible] = useState(false);

  const benefitItems: BenefitItem[] = [
    { 
      icon: <IconScale />, 
      title: 'Sofortige Ersteinschätzung', 
      description: 'In wenigen Sekunden wissen Sie, ob Sie Anspruch haben.' 
    },
    { 
      icon: <IconClock />, 
      title: 'Rund um die Uhr erreichbar', 
      description: 'Unsere smarte Assistentin begleitet Sie 24/7.' 
    },
    { 
      icon: <IconTrophy />, 
      title: 'Hohe Erfolgsquote', 
      description: 'Über 90% erfolgreiche Fälle.' 
    },
  ];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === benefitItems.length - 1 ? 0 : prev + 1));
  }, [benefitItems.length]);

  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? benefitItems.length - 1 : prev - 1));
  const goToSlide = (index: number) => setCurrentSlide(index);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  useEffect(() => {
    const obsTarget = titleRef.current || subtitleRef.current;
    if (!obsTarget || typeof IntersectionObserver === 'undefined') {
      setIsHeroVisible(true);
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsHeroVisible(true);
          io.disconnect();
        }
      });
    }, { threshold: 0.2 });

    if (titleRef.current) io.observe(titleRef.current);
    else if (subtitleRef.current) io.observe(subtitleRef.current);

    return () => io.disconnect();
  }, []);

  return (
    <div className="hero-wrapper">
      <section className="hero">
        <div className="hero__container">
          <div className="hero__content">
            <div className="hero__text mobile-text-center">
              <h1 ref={titleRef} className={`hero__title-animate ${isHeroVisible ? 'is-visible' : ''}`}>
                <span className="hero__title-line">
                  Ihr Experte für <span className="hero__highlight-animated">Verkehrsrecht</span>
                </span>
              </h1>
              <p ref={subtitleRef} className={`hero__subtitle hero__subtitle-animate ${isHeroVisible ? 'is-visible' : ''}`}>Einfach. Digital. Recht bekommen.</p>

              {!isMobile && (
                <div className="hero__feature-cards mobile-force-column">
                  {benefitItems.map((item, index) => (
                    <div className="feature-card" key={index}>
                      <div className="feature-card__icon">{item.icon}</div>
                      <div className="feature-card__content">
                        <h3 className="feature-card__title">{item.title}</h3>
                        <p className="feature-card__text">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {isMobile && (
                <div className="hero__carousel">
                  <div className="hero__carousel-container">
                    <div className="hero__carousel-controls">
                      <button className="hero__carousel-button" onClick={prevSlide} aria-label="Vorherige Slide">&#10094;</button>
                      <button className="hero__carousel-button" onClick={nextSlide} aria-label="Nächste Slide">&#10095;</button>
                    </div>
                    <div className="hero__carousel-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                      {benefitItems.map((item, index) => (
                        <div className="hero__carousel-slide" key={index}>
                          <div className="feature-card">
                            <div className="feature-card__icon">{item.icon}</div>
                            <div className="feature-card__content">
                              <h3 className="feature-card__title">{item.title}</h3>
                              <p className="feature-card__text">{item.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="hero__carousel-indicators">
                    {benefitItems.map((_, index) => (
                      <div key={index} className={`hero__carousel-indicator ${currentSlide === index ? 'active' : ''}`} onClick={() => goToSlide(index)} />
                    ))}
                  </div>
                </div>
              )}

              <button className="hero__cta-button" onClick={() => router.push('/anliegen-pruefen')}>Jetzt kostenlos prüfen</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;