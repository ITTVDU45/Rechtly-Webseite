import ProcessTemplate from '@/components/sections/ProcessSection/ProcessTemplate';
import { steps } from '@/app/partner-gutachter/data/steps';

export default function PartnerProcess() {
  return (
    <ProcessTemplate 
      title="So funktioniert's in 5 Schritten" 
      subtitle="Einfacher Ablauf für Gutachter-Partner" 
      steps={steps}
      topImage={<img src="/assets/images/Persönliche digitale Assistentin.png" alt="Partner Prozess" />}
    />
  );
}