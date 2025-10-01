import FAQTemplate from '@/components/sections/FAQSection/FAQTemplate';
import { faqs } from '@/app/verkehrsunfall/data/faqs';

export default function FAQSection() {
  return <FAQTemplate items={faqs} title="Häufig gestellte Fragen" subtitle="Antworten auf die wichtigsten Fragen" />;
}
