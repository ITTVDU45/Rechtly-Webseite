'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TextRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const TextReveal: React.FC<TextRevealProps> = ({ 
  children, 
  delay = 0,
  className 
}) => {
  return (
    <div className={cn("overflow-hidden", className)}>
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
