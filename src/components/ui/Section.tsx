"use client";
import React from 'react';
import './section.css';

type SectionProps<T extends keyof JSX.IntrinsicElements = 'section'> = {
  children: React.ReactNode;
  className?: string;
  as?: T;
  style?: React.CSSProperties;
} & JSX.IntrinsicElements[T];

export default function Section<T extends keyof JSX.IntrinsicElements = 'section'>(props: SectionProps<T>) {
  const { children, className = '', as: Tag = 'section', style, ...rest } = props as SectionProps<any>;
  const mergedClass = `section-card rounded-2xl px-4 md:px-8 ${className}`.trim();
  return (
    // @ts-expect-error spreading rest to dynamic Tag is intended
    <Tag className={mergedClass} style={style} {...rest}>
      <div className="section__container section-inner">{children}</div>
    </Tag>
  );
}


