import Hero from './components/Hero';
import CTASection from './components/CTASection';
import ProcessTemplate, { ProcessStep } from '@/components/sections/ProcessSection/ProcessTemplate';
import PartnerList from '@/app/partner/components/PartnerList';
import FAQTemplate from '@/components/sections/FAQSection/FAQTemplate';
import './partner.css';

export const metadata = {
  title: 'Partnerprogramm – Rechtly',
  description: 'Werden Sie Partner von Rechtly und profitieren Sie von attraktiven Provisionen.'
};

const steps: ProcessStep[] = [
  { id: 1, title: 'Schritt 1', lead: 'Ihr Kunde meldet sich bei Ihnen wegen eines Verkehrsunfalls.', desc: 'Ihr Kunde meldet sich bei Ihnen, weil er Opfer eines Verkehrsunfall geworden ist.' },
  { id: 2, title: 'Schritt 2', lead: 'Sie empfehlen uns zur Unfallregulierung.', desc: 'Sie empfehlen uns, um die Unfallregulierung für Ihren Kunden zu übernehmen.' },
  { id: 3, title: 'Schritt 3', lead: 'Ihr Kunde beauftragt uns und Sie erhalten Provision.', desc: 'Ihr Kunde folgt Ihrer Empfehlung und beauftragt uns mit der Regulierung seines Unfalls – und Sie erhalten 50 Euro als Provision.' }
];

export default function PartnerPage() {
  return (
    <main className="partner-page bg-slate-50 text-slate-800">
      <Hero />
      <CTASection />

      <section className="process-with-image">
        <ProcessTemplate
          title="Wie ist der Ablauf?"
          steps={steps}
          topImage={<img src="/assets/images/Persönliche digitale Assistentin.png" alt="Partner Ablauf" />}
        />
      </section>

      <PartnerList />

      <FAQTemplate items={[
        { id: 1, question: 'Wie melde ich mich als Partner an?', answer: 'Füllen Sie das Formular oben aus und wir melden uns binnen 48 Stunden.' },
        { id: 2, question: 'Wie hoch ist die Provision?', answer: 'Für erfolgreiche Vermittlungen zahlen wir 50 € pro abgeschlossenem Fall.' }
      ]} />
    </main>
  );
}


