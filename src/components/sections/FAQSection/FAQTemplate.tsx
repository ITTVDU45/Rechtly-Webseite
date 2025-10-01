'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './FAQSection.css';
import Section from '../../../components/ui/Section';
import { useRouter } from 'next/navigation';

export type FAQItem = { id: number; question: string; answer: string };

type Props = {
  items: FAQItem[];
  title?: string;
  subtitle?: string;
};

const FAQTemplate: React.FC<Props> = ({ items, title = 'Häufig gestellte Fragen', subtitle = 'Finden Sie schnell Antworten auf Ihre Fragen' }) => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const router = useRouter();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map((it) => ({
      "@type": "Question",
      "name": it.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": it.answer
      }
    }))
  };

  return (
    <Section className="section--lg section--white">
      <section className="faq">
        {/* JSON-LD für SEO */}
        {/* JSON-LD (static to avoid server/client hydration mismatch) */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <div className="faq__container section__container">
          <div className="faq__header">
            <h2 className="section-title">{title}</h2>
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
          </div>

          <div className="faq__list">
            {items.map((faq) => (
              <motion.div 
                key={faq.id} 
                className={`faq__item ${activeId === faq.id ? 'active' : ''}`} 
                initial={false}
              >
                <motion.button 
                  className="faq__question" 
                  onClick={() => setActiveId(activeId === faq.id ? null : faq.id)}
                  aria-expanded={activeId === faq.id}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  {faq.question}
                  <span className="faq__icon">{activeId === faq.id ? '−' : '+'}</span>
                </motion.button>

                <AnimatePresence initial={false}>
                  {activeId === faq.id && (
                    <motion.div 
                      id={`faq-answer-${faq.id}`}
                      className="faq__answer" 
                      initial={{ height: 0, opacity: 0 }} 
                      animate={{ height: 'auto', opacity: 1 }} 
                      exit={{ height: 0, opacity: 0 }} 
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <p>{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <div className="faq__cta">
            <p>Noch Fragen? Wir sind für Sie da!</p>
            <button 
              className="faq__button" 
              onClick={() => router.push('/faq')}
            >
              Weitere Fragen und Kundensupport
            </button>
          </div>
        </div>
      </section>
    </Section>
  );
};

export default FAQTemplate;


