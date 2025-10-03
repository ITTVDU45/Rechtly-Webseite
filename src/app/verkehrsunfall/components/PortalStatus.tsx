import React from 'react';
import Section from '@/components/ui/Section';
import Image from 'next/image';
import Link from 'next/link';

export default function PortalStatus() {
  return (
    <Section className="py-12">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="section-title">Jederzeit alles im Blick</h2>
          <p className="section-subtitle">In deinem persönlichen Portal siehst du jederzeit den aktuellen Stand deines Falls – vom Gutachten bis zur Regulierung.</p>

          <ul className="mt-6 space-y-3">
            <li className="flex items-start gap-3"><span className="text-teal-600">✔</span><span>Hochgeladene Dokumente einsehbar</span></li>
            <li className="flex items-start gap-3"><span className="text-teal-600">✔</span><span>Nachrichten & Updates</span></li>
            <li className="flex items-start gap-3"><span className="text-teal-600">✔</span><span>Bearbeitungsstatus & Ansprechpartner</span></li>
          </ul>
          
          <div className="mt-8">
            <Link href="/anliegen-pruefen">
              <button 
                className="px-6 py-3 rounded-xl font-medium text-[#07222b] shadow-lg transition-all duration-300 hover:shadow-xl hover:transform hover:-translate-y-1"
                style={{ 
                  background: 'linear-gradient(135deg, #A3E635 0%, #84CC16 100%)',
                  border: 'none'
                }}
              >
                Unfall jetzt melden
              </button>
            </Link>
          </div>
        </div>

        <div className="w-full">
          <div className="rounded-2xl overflow-hidden shadow">
            <Image src="/assets/images/Was ist Rechtly.png" alt="Portal Screenshot" width={800} height={480} className="object-cover" />
          </div>
        </div>
      </div>
    </Section>
  );
}