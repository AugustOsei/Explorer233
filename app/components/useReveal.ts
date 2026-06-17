'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Reveals elements marked with [data-reveal] inside the returned ref on scroll.
 * Plays once (toggleActions) rather than scrubbing — crisper for text blocks.
 * Honors prefers-reduced-motion by showing everything immediately.
 */
export function useReveal<T extends HTMLElement>() {
  const scope = useRef<T>(null);

  useEffect(() => {
    const el = scope.current;
    if (!el) return;

    const targets = el.querySelectorAll<HTMLElement>('[data-reveal]');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      targets.forEach((t) => { t.style.opacity = '1'; t.style.transform = 'none'; });
      return;
    }

    const ctx = gsap.context(() => {
      targets.forEach((t) => {
        const delay = parseFloat(t.dataset.revealDelay || '0');
        gsap.fromTo(
          t,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: t,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, scope);

    return () => ctx.revert();
  }, []);

  return scope;
}
