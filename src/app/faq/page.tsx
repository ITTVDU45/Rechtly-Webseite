import FAQHero from './components/FAQHero';
import FAQBlock from './components/FAQBlock';
import FAQCategoryCard from './components/FAQCategoryCard';
import FAQAccordion from './components/FAQAccordion';

export const metadata = {
  title: 'FAQ – Rechtly',
  description: 'Häufig gestellte Fragen zu Punkten, Bußgeld, Unfällen und unseren Services.'
};

export default function FAQPage() {
  return (
    <main className="bg-slate-50 text-slate-800">
      <FAQHero />

      {/* Decorative lower category cards removed — anchors live in the hero only */}

      <FAQBlock id="punktabfrage" title="Punktabfrage" />
      <FAQBlock id="bussgeldrechner" title="Bußgeldrechner" />
      <FAQBlock id="was-ist-rechtly" title="Was ist Rechtly?" />
      <FAQBlock id="service-support" title="Service & Support" />
      <FAQBlock id="bussgeld" title="Bußgeld" />
      <FAQBlock id="verkehrsunfall" title="Verkehrsunfall" />
      <FAQBlock id="kfzgutachten" title="Kfz-Gutachten" />
      <FAQBlock id="ablauf" title="Ablauf & Plattform" />
    </main>
  );
}
