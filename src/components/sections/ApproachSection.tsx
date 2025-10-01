'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Zap, 
  Cpu, 
  User, 
  Folder, 
  MessageSquare, 
  Users 
} from 'lucide-react';
import ScrollAnimation from '@/components/common/ScrollAnimation';
import '@styles/ApproachSection.css';

const values = [
  {
    id: 1,
    title: 'Zukunftsweisende Legal-Tech-Plattform',
    description: 'Mit modernster Technologie und automatisierten Workflows digitalisieren wir den gesamten Rechtsprozess – schnell, effizient und fehlerfrei.',
    icon: <Zap size={32} />
  },
  {
    id: 2,
    title: 'Automatisierte Überprüfung',
    description: 'Unsere KI analysiert Ihren Fall in Sekunden und gibt Ihnen eine erste Einschätzung – sofort und kostenlos.',
    icon: <Cpu size={32} />
  },
  {
    id: 3,
    title: 'KI-Mitarbeiter begleiten Sie',
    description: 'Lehnen Sie sich zurück! Unsere KI-gestützten Assistenten übernehmen die Abwicklung, damit Sie sich um nichts kümmern müssen.',
    icon: <User size={32} />
  },
  {
    id: 4,
    title: 'Ihr persönliches Mandantenportal',
    description: 'Alle Dokumente, Nachrichten und Statusupdates an einem Ort – jederzeit abrufbar und transparent.',
    icon: <Folder size={32} />
  },
  {
    id: 5,
    title: '24/7 KI-gestützter Chat',
    description: 'Unsere smarte KI-Assistentin steht Ihnen rund um die Uhr zur Seite – für schnelle Antworten und sofortige Unterstützung.',
    icon: <MessageSquare size={32} />
  },
  {
    id: 6,
    title: 'Direkte Verbindung zu Anwälten & Gutachtern',
    description: 'Kein Warten, keine Umwege – kommunizieren Sie direkt mit unseren Verkehrsrechtsexperten und Kfz-Gutachtern über unsere Plattform.',
    icon: <Users size={32} />
  }
];

const ApproachSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev === values.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? values.length - 1 : prev - 1));
  const goToSlide = (index: number) => setCurrentSlide(index);

  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => nextSlide(), 5000);
      return () => clearInterval(interval);
    }
  }, [isMobile, currentSlide]);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <ScrollAnimation>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              Wir machen Recht digital & unkompliziert
            </motion.h2>
          </ScrollAnimation>

          <ScrollAnimation delay={100}>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-2xl md:text-3xl text-blue-600 mb-8"
            >
              Moderne Rechtsberatung auf Augenhöhe.
            </motion.h3>
          </ScrollAnimation>

          <ScrollAnimation delay={200}>
            <motion.div
              className="max-w-4xl mx-auto text-lg text-gray-600 leading-relaxed space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p>
                Bei uns stehen automatisierte Prozesse, digitale Workflows und innovative Technologien im Mittelpunkt –
                damit Ihr Fall schnell, effizient und fehlerfrei bearbeitet wird. Mit Rechtly erleben Sie eine völlig
                neue Art der Rechtsberatung: unkompliziert, verständlich und jederzeit zugänglich.
              </p>
              <p>
                Unsere KI-gestützten Assistenten begleiten Sie durch den gesamten Prozess, während Sie sich entspannt
                zurücklehnen. Alle Dokumente, Nachrichten und Statusupdates finden Sie in Ihrem persönlichen
                Mandantenportal – jederzeit abrufbar und transparent.
              </p>
              <p>
                Keine langen Wartezeiten, keine Behördengänge – bei uns geht alles digital und mit nur wenigen Klicks! 🚀
              </p>
            </motion.div>
          </ScrollAnimation>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <ScrollAnimation key={value.id} delay={index * 100}>
                <motion.div
                  className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-blue-600 mb-4">{value.icon}</div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">{value.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                </motion.div>
              </ScrollAnimation>
            ))}
          </div>

          <div className="md:hidden">
            <div className="relative">
              <div className="flex justify-between absolute top-1/2 transform -translate-y-1/2 w-full z-10">
                <button
                  className="bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
                  onClick={prevSlide}
                  aria-label="Vorherige Karte"
                >
                  &#10094;
                </button>
                <button
                  className="bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
                  onClick={nextSlide}
                  aria-label="Nächste Karte"
                >
                  &#10095;
                </button>
              </div>
              <div className="overflow-hidden">
                <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                  {values.map((value, index) => (
                    <div key={index} className="w-full flex-shrink-0 px-4">
                      <motion.div
                        className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="text-blue-600 mb-4">{value.icon}</div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">{value.title}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center mt-6 space-x-2">
                {values.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors ${currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'}`}
                    onClick={() => goToSlide(index)}
                    aria-label={`Gehe zu Karte ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <ScrollAnimation>
            <motion.div className="text-center" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-3xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Unsere Mission</h3>
                <p className="text-gray-600 mb-6">Recht für alle zugänglich machen – digital, verständlich und effizient.</p>
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-green-500 rounded-full mx-auto flex items-center justify-center">
                  <span className="text-white text-3xl">🚀</span>
                </div>
              </div>
            </motion.div>
          </ScrollAnimation>
        </div>

        <ScrollAnimation>
          <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ delay: 0.3 }}>
            <Link href="/ueber-uns" className="inline-block bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg">Mehr über uns</Link>
          </motion.div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default ApproachSection;
