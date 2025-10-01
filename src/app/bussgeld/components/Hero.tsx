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
          <button className="btn primary" onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}>Bußgeld jetzt kostenlos prüfen</button>
          <a href="#prozess" className="btn secondary">So funktioniert’s</a>
        </div>

        <div className="trust-row">
          <div className="trust-item">⭐ 4.8 (Google)</div>
          <div className="trust-item">DSGVO‑konform</div>
          <div className="trust-item">Keine Kostenrisiken bei RSV</div>
        </div>

        <p className="micro">Kostenlose Ersteinschätzung. 50 € Vermittlungsbonus für Partner.</p>
      </div>
    </section>
  );
}


