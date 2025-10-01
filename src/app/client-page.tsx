"use client";

import dynamic from 'next/dynamic';

const ProcessSection = dynamic(() => import('@/components/sections/ProcessSection/ProcessSection'), {
  ssr: false,
});

export default ProcessSection;
