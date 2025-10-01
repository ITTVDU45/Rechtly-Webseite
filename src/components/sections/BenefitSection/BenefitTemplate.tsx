"use client";
import React from 'react';
import Section from '@/components/ui/Section';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, Clock, Shield, Users, Award, Headphones } from 'lucide-react';

export type BenefitItem = {
  icon?: React.ComponentType<any> | string;
  title: string;
  description: string;
  color?: string;
};

type Props = {
  title?: string;
  subtitle?: string;
  items: BenefitItem[];
};

export default function BenefitTemplate({ title = 'Warum Rechtly wählen?', subtitle, items }: Props) {
  return (
    <Section className="section--white py-16 mx-4 my-8 overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
        <div className="text-center mb-16">
          <h2 className="section-title">{title}</h2>
          {subtitle && (
            <p className="section-subtitle">{subtitle}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((benefit, index) => {
            const isEven = index % 2 === 0;
            const cardBg = isEven
              ? 'bg-[linear-gradient(135deg,_#c7e70c_0%,_#a3e635_100%)] text-[#1b3a4b]'
              : 'bg-[linear-gradient(135deg,_#1b3a4b_0%,_#2c5364_100%)] text-white';
            const iconBg = isEven ? 'bg-white/70 text-[#1b3a4b]' : 'bg-white/20 text-white';
            const titleColor = isEven ? 'text-[#1b3a4b]' : 'text-white';
            const descColor = isEven ? 'text-[#1b3a4b]/80' : 'text-white/80';

            return (
              <Card key={index} className={`group hover:shadow-xl transition-all duration-300 border-0 overflow-hidden ${cardBg}`}>
                <CardHeader className="pb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors ${iconBg}`}>
                    {benefit.icon ? (
                      typeof benefit.icon === 'string' ? (
                        benefit.icon === 'CheckCircle' ? <CheckCircle className="w-6 h-6" /> :
                        benefit.icon === 'Clock' ? <Clock className="w-6 h-6" /> :
                        benefit.icon === 'Shield' ? <Shield className="w-6 h-6" /> :
                        benefit.icon === 'Users' ? <Users className="w-6 h-6" /> :
                        benefit.icon === 'Award' ? <Award className="w-6 h-6" /> :
                        benefit.icon === 'Headphones' ? <Headphones className="w-6 h-6" /> :
                        <span className="w-6 h-6 block" />
                      ) : (
                        React.createElement(benefit.icon as any, { className: 'w-6 h-6' })
                      )
                    ) : (
                      <span className="w-6 h-6 block" />
                    )}
                  </div>
                  <CardTitle className={`text-lg transition-colors ${titleColor}`}>
                    {benefit.title}
                  </CardTitle>
                  <CardDescription className={`${descColor} leading-relaxed`}>
                    {benefit.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
    </Section>
  );
}


