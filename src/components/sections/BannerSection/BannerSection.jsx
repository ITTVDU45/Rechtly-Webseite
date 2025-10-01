import React from 'react';
import { motion } from 'framer-motion';
import './BannerSection.css';

const BannerSection = () => {
  return (
    <section className="banner">
      <div className="banner__container">
        <div className="banner__content">
          <motion.div 
            className="banner__text"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1>
              <div className="banner__title-line">Ihr Experte für <span className="highlight">Verkehrsrecht</span></div>
            </h1>
            <h2 className="banner__subtitle">Einfach. Digital. Rechtbekommen.</h2>
            <div className="banner__benefits">
              <motion.div 
                className="banner__benefit-item"
                whileHover={{ scale: 1.05 }}
              >
                <span className="banner__benefit-icon">⚖️</span>
                <h3>Sofortige Ersteinschätzung </h3>
                <p>in wenigen Sekunden wissen Sie, ob Sie Anspruch haben.</p>
              </motion.div>

              <motion.div 
                className="banner__benefit-item"
                whileHover={{ scale: 1.05 }}
              >
                <span className="banner__benefit-icon">⏱️</span>
                <h3>Rund um die Uhr erreichbar </h3>
                <p>Unsere smarte Assistentin begleitet Sie 24/7.</p>
              </motion.div>

              <motion.div 
                className="banner__benefit-item"
                whileHover={{ scale: 1.05 }}
              >
                <span className="banner__benefit-icon">🏆</span>
                <h3>Hohe Erfolgsquote</h3>
                <p>Über 90% erfolgreiche Fälle</p>
              </motion.div>
            </div>
            <motion.button
              className="banner__cta-button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Jetzt kostenlos prüfen
            </motion.button>
          </motion.div>

          <motion.div 
            className="banner__image-wrapper"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img 
              src="/assets/images/mann-bussgeld.png" 
              alt="Rechtly Bußgeldberatung" 
              className="banner__image"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection; 