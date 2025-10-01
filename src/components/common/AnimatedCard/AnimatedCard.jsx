import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import './AnimatedCard.css';

const AnimatedCard = ({ children }) => {
  const shouldReduceMotion = useReducedMotion();

  const variants = {
    initial: { scale: 1, y: 0 },
    hover: shouldReduceMotion ? {} : {
      scale: 1.02,
      y: -5,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    tap: shouldReduceMotion ? {} : {
      scale: 0.98
    }
  };

  return (
    <motion.div
      className="animated-card smooth-transform"
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard; 