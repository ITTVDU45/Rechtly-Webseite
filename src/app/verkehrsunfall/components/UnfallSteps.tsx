import ProcessTemplate from '@/components/sections/ProcessSection/ProcessTemplate';
import { steps } from '@/app/verkehrsunfall/data/steps';

export default function UnfallSteps() {
  return <ProcessTemplate title="So funktioniert's" subtitle="Vier einfache Schritte bis zur Abwicklung" steps={steps} />;
}
