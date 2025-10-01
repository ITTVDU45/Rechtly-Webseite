import React from 'react';
import { motion } from 'framer-motion';

const TextReveal = ({ children, delay = 0 }) => {
  return (
    <div style={{ overflow: 'hidden' }}>
      <motion.div
        initial={{ y: '100%' }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
          delay: delay
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default TextReveal; 