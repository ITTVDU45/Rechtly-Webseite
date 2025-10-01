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
        
        // Geschwindigkeitsverstoß-Karte kleiner darstellen
        if (item.id === 1 || (item.title && item.title.includes("Geschwindigkeit"))) {
          className = "md:col-span-1";
        } 
        // Rotlicht und Abstand nebeneinander
        else if (item.id === 2 || (item.title && item.title.includes("Rotlicht"))) {
          className = "md:col-span-1";
        }
        else if (item.id === 3 || (item.title && item.title.includes("Abstand"))) {
          className = "md:col-span-1";
        }
        // Handy und Alkohol größer
        else if (item.id === 4 || (item.title && item.title.includes("Handy"))) {
          className = "md:col-span-2";
        }
        else if (item.id === 5 || (item.title && item.title.includes("Alkohol") || item.title && item.title.includes("Drogen"))) {
          className = "md:col-span-1";
        }
        // Verkehrsunfall größer
        else if (item.id === 6 || (item.title && item.title.includes("Verkehrsunfall") || item.title && item.title.includes("Unfall"))) {
          className = "md:col-span-2";
        }
        // Fallback
        else {
          className = i % 3 === 0 ? "md:col-span-2" : "md:col-span-1";
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