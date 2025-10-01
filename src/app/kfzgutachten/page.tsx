import HeroSection from '@/kfzgutachten/components/HeroSection';
import HowItWorks from '@/kfzgutachten/components/HowItWorks';
import BenefitsSection from '@/kfzgutachten/components/BenefitsSection';
import AIAssessment from '@/kfzgutachten/components/AIAssessment';
import Partner from '@/app/bussgeld/components/Partner';
import Beispielrechnung from '@/kfzgutachten/components/Beispielrechnung';
import FAQSection from '@/kfzgutachten/components/FAQSection';
import CTASection from '@/components/sections/CTASection/CTASection';

export const metadata = {
  title: 'Kfz-Gutachten – Rechtly',
  description: 'Kfz-Gutachten einfach & digital – Unfall gehabt? Wir bringen dich zum passenden Gutachter.'
};

export default function KfzGutachtenPage() {
  return (
    <main className="bg-slate-50 text-slate-800">
      <HeroSection />
      <HowItWorks />
      <BenefitsSection />
      <Beispielrechnung />
      <AIAssessment />
      <Partner />
      <FAQSection />
      <CTASection />
    </main>
  );
}
