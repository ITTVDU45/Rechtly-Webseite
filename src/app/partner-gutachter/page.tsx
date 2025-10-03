import PartnerHero from './components/PartnerHero';
import PartnerProvision from './components/PartnerProvision';
import PartnerBenefits from './components/PartnerBenefits';
import PartnerProcess from './components/PartnerProcess';
import PartnerAI from './components/PartnerAI';
import PartnerPlatform from './components/PartnerPlatform';
import PartnerFAQ from './components/PartnerFAQ';
import InfoBrochureForm from './components/InfoBrochureForm';
import PartnerCTA from './components/PartnerCTA';
import Footer from './components/Footer';

export const metadata = {
  title: 'Partner‑Gutachter – Rechtly',
  description: 'Werde Partner‑Gutachter bei Rechtly – mehr Fälle, digitale Abwicklung und faire Provision.'
};

export default function PartnerGutachterPage() {
  return (
    <main className="bg-white text-slate-800">
      <PartnerHero />
      <PartnerProvision />
      <PartnerBenefits />
      <PartnerProcess />
      <PartnerAI />
      <PartnerPlatform />
      <InfoBrochureForm />
      <PartnerFAQ />
      <PartnerCTA />
      <Footer />
    </main>
  );
}


