'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#1B3A4B] to-[#2C5364] flex justify-center items-center z-50">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="flex justify-center gap-4 mb-8">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-5 h-5 bg-[#A3E635] rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.8, 1]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        <motion.div 
          className="text-white font-poppins text-xl tracking-wider"
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          Rechtly lädt...
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Loader;
