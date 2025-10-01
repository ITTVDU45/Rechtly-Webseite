"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Section from '@/components/ui/Section';
import '@/components/sections/CTASection/CTASection.css';

const CTASection: React.FC = () => {
  const router = useRouter();

  return (
    <Section className="py-20 cta" style={{ background: 'linear-gradient(135deg, #1b3a4b 0%, #2c5364 100%)' }}>
      <div className="cta__container">
        <div className="cta__content text-white">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-extrabold"
          >
            Empfehlen Sie uns Ihren Kunden
          </motion.h2>

          <motion.p
            className="cta__text mt-4 text-lg text-white/90"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Sichern Sie sich eine Provision in Höhe von 50€!
          </motion.p>

          <motion.p
            className="cta__text mt-4 text-base text-white/80"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Erweitern Sie Ihr Serviceangebot ganz einfach, ohne zusätzlichen Aufwand oder Kosten. Durch die Empfehlung an uns bieten Sie Ihren Kunden eine wertvolle Unterstützung, während Sie gleichzeitig von einer Provision profitieren. Eine unkomplizierte Möglichkeit, Ihr Geschäft zu bereichern – ohne zusätzlichen Aufwand.
          </motion.p>

          <motion.button
            className="cta__button mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push('/partner')}
          >
            Mehr entdecken
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
            alt="Partner Visual"
            className="cta__image rounded-full object-cover"
            width={540}
            height={360}
          />
        </motion.div>

      </div>
    </Section>
  );
};

export default CTASection;


