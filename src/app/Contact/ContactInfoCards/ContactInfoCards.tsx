import React from 'react';

function Card({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300">
      <div className="text-3xl">{icon}</div>
      <div className="mt-4 font-semibold text-slate-800">{title}</div>
      <div className="mt-2 text-slate-600">{children}</div>
    </div>
  );
}

export default function ContactInfoCards(): JSX.Element {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card icon={<svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="iconGradAddr" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#1b3a4b"/><stop offset="100%" stopColor="#2c5364"/></linearGradient></defs><path d="M3 7a1 1 0 0 1 1-1h16v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7z" stroke="url(#iconGradAddr)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>} title="Adresse">
        Rechtly GmbH<br/>Alfredstr. 81
        <br/>45130 Essen
      </Card>

      <Card icon={<svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="iconGradMail" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#1b3a4b"/><stop offset="100%" stopColor="#2c5364"/></linearGradient></defs><path d="M3 8l9 6 9-6" stroke="url(#iconGradMail)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>} title="E-Mail">
        <a
          href="mailto:support@rechtly.de"
          aria-label="E-Mail an Rechtly"
          className="inline-block rounded-xl px-6 py-3 shadow-sm transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg"
          style={{ background: 'linear-gradient(135deg, #c7e70c 0%, #a3e635 100%)' }}
        >
          <span style={{ background: 'linear-gradient(135deg, #1b3a4b 0%, #2c5364 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', display: 'inline-block' }}>
            support@rechtly.de
          </span>
        </a>
      </Card>

      <Card icon={<svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="iconGradPhone" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#1b3a4b"/><stop offset="100%" stopColor="#2c5364"/></linearGradient></defs><path d="M22 16.92V21a1 1 0 0 1-1 1 19 19 0 0 1-8.63-2.63A19 19 0 0 1 3 7a1 1 0 0 1 1-1h4.09a1 1 0 0 1 1 .75c.2.9.56 2.22 1.3 3.25a1 1 0 0 1-.24 1.32L8.91 12.91c1.8 3.6 4.9 6.7 8.5 8.5l1.5-1.5a1 1 0 0 1 1.32-.24c1.03.74 2.35 1.1 3.25 1.3a1 1 0 0 1 .75 1V16.92z" stroke="url(#iconGradPhone)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>} title="Telefon">
        <a
          href="tel:+4920189088955"
          aria-label="Anrufen"
          className="inline-block rounded-xl px-6 py-3 shadow-sm transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg"
          style={{ background: 'linear-gradient(135deg, #c7e70c 0%, #a3e635 100%)' }}
        >
          <span style={{ background: 'linear-gradient(135deg, #1b3a4b 0%, #2c5364 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', display: 'inline-block' }}>
            0201 890 88955
          </span>
        </a>
        <div className="mt-3 text-sm">
          Fax: 0201 890 88969
        </div>
      </Card>
    </div>
  );
}


