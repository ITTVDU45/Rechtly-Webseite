"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Section from '@/components/ui/Section';
import './CTASection.css';

// highlights removed — reserved for future use

const CTASection: React.FC = () => {
  const router = useRouter();

  return (
    <Section className="py-20 sm:py-16 xs:py-12 cta" style={{ background: 'linear-gradient(135deg, #1b3a4b 0%, #2c5364 100%)' }}>
      <div className="cta__container">
        <div className="cta__content text-white">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl sm:text-2xl xs:text-xl font-extrabold"
          >
            Lassen Sie uns gemeinsam Ihr Recht durchsetzen
          </motion.h2>

          <motion.p
            className="cta__text mt-4 sm:mt-3 xs:mt-2 text-lg sm:text-base xs:text-sm text-white/90"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Unsere Experten prüfen Ihren Fall kostenlos und unverbindlich. Erfahren Sie innerhalb von 24 Stunden, wie wir Ihnen helfen können.
          </motion.p>

          <motion.button
            className="cta__button mt-8 sm:mt-6 xs:mt-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/anliegen-pruefen')}
            style={{ background: 'linear-gradient(135deg, #C7E70C 0%, #8BC34A 100%)', color: '#07222b' }}
          >
            Kostenlose Einschätzung
          </motion.button>
        </div>

        <motion.div 
          className="cta__image-container"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Image 
            src="/assets/images/AnwälteCTA.png"
            alt="Rechtliche Beratung" 
            className="cta__image rounded-full object-cover"
            width={540}
            height={360}
            sizes="(max-width: 400px) 220px, (max-width: 576px) 260px, (max-width: 768px) 300px, (max-width: 992px) 400px, 540px"
          />
        </motion.div>
      </div>
    </Section>
  );
};

export default CTASection;
