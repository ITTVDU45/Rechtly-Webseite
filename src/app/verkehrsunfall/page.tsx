import UnfallHero from './components/UnfallHero';
import UnfallSteps from './components/UnfallSteps';
import UnfallVorteile from './components/UnfallVorteile';
import Anspruchsleistungen from './components/Anspruchsleistungen';
import PortalStatus from './components/PortalStatus';
import Ersatzleistungen from './components/Ersatzleistungen';
import FAQSection from './components/FAQSection';
import CTASection from '@/components/sections/CTASection/CTASection';

export const metadata = {
  title: 'Verkehrsunfall abwickeln – Rechtly',
  description: 'Schnelle und rechtssichere Abwicklung bei Verkehrsunfällen mit Rechtly.'
};

export default function VerkehrsunfallPage() {
  return (
    <main className="bg-slate-50 text-slate-800">
      <UnfallHero />
      <UnfallSteps />
      <UnfallVorteile />
      <Anspruchsleistungen />
      <PortalStatus />
      <FAQSection />
      <CTASection />
    </main>
  );
}
