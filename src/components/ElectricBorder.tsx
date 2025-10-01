"use client";

import React, { CSSProperties, PropsWithChildren, useEffect, useLayoutEffect, useRef } from 'react';

type ElectricBorderProps = PropsWithChildren<{
  color?: string;
  speed?: number;
  chaos?: number;
  thickness?: number;
  className?: string;
  style?: CSSProperties;
}>;

function hexToRgba(hex: string, alpha = 1): string {
  if (!hex) return `rgba(0,0,0,${alpha})`;
  let h = hex.replace('#', '');
  if (h.length === 3) {
    h = h
      .split('')
      .map(c => c + c)
      .join('');
  }
  const int = parseInt(h, 16);
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const ElectricBorder: React.FC<ElectricBorderProps> = ({
  children,
  color = '#5227FF',
  speed = 1,
  chaos = 1,
  thickness = 2,
  className,
  style
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const strokeRef = useRef<HTMLDivElement | null>(null);

  // throttle helpers to avoid frequent layout work
  const scheduledRef = useRef(false);
  const lastRunRef = useRef(0);

  const updateAnim = () => {
    // Respect reduced motion
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Throttle updates to ~100ms
    const now = Date.now();
    if (scheduledRef.current) return;
    const timeSince = now - (lastRunRef.current || 0);
    const minInterval = 100;
    if (timeSince < minInterval) {
      scheduledRef.current = true;
      setTimeout(() => {
        scheduledRef.current = false;
        lastRunRef.current = Date.now();
        // lightweight effect: apply subtle transform to stroke element to trigger GPU compositing
        if (strokeRef.current) {
          strokeRef.current.style.transform = `translateY(${(Math.sin(Date.now() / 500) * 1).toFixed(2)}px)`;
        }
      }, minInterval - timeSince);
      return;
    }

    lastRunRef.current = now;
    // lightweight effect: subtle transform to stroke for a lively glow without heavy svg filters
    if (strokeRef.current) {
      strokeRef.current.style.transform = `translateY(${(Math.sin(now / 500) * 1).toFixed(2)}px)`;
    }
  };

  useEffect(() => {
    updateAnim();
  }, [speed, chaos]);

  useLayoutEffect(() => {
    if (!rootRef.current) return;
    const host = rootRef.current;
    const ro = new ResizeObserver(() => {
      // call throttled update
      updateAnim();
    });
    ro.observe(host);
    // initial lightweight update
    updateAnim();
    return () => ro.disconnect();
  }, []);

  const inheritRadius: CSSProperties = {
    borderRadius: style?.borderRadius ?? 'inherit'
  };

  const strokeStyle: CSSProperties = {
    ...inheritRadius,
    borderWidth: thickness,
    borderStyle: 'solid',
    borderColor: color
  };

  const glow1Style: CSSProperties = {
    ...inheritRadius,
    borderWidth: thickness,
    borderStyle: 'solid',
    borderColor: hexToRgba(color, 0.6),
    filter: `blur(${0.5 + thickness * 0.25}px)`,
    opacity: 0.5
  };

  const glow2Style: CSSProperties = {
    ...inheritRadius,
    borderWidth: thickness,
    borderStyle: 'solid',
    borderColor: color,
    filter: `blur(${2 + thickness * 0.5}px)`,
    opacity: 0.5
  };

  const bgGlowStyle: CSSProperties = {
    ...inheritRadius,
    transform: 'scale(1.08)',
    filter: 'blur(32px)',
    opacity: 0.3,
    zIndex: -1,
    background: `linear-gradient(-30deg, ${hexToRgba(color, 0.8)}, transparent, ${color})`
  };

  return (
    <div ref={rootRef} className={'relative isolate ' + (className ?? '')} style={style}>
      {/* lightweight CSS-based glow layers (cheap on GPU) */}
      <div className="absolute inset-0 pointer-events-none" style={inheritRadius}>
        <div ref={strokeRef} className="absolute inset-0 box-border" style={{ ...strokeStyle, transition: 'transform 600ms ease-out' }} />
        <div className="absolute inset-0 box-border" style={glow1Style} />
        <div className="absolute inset-0 box-border" style={glow2Style} />
        <div className="absolute inset-0" style={bgGlowStyle} />
      </div>

      <div className="relative" style={inheritRadius}>
        {children}
      </div>
    </div>
  );
};

export default ElectricBorder;
