import React from 'react';
import Section from '@/components/ui/Section';
import Image from 'next/image';

export default function AboutTechService() {
  return (
    <Section className="py-12">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="section-title">Smart. Schnell. Persönlich.</h2>
          <p className="section-subtitle">Unsere Technologie analysiert jede Anfrage mit hoher Präzision. Unsere Partneranwälte prüfen und begleiten dich individuell. Unser Support ist für dich da – jederzeit per Portal oder Chat.</p>
        </div>
        <div>
          <div className="rounded-2xl overflow-hidden shadow">
            <Image src="/assets/images/Was ist Rechtly.png" alt="Portal Mockup" width={720} height={420} className="object-cover w-full h-full" />
          </div>
        </div>
      </div>
    </Section>
  );
}
