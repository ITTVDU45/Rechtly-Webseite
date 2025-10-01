"use client";
import React from 'react';
import Section from '@/components/ui/Section';
import cases from './data';
import Image from 'next/image';
import './BussgeldCases.css';

export default function BussgeldCases() {
  return (
    <Section className="section--white py-16 my-8 rounded-2xl">
      <div className="bussgeld-cases__inner">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cases.map((c) => (
                <article key={c.id} className="case-card bg-white p-6 rounded-2xl shadow-md">
                  <div className="case-icon text-2xl mb-3">{c.emoji}</div>
                  <h4 className="text-lg font-semibold mb-2">{c.title}</h4>
                  <p className="text-sm text-gray-600 mb-4">{c.description}</p>
                  <button className="btn tool-cta" style={{ background: 'linear-gradient(135deg, #c7e70c, #a3e635)', color: '#07222b', border: 'none' }}>{c.cta}</button>
                </article>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex justify-center">
            <Image src="/assets/images/Verkehrsunfallhero.png" alt="Typische Bußgeldfälle" width={520} height={360} className="rounded-3xl object-cover shadow-lg" />
          </div>
        </div>
      </div>
    </Section>
  );
}


