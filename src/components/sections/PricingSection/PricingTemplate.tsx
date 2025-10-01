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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-6 xs:gap-4 mb-16 sm:mb-12 xs:mb-8">
          {plans.map((plan) => (
            <motion.div key={plan.name} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
              <Card className={`relative ${plan.badge === 'Empfohlen' ? 'pricing-card--recommended' : plan.badge === 'Premium' ? 'pricing-card--premium' : ''} bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300`}>
              {plan.badge && (
                <Badge className={`absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r ${plan.color ?? ''} text-white border-0`}>
                  {plan.badge}
                </Badge>
              )}

              <CardHeader className="text-center pb-4 pt-8 sm:pt-6 xs:pt-5 sm:pb-3 xs:pb-2">
                <CardTitle className="text-2xl sm:text-xl xs:text-lg text-gray-900 mb-2 sm:mb-1.5 xs:mb-1">{plan.name}</CardTitle>
                <CardDescription className="text-gray-600 mb-4 sm:mb-3 xs:mb-2 sm:text-sm xs:text-xs">{plan.description}</CardDescription>
                <div className="mb-2">
                  <span className="text-4xl sm:text-3xl xs:text-2xl font-bold text-gray-900">{plan.price}</span>
                  {plan.period && <span className="text-gray-600 ml-2 sm:text-sm xs:text-xs">{plan.period}</span>}
                </div>
                {plan.notes && plan.notes.length > 0 && (
                  <div className="text-xs sm:text-xs xs:text-[10px] text-gray-500 space-y-1 xs:space-y-0.5">
                    {plan.notes.map((n, idx) => (<div key={idx}>{n}</div>))}
                  </div>
                )}
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-4 sm:space-y-3 xs:space-y-2 mb-8 sm:mb-6 xs:mb-4">
                  <h4 className="font-semibold text-gray-900 mb-3 sm:mb-2 xs:mb-1.5 sm:text-sm">Enthalten:</h4>
                  {plan.features.map((feature, fi) => (
                    <div key={fi} className="flex items-center space-x-3 xs:space-x-2">
                      <Check className="w-5 h-5 sm:w-4 sm:h-4 xs:w-3.5 xs:h-3.5 text-green-500 flex-shrink-0" />
                      <span className="text-sm sm:text-xs xs:text-xs text-gray-700">{feature}</span>
                    </div>
                  ))}

                  {plan.notIncluded.length > 0 && (
                    <>
                      <h4 className="font-semibold text-gray-900 mb-3 sm:mb-2 xs:mb-1.5 mt-6 sm:mt-5 xs:mt-4 sm:text-sm">Nicht enthalten:</h4>
                      {plan.notIncluded.map((feature, ni) => (
                        <div key={ni} className="flex items-center space-x-3 xs:space-x-2">
                          <X className="w-5 h-5 sm:w-4 sm:h-4 xs:w-3.5 xs:h-3.5 text-red-500 flex-shrink-0" />
                          <span className="text-sm sm:text-xs xs:text-xs text-gray-500">{feature}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>

                <Button
                  variant={plan.buttonVariant}
                  className="w-full pricing-button-dark"
                  size="lg"
                  style={{
                    background: 'linear-gradient(135deg, #C7E70C 0%, #A3E635 100%)',
                    color: '#07222b',
                    border: 'none'
                  }}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
              </Card>
            </motion.div>
          ))}
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


