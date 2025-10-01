'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import './TrustSection.css';

const pressLogos = [
  { id: 1, name: 'Spiegel', logo: '/assets/images/trust_mobile-1-1024x64.png' },
  { id: 2, name: 'Focus', logo: '/assets/images/trust_mobile-1-1024x64.png' },
  { id: 3, name: 'Handelsblatt', logo: '/assets/images/trust_mobile-1-1024x64.png' }
];

const ratings = [
  { id: 1, platform: 'Trustpilot', score: '4.8/5', count: '1.240', logo: '/assets/images/ratings/trustpilot.svg' },
  { id: 2, platform: 'Google', score: '4.9/5', count: '890', logo: '/assets/images/ratings/google.svg' }
];

const TrustSection: React.FC = () => {
  return (
    <section className="trust">
      <div className="trust__container">
        <div className="trust__press">
          <p className="trust__subtitle">Bekannt aus</p>
          <div className="trust__press-logos">
            {pressLogos.map((press) => (
              <motion.div key={press.id} whileHover={{ scale: 1.05 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Image src={press.logo} alt={press.name} className="trust__press-logo" width={140} height={36} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Kennzahlen und Bewertungskarten auf Wunsch entfernt */}
      </div>
    </section>
  );
};

export default TrustSection;
