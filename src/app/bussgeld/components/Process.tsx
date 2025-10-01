"use client";
import React from 'react';
import ProcessTemplate from '../../../components/sections/ProcessSection';
import bussgeldSteps from '../../../components/sections/ProcessSection/data/bussgeldProcess';
import '../bussgeld.css';

export default function Process() {
  return <ProcessTemplate title="So einfach funktioniert Rechtly" subtitle="Schnell, transparent und digital – Ihre Ersteinschätzung in wenigen Schritten." steps={bussgeldSteps} />;
}


