"use client";

import React, { useEffect } from 'react';

export default function SmoothScroll() {
  useEffect(() => {
    const handler = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!(target instanceof HTMLAnchorElement)) return;
      const href = target.getAttribute('href') || '';
      const dataTarget = target.getAttribute('data-target');
      if (!href.startsWith('#') && !dataTarget) return;
      e.preventDefault();
      const id = (href.startsWith('#') ? href.slice(1) : dataTarget) as string;
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // update history without navigation
        try { history.replaceState(history.state, '', `#${id}`); } catch (e) {}
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  return null;
}


