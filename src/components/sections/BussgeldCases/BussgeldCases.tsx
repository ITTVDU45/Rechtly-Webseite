"use client";
import React from 'react';
import Section from '@/components/ui/Section';
import cases from './data';
import Image from 'next/image';
import './BussgeldCases.css';

export default function BussgeldCases() {
  return (
    <Section className="section--white py-16 sm:py-12 xs:py-8 my-8 sm:my-6 xs:my-4 rounded-2xl sm:rounded-xl xs:rounded-lg">
      <div className="bussgeld-cases__inner">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-6 xs:gap-4 items-center">
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-4 xs:gap-3">
              {cases.map((c) => (
                <article key={c.id} className="case-card bg-white rounded-2xl shadow-md">
                  <div className="case-icon text-2xl sm:text-xl xs:text-lg mb-3 sm:mb-2">{c.emoji}</div>
                  <h4 className="text-lg font-semibold mb-2">{c.title}</h4>
                  <p className="text-sm text-gray-600 mb-4">{c.description}</p>
                  <button className="btn tool-cta" style={{ background: 'linear-gradient(135deg, #c7e70c, #a3e635)', color: '#07222b', border: 'none' }}>{c.cta}</button>
                </article>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex justify-center">
            <Image 
              src="/assets/images/Verkehrsunfallhero.png" 
              alt="Typische Bußgeldfälle" 
              width={520} 
              height={360} 
              className="rounded-3xl object-cover shadow-lg" 
            />
          </div>
          
          {/* Mobile image - only shown on smaller screens */}
          <div className="flex lg:hidden justify-center mt-6 sm:mt-4">
            <Image 
              src="/assets/images/Verkehrsunfallhero.png" 
              alt="Typische Bußgeldfälle" 
              width={400} 
              height={280} 
              className="rounded-2xl sm:rounded-xl object-cover shadow-lg" 
            />
          </div>
        </div>
      </div>
    </Section>
  );
}


