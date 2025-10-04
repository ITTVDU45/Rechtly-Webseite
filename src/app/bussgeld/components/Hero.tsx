"use client";
import React from 'react';
import '../bussgeld.css';

export default function Hero() {
  return (
    <section className="bussgeld-hero">
      <div className="container">
        <h1>Bußgeldbescheid erhalten? Wir prüfen kostenlos & digital.</h1>
        <p className="sub">In 3 Minuten hochladen – Einschätzung vom Anwalt, Status live verfolgen, alles in einer Plattform.</p>
        <div className="cta-row">
          <button className="btn primary" onClick={() => window.location.href = '/anliegen-pruefen'}>Bußgeld jetzt kostenlos prüfen</button>
          <button className="btn secondary" onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}>So funktioniert's</button>
        </div>


        
      </div>
    </section>
  );
}


