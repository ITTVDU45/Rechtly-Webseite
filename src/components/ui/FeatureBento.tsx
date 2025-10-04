'use client';

import React from 'react';
import Image from 'next/image';
import './feature-bento.css';

export type FeatureBentoItem = {
  id?: number;
  title: string;
  description: string;
  icon?: React.ReactNode;
  image?: string;
};

type Props = {
  items: FeatureBentoItem[];
};

export default function FeatureBento({ items }: Props) {
  return (
    <div className="feature-bento-grid">
      {items.map((item, i) => (
        <div 
          key={i} 
          className="feature-bento-item"
          data-feature-id={item.id}
        >
          {item.image && (
            <div className="feature-bento-header">
              <Image 
                src={item.image} 
                alt={item.title}
                fill
                className="feature-bento-image"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}
          
          {item.icon && (
            <div className="feature-bento-icon">
              {item.icon}
            </div>
          )}
          
          <h3 className="feature-bento-title">{item.title}</h3>
          <p className="feature-bento-description">{item.description}</p>
        </div>
      ))}
    </div>
  );
}
