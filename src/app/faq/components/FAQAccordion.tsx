"use client";
import React, { useState } from 'react';

type Props = { question: string; answer: string; id?: string };

export default function FAQAccordion({ question, answer, id }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <div id={id} className={`border rounded-lg overflow-hidden ${open ? 'shadow-md' : 'shadow-sm'}`}>
      <button className="w-full text-left p-4 flex justify-between items-center" onClick={() => setOpen((s) => !s)}>
        <span className="font-medium text-slate-800">{question}</span>
        <span>{open ? '−' : '+'}</span>
      </button>
      {open && <div className="p-4 text-slate-600">{answer}</div>}
    </div>
  );
}
