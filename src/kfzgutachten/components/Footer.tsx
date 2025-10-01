import React from 'react';
import Section from '@/components/ui/Section';

export default function Footer() {
  return (
    <footer className="bg-slate-50">
      <Section className="py-12">
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold text-slate-800">Rechtly</h4>
            <p className="text-slate-600">Kontakt: kontakt@rechtly.de</p>
            <p className="text-slate-600">Impressum · Datenschutz</p>
          </div>

          <div>
            <h4 className="font-semibold text-slate-800">Newsletter</h4>
            <p className="text-slate-600">Erhalte Updates und Tipps rund um Kfz-Gutachten.</p>
            <div className="mt-4 flex gap-2">
              <input className="p-2 rounded-lg border" placeholder="E-Mail" />
              <button className="rounded-2xl bg-teal-600 text-white px-4">Anmelden</button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-slate-800">Folge uns</h4>
            <div className="flex gap-3 mt-3">
              <a aria-label="Instagram" href="#" className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow">IG</a>
              <a aria-label="LinkedIn" href="#" className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow">IN</a>
            </div>
          </div>
        </div>

        <div className="mt-8 text-sm text-slate-500">© {new Date().getFullYear()} Rechtly — Alle Rechte vorbehalten.</div>
      </Section>
    </footer>
  );
}
