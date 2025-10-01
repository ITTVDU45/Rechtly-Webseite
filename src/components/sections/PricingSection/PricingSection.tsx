'use client';

import React from 'react';
// motion kept for potential timed reveals
// (currently unused) - keep for future micro-animations
import { motion } from 'framer-motion';
import PricingTemplate from './PricingTemplate';
import plansDefault from './plansDefault';

export default function PricingSection(): JSX.Element {
  return <PricingTemplate plans={plansDefault} />;
}
