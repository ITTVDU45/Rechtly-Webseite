import React from 'react';
import ContactHero from '@/app/Contact/ContactHero/ContactHero';
import ContactInfoCards from '@/app/Contact/ContactInfoCards/ContactInfoCards';
import ContactMap from '@/app/Contact/ContactMap/ContactMap';
import ContactForm from '@/app/Contact/ContactForm/ContactForm';

export const metadata = {
  title: 'Kontakt – Rechtly',
  description: 'Kontaktieren Sie Rechtly per E‑Mail, Telefon oder besuchen Sie uns vor Ort.'
};

export default function KontaktPage() {
  return (
    <main className="bg-white text-slate-800">
      <ContactHero />

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ContactInfoCards />
        </div>
      </section>

      <section className="py-8 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-8 items-start">
          <ContactForm />
          <ContactMap />
        </div>
      </section>
    </main>
  );
}


