import React from 'react';
import Section from '@/components/ui/Section';
import Image from 'next/image';

const team = [
  { name: 'Zeynel Kara', role: 'CEO' },
  { name: 'Tolgahan Vardar', role: 'CTO' },
  { name: 'Hüseyin Dirim', role: 'COO' }
];

export default function AboutTeam() {
  return (
    <Section className="py-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="section-title">Die Menschen hinter Rechtly</h2>
        <p className="section-subtitle">Ein interdisziplinäres Team mit Expertise in Recht, Technik & Kundenerfahrung.</p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map((t) => (
            <div key={t.name} className="rounded-xl bg-white p-4 shadow-sm text-center flex flex-col items-center">
              <div className="w-full flex items-center justify-center mb-3">
                <Image src="/assets/images/Frau 1 testimonials.png" alt={t.name} width={120} height={120} className="rounded-full object-cover" />
              </div>
              <div className="font-semibold">{t.name}</div>
              <div className="text-sm text-slate-600">{t.role}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
