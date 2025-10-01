"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Section from '../../ui/Section';
import './process.css';
import Stepper, { Step } from '../../ui/Stepper';

export type ProcessStep = {
  id: number;
  title: string;
  lead: string;
  desc: string;
  icon?: React.ReactNode;
};

type Props = {
  title: string;
  subtitle?: string;
  steps: ProcessStep[];
  /** optional node rendered directly under the heading and subtitle (e.g. an image) */
  topImage?: React.ReactNode;
};

export default function ProcessTemplate({ title, subtitle, steps, topImage }: Props) {
  return (
    <Section className="section--lg section--white process">
      <div className="section__container process-inner">
        <h2 className="section-title">{title}</h2>
        {subtitle && <p className="section-subtitle">{subtitle}</p>}
        {topImage && <div className="process-image-wrapper">{topImage}</div>}
        <Stepper showAllSteps autoRevealOnEnter revealStaggerMs={350}>
          {steps.map((s) => (
            <Step key={s.id}>
              <div className="step-card">
                <div className="step-icon-large">{s.icon ?? '•'}</div>
                <h3 className="step-title">{s.title}</h3>
                <div className="step-lead">{s.lead}</div>
                <p className="step-desc">{s.desc}</p>
              </div>
            </Step>
          ))}
        </Stepper>

        <div className="process-cta">
          <button className="btn primary neon-cta" aria-label="Jetzt starten – kostenfrei">
            <span>Jetzt starten – kostenfrei</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M5 12h14M13 5l7 7-7 7" stroke="#07222b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="microcopy">Unverbindlich. Ersteinschätzung in wenigen Minuten.</div>
        </div>
      </div>
    </Section>
  );
}


