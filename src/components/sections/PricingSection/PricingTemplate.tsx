"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Button from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X } from 'lucide-react';
import Section from '@/components/ui/Section';
import './PricingSection.css';

export type Plan = {
  name: string;
  description: string;
  price: string;
  period?: string;
  notes?: string[];
  features: string[];
  notIncluded: string[];
  badge?: string;
  color?: string;
  buttonText: string;
  buttonVariant: 'outline' | 'default';
};

type Props = {
  title?: string;
  subtitle?: string;
  plans: Plan[];
};

export default function PricingTemplate({ title = 'Kostenlose Ersteinschätzung & transparente Kosten', subtitle, plans }: Props) {
  return (
    <Section className="pricing section--lg py-20 bg-gradient-to-br from-[#07323b] to-[#123a48] text-white">
        <div className="text-center mb-16 section__container">
          <h2 className="text-4xl font-bold text-white mb-4">{title}</h2>
          {subtitle && <p className="text-xl text-white/80 max-w-4xl mx-auto">{subtitle}</p>}
        </div>

        {/* Single info card — replace 3-column grid with one card containing the provided text */}
        <div className="max-w-3xl mx-auto mb-16">
          <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}>
            <Card className="bg-white border-0 shadow-lg transition-all duration-300">
              <CardContent className="p-8 sm:p-6 xs:p-5">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Kostenlose Ersteinschätzung & transparente Kosten</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Lassen Sie Ihren Bußgeldbescheid, Verkehrsunfall oder Ihr Kfz-Gutachten kostenlos prüfen – ohne Risiko für Sie als Geschädigten.
                </p>

                <div className="text-gray-700 mb-3 leading-relaxed">
                  <p className="mb-3">In vielen Fällen entstehen keine Kosten für Sie:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      Bei Verkehrsunfällen werden Anwalts- und Gutachterkosten in der Regel von der gegnerischen Versicherung übernommen.
                    </li>
                    <li>
                      Mit einer bestehenden Rechtsschutzversicherung ist auch die komplette Fallbearbeitung in Bußgeldsachen oder bei Unfallereignissen meist abgedeckt.
                    </li>
                  </ul>
                </div>

                <p className="text-gray-700 mb-3 leading-relaxed">
                  Für weiterführende Leistungen (z. B. mehrere parallele Fälle, Sondergutachten, Unternehmenslösungen o. ä.) informieren wir Sie im Rahmen der kostenlosen Ersteinschätzung transparent über mögliche Selbstzahlerkosten – sofern diese nicht über Ihre Versicherung gedeckt sind.
                </p>

                <p className="text-gray-700 mb-4 leading-relaxed">✅ Sie erhalten in jedem Fall eine klare Einschätzung der Erfolgschancen und der Kosten – bevor Sie sich entscheiden.</p>

                <div className="mt-4">
                  <Button size="lg" variant="default" style={{ background: 'linear-gradient(135deg, #C7E70C 0%, #A3E635 100%)', color: '#07222b', border: 'none' }}>
                    Kostenlose Ersteinschätzung starten
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="bg-white rounded-2xl sm:rounded-xl xs:rounded-lg p-8 sm:p-6 xs:p-4 shadow-lg border border-gray-100 mb-16 sm:mb-12 xs:mb-8">
          <h3 className="text-2xl sm:text-xl xs:text-lg font-bold text-gray-900 mb-4 sm:mb-3 xs:mb-2">Ihre Vorteile</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-2.5 xs:gap-2 text-gray-600 sm:text-sm xs:text-xs">
            <li className="flex items-start space-x-3 xs:space-x-2">
              <Check className="w-5 h-5 sm:w-4 sm:h-4 xs:w-3.5 xs:h-3.5 text-green-500 mt-1 xs:mt-0.5" />
              <span>Status live verfolgen im Mandanten-Portal</span>
            </li>
            <li className="flex items-start space-x-3 xs:space-x-2">
              <Check className="w-5 h-5 sm:w-4 sm:h-4 xs:w-3.5 xs:h-3.5 text-green-500 mt-1 xs:mt-0.5" />
              <span>Direkt mit dem Anwalt kommunizieren</span>
            </li>
            <li className="flex items-start space-x-3 xs:space-x-2">
              <Check className="w-5 h-5 sm:w-4 sm:h-4 xs:w-3.5 xs:h-3.5 text-green-500 mt-1 xs:mt-0.5" />
              <span>Direkt mit dem Gutachter kommunizieren</span>
            </li>
            <li className="flex items-start space-x-3 xs:space-x-2">
              <Check className="w-5 h-5 sm:w-4 sm:h-4 xs:w-3.5 xs:h-3.5 text-green-500 mt-1 xs:mt-0.5" />
              <span>KI-gestützte Empfehlungen zu Chancen, nächsten Schritten & Dokumenten</span>
            </li>
          </ul>
        </div>
    </Section>
  );
}


