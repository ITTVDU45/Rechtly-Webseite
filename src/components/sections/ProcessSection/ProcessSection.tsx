"use client";
import React from 'react';
import ProcessTemplate, { type ProcessStep } from './ProcessTemplate';
import homeProcessSteps from './data/homeProcess';

type Props = {
  title?: string;
  subtitle?: string;
  steps?: ProcessStep[];
};

// Reusable wrapper used on the homepage. If no props are passed it falls back to homeProcessSteps.
export default function ProcessSectionWrapper({ title = 'In drei einfachen Schritten zum Recht', subtitle = 'Mit dem Rechtly Prinzip: schnell, transparent und auf Augenhöhe.', steps = homeProcessSteps }: Props) {
  return <ProcessTemplate title={title} subtitle={subtitle} steps={steps} />;
}

