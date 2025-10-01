'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  parallaxIntensity?: number;
}

const ParallaxImage: React.FC<ParallaxImageProps> = ({ 
  src, 
  alt, 
  className,
  parallaxIntensity = 20 
}) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${parallaxIntensity}%`]);

  return (
    <motion.div 
      style={{ y }} 
      className={cn("parallax-container overflow-hidden", className)}
    >
      <Image 
        src={src} 
        alt={alt}
        width={800}
        height={600}
        className="w-full h-auto object-cover"
      />
    </motion.div>
  );
};

export default ParallaxImage;
