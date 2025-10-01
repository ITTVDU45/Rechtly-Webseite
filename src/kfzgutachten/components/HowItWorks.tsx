import React from 'react';
import ProcessTemplate from '@/components/sections/ProcessSection/ProcessTemplate';
import { processSteps } from '@/kfzgutachten/data/process';

export default function HowItWorks() {
  return <ProcessTemplate title="So funktioniert's" subtitle="In drei einfachen Schritten" steps={processSteps} />;
}
