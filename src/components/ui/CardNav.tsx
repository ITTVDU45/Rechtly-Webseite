"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import Image from 'next/image';
import Link from 'next/link';
// removed usePathname to avoid hydration mismatch; we'll set active route after mount
import { gsap } from "gsap";
import { GoArrowUpRight } from "react-icons/go";

type CardNavLink = {
  label: string;
  href?: string;
  ariaLabel: string;
};

export type CardNavItem = {
  label: string;
  bgColor: string;
  textColor: string;
  links: CardNavLink[];
};

export interface CardNavProps {
  /** Pfad zum Logo; default: `/assets/images/Logo.png` aus `public` */
  logo?: string;
  logoAlt?: string;
  items: CardNavItem[];
  className?: string;
  ease?: string;
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
}

const CardNav: React.FC<CardNavProps> = ({
  logo = '/assets/images/Logo.png',
  logoAlt = 'Logo',
  items,
  className = "",
  ease = "power3.out",
  baseColor = "#fff",
  menuColor,
  buttonBgColor,
  buttonTextColor,
}) => {
  const [activeRoute, setActiveRoute] = useState<string | null>(null);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const loginRef = useRef<HTMLDivElement | null>(null);

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;

    const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      const contentEl = navEl.querySelector('.card-nav-content') as HTMLElement;
      if (contentEl) {
        const wasVisible = contentEl.style.visibility;
        const wasPointerEvents = contentEl.style.pointerEvents;
        const wasPosition = contentEl.style.position;
        const wasHeight = contentEl.style.height;

        contentEl.style.visibility = 'visible';
        contentEl.style.pointerEvents = 'auto';
        contentEl.style.position = 'static';
        contentEl.style.height = 'auto';

        contentEl.offsetHeight;

        const topBar = 60;
        const padding = 16;
        const contentHeight = contentEl.scrollHeight;

        contentEl.style.visibility = wasVisible;
        contentEl.style.pointerEvents = wasPointerEvents;
        contentEl.style.position = wasPosition;
        contentEl.style.height = wasHeight;

        return topBar + contentHeight + padding;
      }
    }
    return 260;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;

    // keep overflow hidden on mobile for the slide-down animation, allow visible on desktop so dropdowns are not clipped
    gsap.set(navEl, { height: 60 });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });
    gsap.set(navEl, { overflow: isMobile ? 'hidden' : 'visible' });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.4,
      ease,
    });

    tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 }, '-=0.1');

    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
  }, [ease, items]);

  React.useEffect(() => {
    // set active route after client mount to avoid SSR/client mismatch
    if (typeof window !== 'undefined') {
      setActiveRoute(window.location.pathname || null);
    }
  }, []);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;

      if (isExpanded) {
        const newHeight = calculateHeight();
        if (navRef.current) gsap.set(navRef.current, { height: newHeight });

        tlRef.current!.kill();
        const newTl = createTimeline();
        if (newTl) {
          newTl.progress(1);
          tlRef.current = newTl;
        }
      } else {
        tlRef.current!.kill();
        const newTl = createTimeline();
        if (newTl) {
          tlRef.current = newTl;
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isExpanded]);

  // close login dropdown on outside click or Escape
  useLayoutEffect(() => {
    const handleDocClick = (e: MouseEvent) => {
      const el = loginRef.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) {
        setIsLoginOpen(false);
      }
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsLoginOpen(false);
    };

    document.addEventListener('click', handleDocClick);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('click', handleDocClick);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el;
  };

  return (
    <div className={`card-nav-container absolute left-1/2 -translate-x-1/2 w-[90%] max-w-[800px] z-[99] top-[1.2em] md:top-[2em] ${className}`}>
      <nav
        ref={navRef}
        className={`card-nav ${isExpanded ? 'open' : ''} block h-[60px] p-0 rounded-xl shadow-md relative overflow-hidden md:overflow-visible will-change-[height]`}
        style={{ backgroundColor: baseColor }}
      >
        <div className="card-nav-top absolute inset-x-0 top-0 h-[60px] flex items-center justify-between p-2 pl-[1.1rem] z-[2]">
          <div
            className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''} group h-full flex flex-col items-center justify-center cursor-pointer gap-[6px] order-2 md:order-none`}
            onClick={toggleMenu}
            role="button"
            aria-label={isExpanded ? 'Close menu' : 'Open menu'}
            tabIndex={0}
            style={{ color: menuColor || '#000' }}
          >
            <div
              className={`hamburger-line w-[30px] h-[2px] bg-current transition-[transform,opacity,margin] duration-300 ease-linear [transform-origin:50%_50%] ${
                isHamburgerOpen ? 'translate-y-[4px] rotate-45' : ''
              } group-hover:opacity-75`}
            />
            <div
              className={`hamburger-line w-[30px] h-[2px] bg-current transition-[transform,opacity,margin] duration-300 ease-linear [transform-origin:50%_50%] ${
                isHamburgerOpen ? '-translate-y-[4px] -rotate-45' : ''
              } group-hover:opacity-75`}
            />
          </div>

          <div className="logo-container absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[50] pointer-events-none">
            <Link href="/" aria-label="Startseite" className="pointer-events-auto">
              <Image src={logo} alt={logoAlt} className="logo" width={160} height={44} />
            </Link>
          </div>

          {/* Right controls: CTA + Login */}
          <div className="right-controls hidden md:flex items-center gap-2 ml-auto z-[70]">
            {/* primary CTA and login remain in the right controls; service links moved to mega-menu only */}
            <button
              type="button"
              aria-label="Ihr Anliegen prüfen"
              className="card-nav-cta-button inline-flex items-center justify-center gap-2 border-0 rounded-full px-4 h-10 font-semibold cursor-pointer transition-transform duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-[rgba(199,231,12,0.12)] shadow-sm hover:shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #C7E70C 0%, #8BC34A 100%)',
                color: buttonTextColor ?? '#07222b'
              }}
            onClick={() => { window.location.href = '/anliegen-pruefen'; }}
            >
              Anliegen prüfen
            </button>

            <div ref={loginRef} className="login-container flex items-center h-full ml-0 relative">
              <button
                type="button"
                className="card-nav-login inline-flex items-center gap-2 px-3 h-full rounded-md bg-transparent text-[14px] font-medium transition-colors duration-200 hover:bg-white/5"
                onClick={(e) => { e.stopPropagation(); setIsLoginOpen((s) => !s); }}
                aria-haspopup="menu"
                aria-expanded={isLoginOpen}
                style={{ color: menuColor ?? '#07222b' }}
              >
                Anmelden
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {isLoginOpen && (
                <div role="menu" className="absolute right-0 top-full mt-2 w-44 bg-white rounded-md shadow-lg ring-1 ring-black/5 z-50 overflow-hidden">
                  <a href="/login/mandant" role="menuitem" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">Mandantenlogin</a>
                  <a href="/login/geschaeftskunden" role="menuitem" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">Geschäftskunden</a>
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          className={`card-nav-content absolute left-0 right-0 top-[60px] bottom-0 p-2 flex flex-col items-stretch gap-2 justify-start z-[1] ${
            isExpanded ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
          } md:flex-row md:items-end md:gap-[12px]`}
          aria-hidden={!isExpanded}
        >
          {(items || []).slice(0, 3).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="nav-card select-none relative flex flex-col gap-2 p-[12px_16px] rounded-[calc(0.75rem-0.2rem)] min-w-0 flex-[1_1_auto] h-auto min-h-[60px] md:h-full md:min-h-0 md:flex-[1_1_0%]"
              ref={setCardRef(idx)}
              style={{
                background: item.bgColor && item.bgColor !== '#ffffff'
                  ? item.bgColor
                  : 'linear-gradient(135deg, #1B3A4B 0%, #2C5364 100%)',
                color: item.textColor ?? '#ffffff'
              }}
            >
              <div className="nav-card-label font-normal tracking-[-0.5px] text-[18px] md:text-[22px]" style={{ color: '#A3E635' }}>{item.label}</div>
              <div className="nav-card-links mt-auto flex flex-col gap-[2px]">
                {item.links?.map((lnk, i) => (
                  <a
                    key={`${lnk.label}-${i}`}
                    className="nav-card-link inline-flex items-center gap-[6px] no-underline cursor-pointer transition-opacity duration-300 hover:opacity-75 text-[15px] md:text-[16px]"
                    href={lnk.href}
                    aria-label={lnk.ariaLabel}
                    style={{ color: '#ffffff' }}
                  >
                    <GoArrowUpRight className="nav-card-link-icon shrink-0" aria-hidden="true" />
                    {lnk.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;


