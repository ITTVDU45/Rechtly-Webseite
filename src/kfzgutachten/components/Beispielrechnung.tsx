import React from 'react';
import Section from '@/components/ui/Section';

const boxes = [
  { title: 'Dauer der Reparatur', value: '5–6 Werktage*' },
  { title: 'Schadenshöhe', value: '15.000€*' },
  { title: 'Entschädigung für Nutzungsausfall', value: 'bis 1.050€*' },
  { title: 'Wertverlust', value: 'ca. 2.500€*' }
];

export default function Beispielrechnung() {
  return (
    <Section className="bg-white py-12" style={{ background: '#ffffff' }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-6">
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-800">Verschenken Sie nicht Ihr Geld, Sie können eine Entschädigung erhalten!*</h3>
          <p className="text-sm text-slate-500 mt-2">*wenn Sie unverschuldet in einen Verkehrsunfall geraten sind.</p>
        </div>

        {/* Visual above the cards */}
        <div className="w-full flex justify-center mb-8">
          <div className="w-full max-w-4xl rounded-2xl overflow-hidden bg-white shadow">
            <img src="/assets/images/KFZ GUTACHTER.png" alt="Auto mit Seitenschaden" className="w-full h-auto object-contain" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {boxes.map((b, i) => {
            // Diagonale Anordnung: Karte 1 und 4 hell, Karte 2 und 3 dunkel
            const isDiagonalLight = i === 0 || i === 3;

            const cardStyle: React.CSSProperties = isDiagonalLight
              ? { background: '#ffffff' }
              : { background: 'linear-gradient(135deg,#1b3a4b 0%,#2c5364 100%)' };

            const titleStyle: React.CSSProperties = isDiagonalLight
              ? { color: '#374151' }
              : { color: 'rgba(255,255,255,0.9)' };

            const valueStyle: React.CSSProperties = isDiagonalLight
              ? { color: '#c7e70c', fontWeight: 700 }
              : { color: '#ffffff', fontWeight: 700 };

            return (
              <div key={b.title} className="rounded-xl p-6 shadow-sm" style={cardStyle}>
                <div className="text-sm" style={titleStyle}>{b.title}</div>
                <div className="mt-3 text-xl" style={valueStyle}>{b.value}</div>
              </div>
            );
          })}
        </div>

        <p className="text-xs text-slate-400 mt-4">*Es handelt sich um eine Beispielrechnung. Die tatsächlichen Ansprüche können im Einzelfall variieren.</p>
      </div>
    </Section>
  );
}
