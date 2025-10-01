"use client";
import React from 'react';
import '../bussgeld.css';
import { FAQTemplate } from '../../../components/sections/FAQSection';
import bussgeldFaqs from '../data/faqs';

export default function FAQ() {
  return <FAQTemplate items={bussgeldFaqs} title="Häufige Fragen zum Bußgeld" subtitle="Antworten & Klarheit in kurzen Abschnitten" />;
}


