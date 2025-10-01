import React from 'react';
import Image from 'next/image';
import Section from '@/components/ui/Section';
import BenefitTemplate from '@/components/sections/BenefitSection/BenefitTemplate';
import FAQTemplate from '@/components/sections/FAQSection/FAQTemplate';
import SharedCTA from '@/components/sections/CTASection/CTASection';
import AboutTechService from '@/app/ueber-uns/components/AboutTechService';
import AboutHumanTech from '@/app/ueber-uns/components/AboutHumanTech';

export const metadata = {
  title: 'Über uns — Rechtly',
  description: 'Über Rechtly — Mission, Team und warum wir digitale Verkehrsrechtslösungen bauen.'
};

const benefits = [
  { icon: 'CheckCircle', title: 'Digitale Abläufe', description: 'Schnelle, digitale Prozesse ohne Papierkram.' },
  { icon: 'Shield', title: 'Datenschutz & Sicherheit', description: 'DSGVO-konforme Verarbeitung und sichere Infrastruktur.' },
  { icon: 'Users', title: 'Erfahrenes Team', description: 'Juristen und Entwickler mit Fokus Verkehrsrecht.' },
  { icon: 'Clock', title: 'Schnelle Antworten', description: 'Kurze Reaktionszeiten und transparente Prozesse.' },
  { icon: 'Award', title: 'Qualitätsnetzwerk', description: 'Zertifizierte Partner für Gutachten und Beratung.' },
  { icon: 'Headphones', title: 'Kunden-Support', description: 'Persönlicher Support bei Rückfragen.' }
];

const faqs = [
  { id: 1, question: 'Wer steht hinter Rechtly?', answer: 'Rechtly ist ein Team aus Verkehrsrechtsanwälten, Produktmanagern und Entwickler:innen, die digitale Rechtsdienstleistungen bauen.' },
  { id: 2, question: 'Ist meine Anfrage vertraulich?', answer: 'Ja — wir verarbeiten Daten DSGVO-konform und speichern personenbezogene Daten nur wenn nötig.' },
  { id: 3, question: 'Wie schnell erhalte ich eine Antwort?', answer: 'Bei einfachen Anfragen in der Regel innerhalb weniger Werktage; dringende Fälle priorisieren wir.' }
];

export default function UnternehmenPage() {
  return (
    <main className="bg-slate-50 text-slate-800">
      {/* Hero */}
      {/* Increased top padding to avoid overlap with fixed header */}
      <Section className="pt-36 md:pt-44 lg:pt-52 pb-20" style={{ background: 'linear-gradient(135deg, #1b3a4b 0%, #2c5364 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 text-white">
          <h1 className="text-3xl md:text-4xl font-extrabold">Wir sind Rechtly — Ihre Partner im Verkehrsrecht</h1>
          <p className="mt-4 text-lg text-white/90">Digitale, schnelle und sichere Lösungen für Fragen rund um Bußgeld, Punkte und Gutachten.</p>
          <div className="mt-8">
            <a
              href="#contact"
              className="inline-block rounded-2xl px-6 py-3 font-semibold"
              style={{ background: 'linear-gradient(135deg, #c7e70c 0%, #a3e635 100%)', color: '#07222b' }}
            >
              Kontakt aufnehmen
            </a>
          </div>
        </div>
      </Section>

      {/* Mission & Vision (with full-width visual inside the same section) */}
      <Section className="py-12 section--white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="w-full overflow-hidden mb-8 rounded-xl">
            <Image src="/assets/images/vision.png" alt="Unsere Mission und Vision" width={2400} height={420} className="w-full h-auto object-cover rounded-xl" priority />
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="section-title">Unsere Mission</h2>
              <p className="mt-4 text-slate-700">Wir machen Verkehrsrecht zugänglich: schnell, transparent und digital. Unser Ziel ist es, Menschen unkompliziert zu ihrer rechtlichen Situation zu verhelfen.</p>
            </div>
            <div>
              <h2 className="section-title">Unsere Vision</h2>
              <p className="mt-4 text-slate-700">Eine digitale Plattform, die Rechtssicherheit bietet — von Erstinformation bis zur rechtsverbindlichen Leistung durch unsere Partner.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* About sections from /ueber-uns */}
      <AboutTechService />
      <AboutHumanTech />

      {/* Benefits (use template) */}
      <BenefitTemplate items={benefits} />

      {/* Team */}
      <Section className="py-12 section--white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-title">Unser Team</h2>
          <div className="mt-8 flex flex-col md:flex-row md:justify-center gap-6">
            <div className="p-6 rounded-2xl bg-white shadow-sm w-full md:w-80">
              <div className="h-24 w-24 rounded-full bg-slate-100 mb-4" />
              <h4 className="font-semibold">Dr. Anna Müller</h4>
              <div className="text-sm text-slate-600">Rechtsanwältin, Head of Legal</div>
            </div>
            <div className="p-6 rounded-2xl bg-white shadow-sm w-full md:w-80">
              <div className="h-24 w-24 rounded-full bg-slate-100 mb-4" />
              <h4 className="font-semibold">Maximilian Bauer</h4>
              <div className="text-sm text-slate-600">Produkt & Operations</div>
            </div>
            <div className="p-6 rounded-2xl bg-white shadow-sm w-full md:w-80">
              <div className="h-24 w-24 rounded-full bg-slate-100 mb-4" />
              <h4 className="font-semibold">Lea Schulz</h4>
              <div className="text-sm text-slate-600">Engineering</div>
            </div>
          </div>
        </div>
      </Section>

      {/* Promise */}
      <Section className="py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="section-title">Unser Versprechen</h2>
          <p className="mt-4 text-slate-700">Datenschutz, Transparenz und faire Preise — unser Versprechen an jede:n Kund:in.</p>
        </div>
      </Section>

      {/* FAQ (use template) */}
      <Section className="py-16 section--white">
        <div className="max-w-7xl mx-auto px-4">
          <FAQTemplate items={faqs} title="Häufige Fragen zur Zusammenarbeit" />
        </div>
      </Section>

      {/* CTA (shared) */}
      <SharedCTA />
    </main>
  );
}


