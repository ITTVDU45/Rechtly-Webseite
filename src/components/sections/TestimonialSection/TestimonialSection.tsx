/*
  Clean TestimonialSection (TSX)
  - single testimonials dataset
  - grid of Card testimonials
*/

'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, Quote } from 'lucide-react';
import './TestimonialSection.css';

type Testimonial = {
  name: string;
  role?: string;
  company?: string;
  content: string;
  rating?: number;
  service?: string;
  avatar?: string | null;
};

const testimonials: Testimonial[] = [
  {
    name: 'Michael Schmidt',
    role: 'Geschäftsführer',
    company: 'Schmidt GmbH',
    content: 'Rechtly hat mir in einer schwierigen Situation mit einem Bußgeldbescheid geholfen. Die Experten waren kompetent, freundlich und haben mein Problem schnell gelöst. Ich kann sie nur empfehlen!',
    rating: 5,
    service: 'Bußgeld-Anfechtung',
    avatar: '/assets/images/Mann1 testimonials.png'
  },
  {
    name: 'Sarah Weber',
    role: 'Angestellte',
    company: 'Weber & Partner',
    content: 'Nach einem Verkehrsunfall war ich völlig überfordert. Das Team von Rechtly hat mich durch den gesamten Prozess begleitet und mir eine faire Entschädigung verschafft.',
    rating: 5,
    service: 'Verkehrsunfall-Abwicklung',
    avatar: '/assets/images/Frau 1 testimonials.png'
  },
  {
    name: 'Thomas Müller',
    role: 'Selbstständiger',
    company: 'Müller Consulting',
    content: 'Das KFZ-Gutachten war professionell und detailliert. Die Versicherung hat es sofort anerkannt und ich konnte meinen Schaden schnell regulieren lassen.',
    rating: 5,
    service: 'KFZ-Gutachten',
    avatar: '/assets/images/Mann2 testimonials.png'
  },
  {
    name: 'Julia Becker',
    role: 'Projektmanagerin',
    company: 'Becker Logistik',
    content: 'Schnelle und klare Kommunikation. Mein Fall wurde zügig und transparent abgewickelt – sehr empfehlenswert!',
    rating: 5,
    service: 'Verkehrsunfall-Abwicklung',
    avatar: '/assets/images/Frau 1 testimonials.png'
  },
  {
    name: 'Karim Özdemir',
    role: 'Ingenieur',
    company: 'Özdemir Tech',
    content: 'Dank Rechtly konnte ich einen ungerechtfertigten Bußgeldbescheid erfolgreich anfechten. Top Betreuung!',
    rating: 5,
    service: 'Bußgeld-Anfechtung',
    avatar: '/assets/images/Mann1 testimonials.png'
  },
  {
    name: 'Laura Fischer',
    role: 'Marketing Managerin',
    company: 'Fischer Media',
    content: 'Das KFZ-Gutachten war schnell verfügbar und sehr detailliert. Der Prozess war für mich komplett stressfrei.',
    rating: 5,
    service: 'KFZ-Gutachten',
    avatar: '/assets/images/Frau 1 testimonials.png'
  }
];

export default function TestimonialSection(): JSX.Element {
  return (
    <section className="testimonial py-20">
      <div className="testimonial__container mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Das sagen unsere Kunden</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Über 10.000 zufriedene Kunden vertrauen bereits auf unsere Expertise. Lesen Sie, was sie über uns sagen.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <Card key={i} className="group hover:shadow-xl transition-all duration-300 border-0 bg-gray-50 hover:bg-white">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-12 h-12">
                      {t.avatar ? <AvatarImage src={t.avatar} alt={t.name} /> : <AvatarFallback className="bg-gradient-to-br from-blue-500 to-green-500 text-white font-semibold">{t.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>}
                    </Avatar>
                    <div>
                      <div className="font-semibold text-gray-900">{t.name}</div>
                      <div className="text-sm text-gray-600">{t.role}</div>
                      <div className="text-xs text-gray-500">{t.company}</div>
                    </div>
                  </div>
                  <Quote className="w-6 h-6 quote-icon transition-colors" />
                </div>

                <div className="flex items-center space-x-1 mb-3">
                  {[...Array(t.rating ?? 5)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />))}
                </div>

                <Badge variant="secondary" className="text-xs testimonial-badge">{t.service}</Badge>
              </CardHeader>

              <CardContent className="pt-0">
                <CardDescription className="text-gray-700 leading-relaxed italic">&ldquo;{t.content}&rdquo;</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* statistics panel removed per request */}

        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600 mb-6">Werden auch Sie Teil unserer zufriedenen Kundengemeinschaft</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Badge variant="secondary" className="px-6 py-3 text-base testimonial-badge">📞 0800-123-4567</Badge>
            <Badge variant="secondary" className="px-6 py-3 text-base testimonial-badge">✉️ info@rechtly.de</Badge>
          </div>
        </div>
      </div>
    </section>
  );
}
