"use client";

import React, { useEffect, useId, useState } from "react";

type ScrollToTopProps = {
  smooth?: boolean;
  top?: number;
  color?: string;
  svgPath?: string;
  width?: number | string;
  height?: number | string;
  viewBox?: string;
  style?: React.CSSProperties;
  className?: string;
};

export default function ScrollToTop({
  smooth = true,
  top = 320,
  color = "#ffffff",
  svgPath = "M12 5l-7 7h4v7h6v-7h4l-7-7z",
  width = 22,
  height = 22,
  viewBox = "0 0 24 24",
  style,
  className = "",
}: ScrollToTopProps): JSX.Element | null {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const gradientId = useId();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > top);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [top]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 640px)");
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMobile = () => setIsMobile(Boolean(mq.matches));
    const updateReduced = () => setReducedMotion(Boolean(rm.matches));
    updateMobile();
    updateReduced();
    const mqHandler = (e: MediaQueryListEvent) => updateMobile();
    const rmHandler = (e: MediaQueryListEvent) => updateReduced();
    if (mq.addEventListener) mq.addEventListener("change", mqHandler);
    else mq.addListener(mqHandler as any);
    if (rm.addEventListener) rm.addEventListener("change", rmHandler);
    else rm.addListener(rmHandler as any);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", mqHandler);
      else mq.removeListener(mqHandler as any);
      if (rm.removeEventListener) rm.removeEventListener("change", rmHandler);
      else rm.removeListener(rmHandler as any);
    };
  }, []);

  if (!visible) return null;

  const handleClick = () => {
    const behavior = smooth ? ("smooth" as ScrollBehavior) : ("auto" as ScrollBehavior);
    window.scrollTo({ top: 0, behavior });
  };

  const size = isMobile ? 48 : 64;
  const offset = isMobile ? "0.75rem" : "1.25rem";
  const baseStyle: React.CSSProperties = {
    position: "fixed",
    left: offset,
    bottom: offset,
    width: size,
    height: size,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, rgb(199, 231, 12) 0%, rgb(163, 230, 53) 100%)",
    color: "#ffffff",
    border: "2px solid rgba(255,255,255,0.12)",
    borderRadius: 9999,
    boxShadow: "0 12px 36px rgba(33,200,10,0.22), 0 4px 8px rgba(0,0,0,0.08) inset",
    cursor: "pointer",
    transition: reducedMotion ? undefined : "transform 180ms cubic-bezier(.2,.9,.3,1), box-shadow 180ms ease",
    zIndex: 60,
    animation: reducedMotion ? undefined : "scrollToTopIn 320ms cubic-bezier(.2,.9,.3,1) both",
  };

  const mergedStyle = { ...baseStyle, ...(style || {}) };

  return (
    <button
      aria-label="Nach oben"
      title="Nach oben"
      className={`scroll-to-top ${className}`}
      onClick={handleClick}
      style={mergedStyle}
    >
      <svg
        width={width}
        height={height}
        viewBox={viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
        role="img"
      >
        <defs>
          <linearGradient id={`scrollToTopGrad-${gradientId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(27, 58, 75)" />
            <stop offset="100%" stopColor="rgb(44, 83, 100)" />
          </linearGradient>
        </defs>
        <path d={svgPath} fill={`url(#scrollToTopGrad-${gradientId})`} />
      </svg>
    </button>
  );
}


