'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Link href="/">
              <Image src="/assets/images/Logo Weiß.png" alt="Rechtly Logo" className="footer__logo" style={{ maxWidth: '400px', height: 'auto' }} width={200} height={60} />
            </Link>
          </div>

          <div className="footer__links">
            <h4>Schnellzugriff</h4>
            <ul>
              <li><Link href="/bussgeld">Bußgeldbescheid</Link></li>
              <li><Link href="/kfz-gutachten">KFZ Gutachten</Link></li>
              <li><Link href="/partner">Partner</Link></li>
              <li><Link href="/partner-gutachter">Für Gutachter</Link></li>
              <li><Link href="/verkehrsunfall">Verkehrsunfall</Link></li>
              <li><Link href="/bussgeldrechner">Bußgeldrechner</Link></li>
              <li><Link href="/punkteabfrage">Punkteabfrage</Link></li>
            </ul>
          </div>

          <div className="footer__links">
            <h4>Unternehmen</h4>
            <ul>
              <li><Link href="/ueber-uns">Über uns</Link></li>
              <li><Link href="/kontakt">Kontakt</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/fuer-kfz-gutachter">Für KFZ Gutachter</Link></li>
            </ul>
          </div>

          <div className="footer__contact">
            <h4>Kontakt</h4>
            <p>Tel: +49 170 7160000</p>
            <p>E-Mail: support@rechtly.de</p>
            <Link href="/anliegen-pruefen">
              <button className="footer__cta">Jetzt Anliegen prüfen</button>
            </Link>
            <div className="footer__social">{/* Social Media Links */}</div>
          </div>
        </div>

        <div className="footer__bottom">
          <div className="footer__legal">
            <Link href="/datenschutz">Datenschutz</Link>
            <Link href="/impressum">Impressum</Link>
          </div>
          <p className="footer__copyright">© {new Date().getFullYear()} Rechtly. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


