"use client";

import React from 'react';
import FAQTemplate from './FAQTemplate';
import siteFaqs from './faqs';

export default function FAQSectionWrapper() {
  return <FAQTemplate items={siteFaqs} title="Häufig gestellte Fragen" subtitle="Finden Sie schnell Antworten auf Ihre Fragen" />;
}

