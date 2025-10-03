import ProcessTemplate from '@/components/sections/ProcessSection/ProcessTemplate';
import { steps } from '@/app/partner-gutachter/data/steps';

export default function PartnerProcess() {
  return (
    <ProcessTemplate 
      title="So funktioniert's in 5 Schritten" 
      subtitle="Einfacher Ablauf für Gutachter-Partner" 
      steps={steps}
      topImage={<img src="/assets/images/Rechtly Gutachterpartnerablauf.png" alt="Partner Prozess" className="rounded-xl shadow-md" style={{ borderRadius: '16px', width: '100%', height: 'auto' }} />}
      buttonText="Jetzt Partner werden"
      buttonMicrocopy="Unverbindlich. Provision für jeden vermittelten Fall."
    />
  );
}