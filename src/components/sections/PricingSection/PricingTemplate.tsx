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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <motion.div key={plan.name} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
              <Card className={`relative ${plan.badge === 'Empfohlen' ? 'pricing-card--recommended' : plan.badge === 'Premium' ? 'pricing-card--premium' : ''} bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300`}>
              {plan.badge && (
                <Badge className={`absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r ${plan.color ?? ''} text-white border-0`}>
                  {plan.badge}
                </Badge>
              )}

              <CardHeader className="text-center pb-4 pt-8">
                <CardTitle className="text-2xl text-gray-900 mb-2">{plan.name}</CardTitle>
                <CardDescription className="text-gray-600 mb-4">{plan.description}</CardDescription>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  {plan.period && <span className="text-gray-600 ml-2">{plan.period}</span>}
                </div>
                {plan.notes && plan.notes.length > 0 && (
                  <div className="text-xs text-gray-500 space-y-1">
                    {plan.notes.map((n, idx) => (<div key={idx}>{n}</div>))}
                  </div>
                )}
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-4 mb-8">
                  <h4 className="font-semibold text-gray-900 mb-3">Enthalten:</h4>
                  {plan.features.map((feature, fi) => (
                    <div key={fi} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}

                  {plan.notIncluded.length > 0 && (
                    <>
                      <h4 className="font-semibold text-gray-900 mb-3 mt-6">Nicht enthalten:</h4>
                      {plan.notIncluded.map((feature, ni) => (
                        <div key={ni} className="flex items-center space-x-3">
                          <X className="w-5 h-5 text-red-500 flex-shrink-0" />
                          <span className="text-sm text-gray-500">{feature}</span>
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

        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ihre Vorteile</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-600">
            <li className="flex items-start space-x-3"><Check className="w-5 h-5 text-green-500 mt-1" /><span>Status live verfolgen im Mandanten-Portal</span></li>
            <li className="flex items-start space-x-3"><Check className="w-5 h-5 text-green-500 mt-1" /><span>Direkt mit dem Anwalt kommunizieren</span></li>
            <li className="flex items-start space-x-3"><Check className="w-5 h-5 text-green-500 mt-1" /><span>Direkt mit dem Gutachter kommunizieren</span></li>
            <li className="flex items-start space-x-3"><Check className="w-5 h-5 text-green-500 mt-1" /><span>KI-gestützte Empfehlungen zu Chancen, nächsten Schritten & Dokumenten</span></li>
          </ul>
        </div>
    </Section>
  );
}


