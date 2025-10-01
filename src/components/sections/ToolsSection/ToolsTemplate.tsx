"use client";
import React from 'react';
import Image from 'next/image';
import Section from '@/components/ui/Section';
import './ToolsSection.css';

type ToolCard = {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  cta?: string;
};

type Props = {
  title?: string;
  subtitle?: string;
  tools: ToolCard[];
  className?: string;
};

export default function ToolsTemplate({ title = 'Interaktive Tools', subtitle = 'Nützliche Rechner & Checks — schnell, transparent, ohne Anmeldung.', tools, className = '' }: Props) {
  return (
    <Section className={`section--white tools ${className}`.trim()}>
      <div className="tools__container">
        <div className="text-center mb-8">
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle">{subtitle}</p>
        </div>

        <div className="tools-inner grid grid-cols-1 md:grid-cols-3 gap-6">
          {tools.map((t, i) => (
            <article key={i} className="tool-card p-6">
              {t.image && (
                <div className="tool-card-image mb-4">
                  <Image src={t.image} alt={t.imageAlt ?? t.title} width={600} height={320} className="rounded-md object-cover" />
                </div>
              )}
              <h3 className="text-lg font-semibold mb-2">{t.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{t.description}</p>
              {t.cta && (
                <button
                  style={{ background: 'linear-gradient(135deg, #c7e70c, #a3e635)', color: '#07222b', border: 'none' }}
                  className="tool-cta px-4 py-2 rounded-lg font-medium"
                >
                  {t.cta}
                </button>
              )}
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}


