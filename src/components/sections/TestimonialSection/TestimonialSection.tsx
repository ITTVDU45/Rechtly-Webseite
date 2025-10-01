/*
  Clean TestimonialSection (TSX)
  - single testimonials dataset
  - grid of Card testimonials
*/

'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
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
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Mobile detection
  useEffect(() => {
    // Verzögerte Initialisierung, um Hydration-Fehler zu vermeiden
    const timer = setTimeout(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth <= 768);
      };
      
      checkMobile();
      window.addEventListener('resize', checkMobile);
      
      return () => window.removeEventListener('resize', checkMobile);
    }, 0);
    
    return () => clearTimeout(timer);
  }, []);

  // Auto-Rotation für den Slider
  useEffect(() => {
    if (isMobile && !isPaused) {
      const interval = setInterval(() => {
        setCurrentSlide(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
      }, 5000);
      return () => clearInterval(interval);
    }
    return () => {};
  }, [isMobile, currentSlide, isPaused]);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? testimonials.length - 1 : prev - 1));
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  };

  return (
    <section className="testimonial py-20 sm:py-16 xs:py-12">
      <div className="testimonial__container mx-auto max-w-7xl px-6 lg:px-8 sm:px-4 xs:px-3">
        <div className="text-center mb-16 sm:mb-12 xs:mb-8">
          <h2 className="text-4xl sm:text-3xl xs:text-2xl font-bold text-gray-900 mb-4 sm:mb-3 xs:mb-2">Das sagen unsere Kunden</h2>
          <p className="text-xl sm:text-lg xs:text-base text-gray-600 max-w-3xl mx-auto">Über 10.000 zufriedene Kunden vertrauen bereits auf unsere Expertise. Lesen Sie, was sie über uns sagen.</p>
        </div>

        {/* Desktop Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-6 xs:gap-4 ${isMobile ? 'hidden' : 'block'}`}>
          {testimonials.map((t, i) => (
            <Card key={i} className="group hover:shadow-xl transition-all duration-300 border-0 bg-gray-50 hover:bg-white">
              <CardHeader className="pb-4 sm:pb-3 xs:pb-2 px-6 sm:px-5 xs:px-4 pt-6 sm:pt-5 xs:pt-4">
                <div className="flex items-start justify-between mb-4 sm:mb-3 xs:mb-2">
                  <div className="flex items-center space-x-3 xs:space-x-2">
                    <Avatar className="w-12 h-12 sm:w-10 sm:h-10 xs:w-9 xs:h-9">
                      {t.avatar ? <AvatarImage src={t.avatar} alt={t.name} /> : <AvatarFallback className="bg-gradient-to-br from-blue-500 to-green-500 text-white font-semibold">{t.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>}
                    </Avatar>
                    <div>
                      <div className="font-semibold text-gray-900 sm:text-sm xs:text-xs">{t.name}</div>
                      <div className="text-sm sm:text-xs xs:text-xs text-gray-600">{t.role}</div>
                      <div className="text-xs sm:text-xs xs:text-[10px] text-gray-500">{t.company}</div>
                    </div>
                  </div>
                  <Quote className="w-6 h-6 sm:w-5 sm:h-5 xs:w-4 xs:h-4 quote-icon transition-colors" />
                </div>

                <div className="flex items-center space-x-1 mb-3 sm:mb-2 xs:mb-1.5">
                  {[...Array(t.rating ?? 5)].map((_, i) => (<Star key={i} className="w-4 h-4 sm:w-3.5 sm:h-3.5 xs:w-3 xs:h-3 fill-yellow-400 text-yellow-400" />))}
                </div>

                <Badge variant="secondary" className="text-xs sm:text-xs xs:text-[10px] testimonial-badge">{t.service}</Badge>
              </CardHeader>

              <CardContent className="pt-0 px-6 sm:px-5 xs:px-4 pb-6 sm:pb-5 xs:pb-4">
                <CardDescription className="text-gray-700 sm:text-sm xs:text-xs leading-relaxed italic">&ldquo;{t.content}&rdquo;</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className={`testimonial__carousel ${isMobile ? 'active' : ''}`}>
          <div className="testimonial__carousel-container">
            <div className="testimonial__carousel-controls">
              <button 
                className="testimonial__carousel-button testimonial__carousel-button--prev" 
                onClick={prevSlide} 
                aria-label="Vorheriges Testimonial"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                className="testimonial__carousel-button testimonial__carousel-button--next" 
                onClick={nextSlide} 
                aria-label="Nächstes Testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
            
            <div 
              className="testimonial__carousel-track" 
              style={{ 
                transform: `translateX(-${currentSlide * 100}%)`,
                width: '100%',
                maxWidth: '100%',
                boxSizing: 'border-box'
              }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {testimonials.map((t, i) => (
                <div className="testimonial__carousel-slide" key={i}>
                  <motion.div 
                    className="testimonial__carousel-card"
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.5 }}
                  >
                    <div className="testimonial__carousel-card-header">
                      <div className="testimonial__carousel-card-user">
                        <Avatar className="w-12 h-12 sm:w-10 sm:h-10 xs:w-9 xs:h-9">
                          {t.avatar ? <AvatarImage src={t.avatar} alt={t.name} /> : <AvatarFallback className="bg-gradient-to-br from-blue-500 to-green-500 text-white font-semibold">{t.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>}
                        </Avatar>
                        <div>
                          <div className="testimonial__carousel-card-name">{t.name}</div>
                          <div className="testimonial__carousel-card-role">{t.role}</div>
                          <div className="testimonial__carousel-card-company">{t.company}</div>
                        </div>
                      </div>
                      <Quote className="testimonial__carousel-card-quote" />
                    </div>
                    
                    <div className="testimonial__carousel-card-rating">
                      {[...Array(t.rating ?? 5)].map((_, i) => (<Star key={i} className="testimonial__carousel-card-star" />))}
                    </div>
                    
                    <Badge variant="secondary" className="testimonial__carousel-card-badge">{t.service}</Badge>
                    
                    <div className="testimonial__carousel-card-content">
                      <div className="testimonial__carousel-card-text">&ldquo;{t.content}&rdquo;</div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="testimonial__carousel-progress">
            <div 
              className="testimonial__carousel-progress-bar" 
              style={{ 
                width: `${(currentSlide + 1) / testimonials.length * 100}%` 
              }}
            ></div>
          </div>
          
          <div className="testimonial__carousel-indicators">
            {testimonials.map((_, index) => (
              <button 
                key={index} 
                className={`testimonial__carousel-indicator ${currentSlide === index ? 'active' : ''}`} 
                onClick={() => goToSlide(index)}
                aria-label={`Gehe zu Testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* statistics panel removed per request */}

        <div className="mt-16 sm:mt-12 xs:mt-8 text-center">
          <p className="text-lg sm:text-base xs:text-sm text-gray-600 mb-6 sm:mb-4 xs:mb-3">Werden auch Sie Teil unserer zufriedenen Kundengemeinschaft</p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-3 xs:gap-2 justify-center">
            <Badge variant="secondary" className="px-6 py-3 sm:px-5 sm:py-2.5 xs:px-4 xs:py-2 text-base sm:text-sm xs:text-xs testimonial-badge">📞 0800-123-4567</Badge>
            <Badge variant="secondary" className="px-6 py-3 sm:px-5 sm:py-2.5 xs:px-4 xs:py-2 text-base sm:text-sm xs:text-xs testimonial-badge">✉️ info@rechtly.de</Badge>
          </div>
        </div>
      </div>
    </section>
  );
}
