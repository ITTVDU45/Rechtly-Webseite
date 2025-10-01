import React from 'react';
import Section from '@/components/ui/Section';
import FAQAccordion from './FAQAccordion';
import { faqItems } from '../data';

type Props = { id: string; title: string; items?: { q: string; a: string }[] };

export default function FAQBlock({ id, title, items }: Props) {
  const list = items ?? faqItems[id] ?? [];
  return (
    <Section className="py-8" id={id}>
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="section-title">{title}</h2>
        <div className="mt-6 space-y-3">
          {list.map((it, i) => (
            <FAQAccordion key={i} id={`${id}-q-${i}`} question={it.q} answer={it.a} />
          ))}
        </div>
      </div>
    </Section>
  );
}
