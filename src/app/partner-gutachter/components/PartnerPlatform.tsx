"use client";
import React from 'react';
import Image from 'next/image';
import Section from '@/components/ui/Section';

// Plattform-Features mit Check-Icons
const PLATFORM_FEATURES = [
  {
    title: "Dashboard",
    description: "Übersicht über Fälle, Status und Einnahmen.",
    features: [
      "Echtzeit-Fallübersicht",
      "Status-Tracking",
      "Finanzübersicht",
      "Automatische Benachrichtigungen"
    ]
  },
  {
    title: "Chat & Dokumente",
    description: "Sichere Kommunikation und Upload-Funktionen.",
    features: [
      "Verschlüsselte Kommunikation",
      "Dokumenten-Upload",
      "Automatische Archivierung",
      "Direkter Kontakt zu Anwälten"
    ]
  }
];

export default function PartnerPlatform() {
  return (
    <Section className="py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="section-title">Alles zentral in einer Plattform</h2>
        <p className="mt-4 text-slate-600 max-w-3xl mx-auto">
          Dashboard, Kommunikation, Dokumentenmanagement und Analytics – alles in einer Oberfläche.
        </p>

        {/* Plattform-Bild */}
        <div className="mt-10 mb-12">
          <div className="rounded-xl overflow-hidden shadow-lg max-w-4xl mx-auto">
            <Image
              src="/assets/images/Digitale Prozesse.png"
              alt="Rechtly Plattform Dashboard"
              width={1000}
              height={600}
              className="w-full h-auto object-cover"
              style={{ maxHeight: '500px' }}
            />
          </div>
        </div>

        {/* Feature-Karten mit Check-Icons */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {PLATFORM_FEATURES.map((feature, index) => (
            <div 
              key={index} 
              className="p-6 bg-white rounded-xl shadow-md flex flex-col h-full"
              style={{ 
                background: index % 2 === 0 
                  ? 'linear-gradient(135deg, #1b3a4b 0%, #2c5364 100%)' 
                  : 'linear-gradient(135deg, #c7e70c 0%, #a3e635 100%)'
              }}
            >
              <h3 className={`font-semibold text-xl mb-3 ${index % 2 === 0 ? 'text-white' : 'text-[#1b3a4b]'}`}>
                {feature.title}
              </h3>
              <p className={`text-sm mb-5 ${index % 2 === 0 ? 'text-white/90' : 'text-[#1b3a4b]/90'}`}>
                {feature.description}
              </p>
              
              <ul className="mt-auto space-y-3">
                {feature.features.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div 
                      className={`flex-shrink-0 w-5 h-5 mr-2 rounded-full flex items-center justify-center mt-0.5 ${
                        index % 2 === 0 ? 'bg-white/20' : 'bg-[#1b3a4b]/20'
                      }`}
                    >
                      <svg 
                        width="12" 
                        height="12" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        className={index % 2 === 0 ? 'text-white' : 'text-[#1b3a4b]'}
                      >
                        <path 
                          d="M5 13l4 4L19 7" 
                          stroke="currentColor" 
                          strokeWidth="3" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className={`text-sm text-left ${index % 2 === 0 ? 'text-white/90' : 'text-[#1b3a4b]/90'}`}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}