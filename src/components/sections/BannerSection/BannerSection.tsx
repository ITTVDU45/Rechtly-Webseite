'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/button';
import '@styles/BannerSection.css';

const BannerSection: React.FC = () => {
  return (
    <section className="banner py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="banner__text"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              <div className="mb-2">Ihr Experte für <span className="banner__highlight">Verkehrsrecht</span></div>
            </h1>
            <h2 className="text-2xl text-gray-600 mb-8">Einfach. Digital. Rechtbekommen.</h2>
            
            <div className="space-y-6 mb-8">
              <motion.div 
                className="flex items-start space-x-4"
                whileHover={{ scale: 1.02 }}
              >
                <span className="text-3xl">⚖️</span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Sofortige Ersteinschätzung</h3>
                  <p className="text-gray-600">In wenigen Sekunden wissen Sie, ob Sie Anspruch haben.</p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start space-x-4"
                whileHover={{ scale: 1.02 }}
              >
                <span className="text-3xl">⏱️</span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Rund um die Uhr erreichbar</h3>
                  <p className="text-gray-600">Unsere smarte Assistentin begleitet Sie 24/7.</p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start space-x-4"
                whileHover={{ scale: 1.02 }}
              >
                <span className="text-3xl">🏆</span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Hohe Erfolgsquote</h3>
                  <p className="text-gray-600">Über 90% erfolgreiche Fälle</p>
                </div>
              </motion.div>
            </div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="outline"
                size="lg"
                className="banner__cta-button px-8 py-4 text-lg"
                style={{
                  background: 'linear-gradient(135deg, #C7E70C 0%, #A3E635 100%)',
                  border: 'none'
                }}
              >
                Jetzt kostenlos prüfen
              </Button>
            </motion.div>
          </motion.div>

          <motion.div 
            className="banner__image-wrapper"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div
              className="rounded-2xl p-8 text-center"
              style={{ background: 'linear-gradient(135deg, #1b3a4b 0%, #2c5364 100%)' }}
            >
              <div className="text-8xl mb-4">⚖️</div>
              <h3 className="text-xl font-semibold text-white">Rechtly Bußgeldberatung</h3>
              <p className="text-white/90 mt-2">Professionelle Rechtsberatung</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;


