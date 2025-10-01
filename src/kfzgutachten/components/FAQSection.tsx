import React from 'react';
import FAQTemplate from '@/components/sections/FAQSection/FAQTemplate';
import { faqs } from '@/kfzgutachten/data/faqs';

export default function FAQSection() {
  return <FAQTemplate items={faqs} title="Häufig gestellte Fragen" subtitle="Finden Sie schnell Antworten auf Ihre Fragen" />;
}
