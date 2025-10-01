import AboutHero from './components/AboutHero';
import AboutHumanTech from './components/AboutHumanTech';
import AboutTeam from './components/AboutTeam';
import AboutPrinciples from './components/AboutPrinciples';
import AboutTechService from './components/AboutTechService';
import AboutPartners from './components/AboutPartners';
import CTASection from './components/CTASection';
import AboutKPIs from './components/AboutKPIs';

export const metadata = {
  title: 'Über uns – Rechtly',
  description: 'Recht einfach: Die digitale Lösung im Verkehrsrecht. Lernen Sie das Team und unsere Werte kennen.'
};

export default function AboutPage() {
  return (
    <main className="bg-slate-50 text-slate-800">
      <AboutHero />
      <AboutHumanTech />
      <AboutTeam />
      <AboutPrinciples />
      <AboutTechService />
      <AboutPartners />
      <CTASection />
      <AboutKPIs />
    </main>
  );
}
