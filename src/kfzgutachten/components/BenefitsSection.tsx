import React from 'react';
import BenefitTemplate from '@/components/sections/BenefitSection/BenefitTemplate';
import { benefits } from '@/kfzgutachten/data/benefits';

export default function BenefitsSection() {
  return <BenefitTemplate title="Vorteile – Warum Rechtly?" subtitle="Ihre Vorteile im Überblick" items={benefits} />;
}
