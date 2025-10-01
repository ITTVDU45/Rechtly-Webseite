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
        <div className="text-center mb-8 sm:mb-6 xs:mb-4">
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle">{subtitle}</p>
        </div>

        <div className="tools-inner grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-5 xs:gap-4">
          {tools.map((t, i) => (
            <article key={i} className="tool-card p-6 sm:p-5 xs:p-4">
              {t.image && (
                <div className="tool-card-image mb-4 sm:mb-3 xs:mb-2">
                  <Image 
                    src={t.image} 
                    alt={t.imageAlt ?? t.title} 
                    width={600} 
                    height={320} 
                    className="rounded-md sm:rounded-sm object-cover" 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                  />
                </div>
              )}
              <h3 className="text-lg sm:text-base xs:text-sm font-semibold mb-2 sm:mb-1.5 xs:mb-1">{t.title}</h3>
              <p className="text-sm sm:text-xs xs:text-xs text-gray-600 mb-4 sm:mb-3 xs:mb-2.5">{t.description}</p>
              {t.cta && (
                <button
                  style={{ background: 'linear-gradient(135deg, #c7e70c, #a3e635)', color: '#07222b', border: 'none' }}
                  className="tool-cta px-4 py-2 sm:px-3.5 sm:py-1.5 xs:px-3 xs:py-1.5 rounded-lg sm:rounded-md xs:rounded text-sm sm:text-xs xs:text-xs font-medium"
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


