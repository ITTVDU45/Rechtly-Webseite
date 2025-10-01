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
    image: '/assets/images/KFZ GUTACHTER.png',
    description: 'Professionelle Begutachtung Ihres Fahrzeugs nach einem Unfall',
    benefits: ['Unabhängige Schadensermittlung', 'Detaillierte Dokumentation', 'Faire Wertermittlung', 'Schnelle Bearbeitung'],
    buttonText: 'Kostenlose Einschätzung',
    link: '/anliegen-pruefen/kfz-gutachten'
  },
  {
    id: 2,
    title: 'Bußgeldverfahren',
    image: '/assets/images/Bußgeldbescheid-Bild.png',
    description: 'Kompetente Unterstützung bei Verkehrsordnungswidrigkeiten',
    benefits: ['Prüfung des Bußgeldbescheids', 'Einspruch wenn sinnvoll', 'Vertretung vor Gericht', 'Punktereduzierung möglich'],
    buttonText: 'Kostenlose Einschätzung',
    link: '/anliegen-pruefen/bussgeld'
  },
  {
    id: 3,
    title: 'Unfallabwicklung',
    image: '/assets/images/Unfallabwicklung-Bild.png',
    description: 'Professionelle Betreuung nach einem Verkehrsunfall',
    benefits: ['Komplette Schadenabwicklung', 'Durchsetzung aller Ansprüche', 'Verhandlung mit Versicherungen', 'Persönliche Betreuung'],
    buttonText: 'Kostenlose Einschätzung',
    link: '/anliegen-pruefen/verkehrsunfall'
  }
];

const ServiceSection: React.FC = () => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(typeof window !== 'undefined' ? window.innerWidth <= 768 : false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => setCurrentSlide(prev => (prev === services.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide(prev => (prev === 0 ? services.length - 1 : prev - 1));
  const goToSlide = (index: number) => setCurrentSlide(index);

  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => nextSlide(), 5000);
      return () => clearInterval(interval);
    }
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
              <div className="service-card__image"><Image src={service.image} alt={service.title} loading="lazy" width={420} height={280} /></div>
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

        <div className="services__carousel">
          <div className="services__carousel-container">
            <div className="services__carousel-controls">
              <button className="services__carousel-button" onClick={prevSlide} aria-label="Vorherige Karte">&#10094;</button>
              <button className="services__carousel-button" onClick={nextSlide} aria-label="Nächste Karte">&#10095;</button>
            </div>
            <div className="services__carousel-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {services.map((service, index) => (
                <div className="services__carousel-slide" key={index}>
                  <motion.div className="service-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                    <div className="service-card__image"><Image src={service.image} alt={service.title} loading="lazy" width={420} height={280} /></div>
                    <div className="service-card__content"><h3 className="service-card__title">{service.title}</h3><p className="service-card__description">{service.description}</p><ul className="service-card__benefits">{service.benefits.map((b, i) => <li key={i} className="service-card__benefit-item">{b}</li>)}</ul></div>
                    <div className="service-card__footer"><button className="service-card__button" onClick={() => router.push(service.link)}>{service.buttonText}</button></div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
          <div className="services__carousel-indicators">{services.map((_, index) => (<div key={index} className={`services__carousel-indicator ${currentSlide === index ? 'active' : ''}`} onClick={() => goToSlide(index)} />))}</div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
