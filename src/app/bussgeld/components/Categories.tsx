"use client";
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Section from '@/components/ui/Section';
import { Zap, Clock, Ruler, Smartphone, MapPin, Coffee, ZapOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import '../bussgeld.css';

type Category = {
  id: number;
  title: string;
  lead: string;
  href: string;
  icon: React.ReactNode;
};

const categories: Category[] = [
  { id: 1, title: 'Geschwindigkeit', lead: 'Viele Bußgeldbescheide entstehen durch einfache Tempolimits. Ob 21 km/h zu viel oder über 70 km/h – bei Fahrverbot und Punkten helfen wir sofort weiter.', href: '/bussgeld/geschwindigkeit', icon: <Zap size={24} /> },
  { id: 2, title: 'Rotlichtverstoß', lead: 'Ein Rotlichtverstoß kann teuer werden – vor allem bei qualifizierten Verstößen. Wir prüfen Messung und Beweislage.', href: '/bussgeld/rotlicht', icon: <Clock size={24} /> },
  { id: 3, title: 'Abstand', lead: 'Moderne Messsysteme werten Fahrverhalten sekundengenau aus. Nicht immer korrekt. Wir helfen bei Bußgeld, Punkten oder Fahrverbot.', href: '/bussgeld/abstand', icon: <Ruler size={24} /> },
  { id: 4, title: 'Handy am Steuer', lead: 'Schon der kurze Blick aufs Display kann teuer werden. Wir prüfen, ob die Kontrolle rechtlich einwandfrei war.', href: '/bussgeld/handy', icon: <Smartphone size={24} /> },
  { id: 5, title: 'Parken & Halten', lead: 'Egal ob Halteverbot oder Feuerwehrzufahrt – Bußgelder sind schnell verteilt. Wir sagen, ob Einspruch lohnt.', href: '/bussgeld/park', icon: <MapPin size={24} /> },
  { id: 6, title: 'Alkohol / Drogen', lead: 'Verfahren mit Alkohol oder Drogen führen oft zu Fahrverbot und MPU. Wir prüfen Ihre Rechte und zeigen Auswege.', href: '/bussgeld/alkohol', icon: <Coffee size={24} /> },
  { id: 7, title: 'Verkehrsunfall', lead: 'Auch bei Unfällen können Bußgelder drohen – etwa wegen Fahrlässigkeit oder fehlender Abstand. Wir helfen bei der Einschätzung.', href: '/bussgeld/unfall', icon: <ZapOff size={24} /> }
];

export default function Categories() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [slideWidth, setSlideWidth] = useState(520); // px, fallback
  const trackRef = useRef<HTMLDivElement | null>(null);
  const GAP_PX = 32;

  useEffect(() => {
    const measure = () => {
      const first = trackRef.current?.querySelector('.feature__carousel-slide') as HTMLElement | null;
      if (first) {
        setSlideWidth(first.offsetWidth);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => setCurrentSlide(s => (s === categories.length - 1 ? 0 : s + 1)), 4500);
    return () => clearInterval(id);
  }, [isPaused]);

  const nextSlide = () => setCurrentSlide(s => (s === categories.length - 1 ? 0 : s + 1));
  const prevSlide = () => setCurrentSlide(s => (s === 0 ? categories.length - 1 : s - 1));
  const goToSlide = (i: number) => setCurrentSlide(i);

  const handleTouchStart = (e: React.TouchEvent) => {
    (e.target as HTMLElement).closest && setIsPaused(true);
    (e.target as HTMLElement) && (e as any).touches;
    (e as any).detail;
    (e as any);
    (e as any);
    (e as any);
    (e as any);
    (e as any);
    (e as any);
    setTouchStartLocal(e.touches ? e.touches[0].clientX : 0);
  };

  // lightweight local touch handling without storing in state repeatedly
  const touchRef = useRef({ start: 0, end: 0 });
  const setTouchStartLocal = (v: number) => { touchRef.current.start = v; };
  const setTouchEndLocal = (v: number) => { touchRef.current.end = v; };

  const handleTouchMove = (e: React.TouchEvent) => setTouchEndLocal(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    setIsPaused(false);
    const { start, end } = touchRef.current;
    if (start - end > 50) nextSlide();
    if (start - end < -50) prevSlide();
  };

  // compute transform based on measured slideWidth + gap
  const transformX = currentSlide * (slideWidth + GAP_PX);

  return (
    <Section className="section--white bussgeld-categories py-16 my-8">
      <div className="section__container">
        <div className="text-center mb-8">
          <h2 className="section-title">Typische Bußgeldfälle</h2>
          <p className="section-subtitle">Schnelle Einschätzung: Wähle das Thema, das zu deinem Anliegen passt.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="feature__carousel">
              <div className="feature__carousel-container relative" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
                <div className="feature__carousel-controls">
                  <button className="feature__carousel-button left" onClick={(e) => { e.stopPropagation(); prevSlide(); }} aria-label="Vorherige Karte">‹</button>
                  <button className="feature__carousel-button right" onClick={(e) => { e.stopPropagation(); nextSlide(); }} aria-label="Nächste Karte">›</button>
                </div>

                <div
                  className="feature__carousel-track"
                  ref={trackRef}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  style={{ transform: `translateX(-${transformX}px)`, transition: 'transform 0.45s cubic-bezier(.2,.9,.2,1)' }}
                >
                  {categories.map((c, index) => {
                    const isEven = index % 2 === 0;
                    return (
                      <div className="feature__carousel-slide" key={c.id} style={{ flex: '0 0 auto', width: `${slideWidth}px` }}>
                        <article className={`feature__card ${isEven ? 'card--green' : 'card--blue'}`} onClick={() => router.push(c.href)}>
                          <div className="feature__card-top">
                            <div className="feature__card-icon">{c.icon}</div>
                            <h3 className="feature__card-title">{c.title}</h3>
                          </div>
                          <p className="feature__card-lead">{c.lead}</p>
                          <div className="mt-4">
                            <span className="feature__cta">Jetzt prüfen lassen →</span>
                          </div>
                        </article>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="feature__carousel-indicators mt-4 flex gap-2 justify-center">
                {categories.map((_, index) => (
                  <button key={index} aria-label={`Gehe zu Karte ${index + 1}`} className={`feature__carousel-indicator ${currentSlide === index ? 'active' : ''}`} onClick={() => goToSlide(index)} />
                ))}
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-center">
            <div className="w-full max-w-md rounded-3xl overflow-hidden">
              <Image src="/assets/images/Was ist Rechtly.png" alt="Typische Bußgeldfälle" width={640} height={480} className="object-cover" />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}


