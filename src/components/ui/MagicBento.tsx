"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { BentoGrid, BentoGridItem } from './bento-grid';
import './bento-grid.css';

export type BentoItem = {
  id?: number;
  title: string;
  description: string;
  label?: string;
  icon?: React.ReactNode;
  image?: string;
  size?: 'small' | 'medium' | 'large';
};

type Props = {
  items: BentoItem[];
  glowColor?: string;
  spotlightRadius?: number;
};

// Skeleton-Komponente für Karten ohne Bild
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-[rgba(255,255,255,0.1)] to-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)]"></div>
);

export default function MagicBento({ items }: Props) {
  return (
    <BentoGrid className="max-w-6xl mx-auto md:auto-rows-[20rem]">
      {items.map((item, i) => {
        // Header mit Bild für jede Karte
        const header = item.image ? (
          <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden relative">
            <Image 
              src={item.image} 
              alt={item.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        ) : (
          <Skeleton />
        );
        
        // Bestimme die Klasse basierend auf dem Item
        let className = "";
        
        // Gleichmäßige Verteilung in 3 Spalten für Desktop
        if (i % 3 === 0) {
          className = "md:col-span-2"; // Erste Karte in jeder Reihe nimmt 2 Spalten ein
        } else {
          className = "md:col-span-1"; // Alle anderen Karten nehmen 1 Spalte ein
        }
        
        return (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={header}
            icon={item.icon}
            className={cn(
              className,
              item.id ? `feature-item-${item.id}` : ""
            )}
            data-feature-id={item.id}
          />
        );
      })}
    </BentoGrid>
  );
}