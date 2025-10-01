import React from 'react';
import Section from '@/components/ui/Section';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users, Truck, Settings, FileText, Wrench } from 'lucide-react';

const PARTNER_ITEMS = [
  { title: 'KFZ‑Gutachter', description: 'Zuverlässige Gutachten für Ihre Kunden nach Unfällen.', icon: FileText },
  { title: 'Autohäuser', description: 'Erweitern Sie Ihr Serviceportfolio mit Unfallregulierung für Ihre Kunden.', icon: Users },
  { title: 'Flottenbetreiber', description: 'Skalierbare Abwicklung für Fuhrparks und Flottenkunden.', icon: Truck },
  { title: 'KFZ Werkstätte', description: 'Schnelle Kommunikation zwischen Werkstatt, Gutachter und Kunde.', icon: Wrench },
  { title: 'Versicherungsagenturen', description: 'Attraktive Angebotserweiterung ohne zusätzlichen Aufwand.', icon: Settings }
];

export default function PartnerList() {
  return (
    <Section className="section--white py-16 mx-4 my-8 overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
      <div className="text-center mb-12">
        <h2 className="section-title">Wer kann Partner werden?</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PARTNER_ITEMS.map((item, index) => {
          const isEven = index % 2 === 0;
          const cardBg = isEven
            ? 'bg-[linear-gradient(135deg,_#c7e70c_0%,_#a3e635_100%)] text-[#1b3a4b]'
            : 'bg-[linear-gradient(135deg,_#1b3a4b_0%,_#2c5364_100%)] text-white';
          const iconBg = isEven ? 'bg-white/70 text-[#1b3a4b]' : 'bg-white/20 text-white';

          const IconComp = item.icon as any;
          const titleColor = isEven ? 'text-[#1b3a4b]' : 'text-white';
          const descColor = isEven ? 'text-[#1b3a4b]/80' : 'text-white/80';

          return (
            <Card key={item.title} className={`group transform will-change-transform hover:-translate-y-2 hover:scale-[1.02] hover:shadow-xl transition-all duration-300 border-0 overflow-hidden ${cardBg}`}>
              <CardHeader className="pb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors ${iconBg}`}>
                  {IconComp ? <IconComp className="w-6 h-6" /> : <span className="w-6 h-6 block" />}
                </div>
                <CardTitle className={`text-lg ${titleColor}`}>{item.title}</CardTitle>
                <CardDescription className={`${descColor} leading-relaxed`}>{item.description}</CardDescription>
              </CardHeader>

              
            </Card>
          );
        })}
      </div>
    </Section>
  );
}


