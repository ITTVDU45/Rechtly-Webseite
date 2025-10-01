"use client";

import React from 'react';
import Hero from './components/Hero';
import Process from './components/Process';
import USPs from './components/USPs';
import Categories from './components/Categories';
import TestimonialSection from '@/components/sections/TestimonialSection/TestimonialSection';
import CTASection from '@/components/sections/CTASection/CTASection';
import Partner from './components/Partner';
import FAQ from './components/FAQ';
import Tools from './components/Tools';
import Costs from './components/Costs';
import './bussgeld.css';

export default function BussgeldPage() {
  return (
    <main className="bussgeld-page min-h-screen">
      <Hero />
      <Process />
      <USPs />
      <Partner />
      <Costs />
      <Categories />
      <TestimonialSection />
      <FAQ />
      <CTASection />
    </main>
  );
}


