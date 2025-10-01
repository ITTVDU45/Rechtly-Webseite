import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const ScrollAnimation = ({ children, className }) => {
  const shouldReduceMotion = useReducedMotion();

  const variants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 50 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        willChange: "transform, opacity"
      }
    }
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimation; 