import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-12 bg-slate-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="mb-6">
          <h4 className="font-semibold">Rechtly</h4>
        </div>
        <div className="flex justify-center gap-6 mb-4">
          <Link href="/impressum" className="text-white/80 hover:underline">Impressum</Link>
          <Link href="/datenschutz" className="text-white/80 hover:underline">Datenschutz</Link>
        </div>
        <p className="text-sm text-white/60">© {new Date().getFullYear()} Rechtly. Alle Rechte vorbehalten.</p>
      </div>
    </footer>
  );
}


