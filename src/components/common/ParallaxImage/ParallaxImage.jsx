import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ParallaxImage = ({ src, alt }) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <motion.div style={{ y }} className="parallax-container">
      <Image src={src} alt={alt} width={800} height={450} />
    </motion.div>
  );
};

export default ParallaxImage; 