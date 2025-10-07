import React from 'react';
import '../components/faq-mobile.css';
import Section from '@/components/ui/Section';
import SmoothScroll from '@/components/ui/SmoothScroll';
import FAQSearch from './FAQSearch';
import { categories } from '../data';

export default function FAQHero() {
  return (
    <Section className="faq-hero">
      <div className="faq-hero-content">
        <h1 className="faq-hero-title">Häufige Fragen – alles, was du über Rechtly wissen musst</h1>
        <p className="faq-hero-subtitle">Hier findest du Antworten rund um Punktestand, Bußgeld, Unfälle, Gutachten & unsere Leistungen.</p>

        <div className="faq-search-container">
          <FAQSearch categories={categories} />

          <div className="faq-categories">
            {categories.map((c) => (
              <a 
                key={c.id} 
                href={`#${c.id}`} 
                data-target={c.id} 
                className="faq-category touch-target"
              >
                <div className="faq-category-icon">{c.icon}</div>
                <div className="faq-category-title">{c.title}</div>
              </a>
            ))}
          </div>
        </div>
      </div>
      <SmoothScroll />
    </Section>
  );
}
