"use client";
import React, { useState } from 'react';
import './faq-mobile.css';

type Props = { question: string; answer: string; id?: string };

export default function FAQAccordion({ question, answer, id }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <div id={id} className={`faq-accordion ${open ? 'faq-accordion-open' : ''}`}>
      <button 
        className="faq-accordion-header touch-target" 
        onClick={() => setOpen((s) => !s)}
        aria-expanded={open}
      >
        <span className="faq-accordion-question">{question}</span>
        <span className="faq-accordion-icon">{open ? '−' : '+'}</span>
      </button>
      {open && <div className="faq-accordion-content">{answer}</div>}
    </div>
  );
}
