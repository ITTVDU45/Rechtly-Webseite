import React from 'react';
import Section from '@/components/ui/Section';
import FAQAccordion from './FAQAccordion';
import { faqItems } from '../data';
import './faq-mobile.css';

type Props = { id: string; title: string; items?: { q: string; a: string }[] };

export default function FAQBlock({ id, title, items }: Props) {
  const list = items ?? faqItems[id] ?? [];
  return (
    <Section className="faq-block" id={id}>
      <div className="faq-block-content">
        <h2 className="faq-block-title">{title}</h2>
        <div className="faq-accordion-container">
          {list.map((it, i) => (
            <FAQAccordion key={i} id={`${id}-q-${i}`} question={it.q} answer={it.a} />
          ))}
        </div>
      </div>
    </Section>
  );
}
