'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import './ServiceSection.css';

type Service = {
  id: number;
  title: string;
  image: string;
  description: string;
  benefits: string[];
  buttonText: string;
  link: string;
};

const services: Service[] = [
  {
    id: 1,
    title: 'KFZ-Gutachten',
    image: '/assets/images/Rechtly Bild KFZ GUTACHTEN.png',
    description: 'Professionelle Begutachtung Ihres Fahrzeugs nach einem Unfall',
    benefits: ['Unabhängige Schadensermittlung', 'Detaillierte Dokumentation', 'Faire Wertermittlung', 'Schnelle Bearbeitung'],
    buttonText: 'Kostenlose Einschätzung',
    link: '/anliegen-pruefen/kfz-gutachten'
  },
  {
    id: 2,
    title: 'Bußgeldverfahren',
    image: '/assets/images/Rechtly Bild Blitzer.png',
    description: 'Kompetente Unterstützung bei Verkehrsordnungswidrigkeiten',
    benefits: ['Prüfung des Bußgeldbescheids', 'Einspruch wenn sinnvoll', 'Vertretung vor Gericht', 'Punktereduzierung möglich'],
    buttonText: 'Kostenlose Einschätzung',
    link: '/anliegen-pruefen/bussgeld'
  },
  {
    id: 3,
    title: 'Unfallabwicklung',
    image: '/assets/images/Rechtly Bild Unfall.png',
    description: 'Professionelle Betreuung nach einem Verkehrsunfall',
    benefits: ['Komplette Schadenabwicklung', 'Durchsetzung aller Ansprüche', 'Verhandlung mit Versicherungen', 'Persönliche Betreuung'],
    buttonText: 'Kostenlose Einschätzung',
    link: '/anliegen-pruefen/verkehrsunfall'
  }
];

const ServiceSection: React.FC = () => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

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

  const nextSlide = () => setCurrentSlide(prev => (prev === services.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide(prev => (prev === 0 ? services.length - 1 : prev - 1));
  const goToSlide = (index: number) => setCurrentSlide(index);

  // Auto-Rotation für den Slider
  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => nextSlide(), 5000);
      return () => clearInterval(interval);
    }
    // Leere Rückgabefunktion, wenn nicht mobil
    return () => {};
  }, [isMobile, currentSlide]);

  return (
    <section className="services">
      <div className="services__container">
        <motion.div className="services__header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2>Unsere Dienstleistungen im Überblick</h2>
          <p className="services__subtitle">Professionelle Unterstützung in allen Bereichen des Verkehrsrechts</p>
          <p className="services__intro">Bei <strong>Rechtly</strong> erhalten Sie kompetente rechtliche Unterstützung - digital, effizient und transparent.</p>
        </motion.div>

        <div className="services__grid">
          {services.map((service, index) => (
            <motion.div key={service.id} className="service-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.2 }}>
              <div className="service-card__image">
                <Image 
                  src={service.image} 
                  alt={service.title} 
                  loading="lazy" 
                  width={420} 
                  height={280} 
                  style={{ 
                    objectFit: 'contain', 
                    width: '100%', 
                    height: 'auto', 
                    maxHeight: 'none',
                    borderRadius: '12px'
                  }}
                />
              </div>
              <div className="service-card__content">
                <h3 className="service-card__title">{service.title}</h3>
                <p className="service-card__description">{service.description}</p>
                <ul className="service-card__benefits">{service.benefits.map((b, i) => <li key={i} className="service-card__benefit-item">{b}</li>)}</ul>
              </div>
              <div className="service-card__footer">
                <button className="service-card__button" onClick={() => router.push(service.link)}>{service.buttonText}</button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className={`services__carousel ${isMobile ? 'active' : ''}`}>
          <div className="services__carousel-container">
            <div className="services__carousel-controls">
              <button 
                className="services__carousel-button services__carousel-button--prev" 
                onClick={prevSlide} 
                aria-label="Vorherige Karte"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button 
                className="services__carousel-button services__carousel-button--next" 
                onClick={nextSlide} 
                aria-label="Nächste Karte"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            <div className="services__carousel-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {services.map((service, index) => (
                <div className="services__carousel-slide" key={index}>
                  <motion.div 
                    className="service-card" 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.5 }}
                  >
                    <div className="service-card__image">
                      <Image 
                        src={service.image} 
                        alt={service.title} 
                        loading="lazy" 
                        width={420} 
                        height={280}
                        sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ 
                    objectFit: 'contain', 
                    width: '90%', 
                    height: 'auto', 
                    maxHeight: '380px',
                    borderRadius: '20px'
                  }}
                      />
                    </div>
                    <div className="service-card__content">
                      <h3 className="service-card__title">{service.title}</h3>
                      <p className="service-card__description">{service.description}</p>
                      <ul className="service-card__benefits">
                        {service.benefits.map((benefit, i) => (
                          <li key={i} className="service-card__benefit-item">{benefit}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="service-card__footer">
                      <button 
                        className="service-card__button" 
                        onClick={() => router.push(service.link)}
                      >
                        {service.buttonText}
                      </button>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="services__carousel-progress">
            <div 
              className="services__carousel-progress-bar" 
              style={{ 
                width: `${(currentSlide + 1) / services.length * 100}%` 
              }}
            ></div>
          </div>
          
          <div className="services__carousel-indicators">
            {services.map((_, index) => (
              <button 
                key={index} 
                className={`services__carousel-indicator ${currentSlide === index ? 'active' : ''}`} 
                onClick={() => goToSlide(index)}
                aria-label={`Gehe zu Slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
