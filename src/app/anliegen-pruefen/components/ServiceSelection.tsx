"use client";
import React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import '../../partner/partner.css';
import './service-selection.css';

export default function ServiceSelection() {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const services = [
    { id: 1, title: 'KFZ-Gutachten', href: '/anliegen-pruefen/kfz-gutachten', icon: '🔍', description: 'Professionelle Begutachtung und Wertermittlung Ihres Fahrzeugs' },
    { id: 3, title: 'Bußgeld', href: '/anliegen-pruefen/bussgeld', icon: '📋', description: 'Rechtliche Unterstützung bei Bußgeldbescheiden' },
    { id: 2, title: 'Verkehrsunfall', href: '/anliegen-pruefen/verkehrsunfall', icon: '🚦', description: 'Kompetente Beratung und Vertretung nach einem Verkehrsunfall' }
  ];

  return (
    <div className="service-container">
      

      <div className="service-hero">
        <div className="hero-content">
          <h1>
            HERZLICH WILLKOMMEN BEI RECHTLY
            <span className="highlight">Womit können wir Ihnen behilflich sein?</span>
          </h1>
        </div>
      </div>

      <div className="service-options">
        <div className="options-grid">
          <div className="service-cards">
            {services.map(s => (
              <Link 
                key={s.id} 
                href={s.href} 
                className={`service-card touch-target ${isMounted ? 'animate-fadeIn' : ''}`}
                style={{ animationDelay: `${s.id * 150}ms` }}
              >
                <div className="service-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


