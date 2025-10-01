'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ children, className }) => {
  const shouldReduceMotion = useReducedMotion();

  const variants = {
    initial: { scale: 1, y: 0 },
    hover: shouldReduceMotion ? { scale: 1, y: 0 } : {
      scale: 1.02,
      y: -5,
      transition: {
        duration: 0.3
      }
    },
    tap: shouldReduceMotion ? { scale: 1 } : {
      scale: 0.98
    }
  };

  return (
    <motion.div
      className={cn(
        "animated-card smooth-transform bg-white rounded-2xl p-8 shadow-lg transition-all duration-300",
        className
      )}
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
