"use client";
import React from 'react';
import Section from '../../../../src/components/ui/Section';
import { useEffect, useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import '../bussgeld.css';
import '../../../../src/components/ui/section.css';

export default function Partner() {
  const leftRef = useRef<HTMLDivElement | null>(null);
  const visualRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.partner-features li')) as HTMLElement[];
    els.forEach((el, i) => setTimeout(() => el.classList.add('revealed'), 120 * i));
    return () => els.forEach((el) => el.classList.remove('revealed'));
  }, []);

  // Align visual exactly from first card top to last card bottom
  useLayoutEffect(() => {
    function alignVisual() {
      if (!leftRef.current || !visualRef.current) return;
      const first = leftRef.current.querySelector('.partner-features li:first-child') as HTMLElement | null;
      const last = leftRef.current.querySelector('.partner-features li:last-child') as HTMLElement | null;
      if (!first || !last) return;

      const leftRect = leftRef.current.getBoundingClientRect();
      const firstRect = first.getBoundingClientRect();
      const lastRect = last.getBoundingClientRect();

      const topOffset = Math.max(0, firstRect.top - leftRect.top);
      const height = Math.max(0, lastRect.bottom - firstRect.top);

      visualRef.current.style.marginTop = `${topOffset}px`;
      visualRef.current.style.height = `${height}px`;
    }

    alignVisual();
    window.addEventListener('resize', alignVisual);
    return () => window.removeEventListener('resize', alignVisual);
  }, []);
  return (
    <Section className="section--lg section--white">
      {/* Heading spans both columns */}
        <div className="section-heading">
        <h2 className="section-title">Mehr Fälle. Weniger Aufwand. Partner von Rechtly werden.</h2>
        <p className="section-subtitle">Profitieren Sie von unserer digitalen Plattform, die Mandanten, Anwälte und Gutachter zusammenbringt. Leiten Sie Interessenkontakte (Leads) an uns weiter – und erhalten Sie 50 € Aufwandsvergütung, wenn aus einem solchen Lead später tatsächlich ein Mandatsverhältnis zustande kommt.</p>
      </div>

      <div className="bussgeld-partner two-col mobile-force-column">
        <div className="partner-left" ref={leftRef}>

          <ul className="partner-features">
            <li><strong>Automatisierte Leadweiterleitung</strong>
              <div className="partner-feature-lead">Sie geben uns potenzielle Kundenkontakte – wir leiten sie an unser System weiter und prüfen, ob ein Mandatsinteresse besteht.</div>
            </li>
            <li><strong>Zentrale Plattform</strong>
              <div className="partner-feature-lead">Alle Kommunikation, Dokumente und Statusupdates laufen digital in einer Oberfläche.</div>
            </li>
            <li><strong>Transparenz & Kontrolle</strong>
              <div className="partner-feature-lead">Sie sehen jederzeit, welcher Lead welchen Status hat, und wie es weitergeht.</div>
            </li>
            <li><strong>Faire Konditionen</strong>
              <div className="partner-feature-lead">Die Vergütung ist an den Entstehen des Mandats gekoppelt und beträgt pauschal 50 €. Es gibt keine versteckten Kosten oder regelmäßigen Abgaben.</div>
            </li>
          </ul>

          <div className="partner-ctas">
            <Link href="/partner-gutachter" className="btn primary">
              Jetzt Partner werden
            </Link>
            <Link href="/partner-gutachter" className="btn secondary">
              Mehr erfahren
            </Link>
          </div>

          
        </div>

        <div className="partner-right">
          <div className="partner-visual" id="partnerVisual" ref={visualRef}>
            {/* Partner mockup image from public assets */}
            <Image 
              src="/assets/images/kooperation mit KFZ.png" 
              alt="Rechtly Partnerportal Mockup" 
              width={560} 
              height={360} 
              priority={true}
              loading="eager"
              style={{ 
                borderRadius: 12,
                maxWidth: '100%',
                height: 'auto',
                objectFit: 'cover'
              }} 
              sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 560px"
            />
            <div className="badge">50 € pro Fall</div>
          </div>
        </div>
      </div>
    </Section>
  );
}
