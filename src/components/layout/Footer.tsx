import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Section from '@/components/ui/Section';

const Footer: React.FC = () => {
  return (
    <Section as="footer" style={{ background: 'linear-gradient(135deg, #123a48 0%, #1b5564 100%)' }} className="mt-16 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          <div className="md:text-left text-center">
            <Image src="/assets/images/Logo Weiß.png" alt="Rechtly" width={160} height={48} className="h-10 mb-4 object-contain mx-auto md:mx-0" />
            <p className="text-sm text-white/80">&copy; {new Date().getFullYear()} Rechtly. Alle Rechte vorbehalten.</p>
          </div>

          <div className="text-center">
            <h4 className="font-semibold mb-4">Leistungen</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/bussgeld" className="text-white/90 hover:underline">Bußgeld</Link></li>
              <li><Link href="/kfz-gutachten" className="text-white/90 hover:underline">KFZ‑Gutachten</Link></li>
              <li><Link href="/partner" className="text-white/90 hover:underline">Partner</Link></li>
              <li><Link href="/partner-gutachter" className="text-white/90 hover:underline">Für Gutachter</Link></li>
              <li><Link href="/verkehrsunfall" className="text-white/90 hover:underline">Verkehrsunfall</Link></li>
              <li><Link href="/unternehmen" className="text-white/90 hover:underline">Unternehmen</Link></li>
            </ul>
          </div>

          <div className="text-center">
            <h4 className="font-semibold mb-4">Kontakt & Rechtliches</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/kontakt" className="text-white/90 hover:underline">Kontakt</Link></li>
              <li><Link href="/faq" className="text-white/90 hover:underline">FAQ</Link></li>
              <li><Link href="/legal/impressum" className="text-white/90 hover:underline">Impressum</Link></li>
              <li><Link href="/legal/datenschutz" className="text-white/90 hover:underline">Datenschutz</Link></li>
              <li><Link href="/legal/agb" className="text-white/90 hover:underline">AGB</Link></li>
            </ul>
          </div>

          <div className="md:text-left text-center">
            <h4 className="font-semibold mb-4">Anliegen prüfen</h4>
            <div className="mb-3 flex justify-center md:justify-start">
              <a href="/anliegen-pruefen" className="inline-block rounded-xl py-2 px-4 shadow-sm transition-all duration-200" style={{ background: 'linear-gradient(135deg, #c7e70c 0%, #a3e635 100%)' }}>
                <span style={{ background: 'linear-gradient(135deg, #1b3a4b 0%, #2c5364 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', display: 'inline-block' }}>
                  Anliegen prüfen
                </span>
            </a>
            </div>

            {/* Footer form removed as requested - keep concise CTA/link only */}
            <p className="text-sm text-white/80">Weitere Informationen und Prüfungen finden Sie unter <Link href="/anliegen-pruefen" className="underline">Anliegen prüfen</Link>.</p>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Footer;
