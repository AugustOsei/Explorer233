'use client';

import { useEffect, useRef } from 'react';

/**
 * Minimal sticky nav that appears once the user begins scrolling.
 * Left: logo. Right: scroll-progress bar.
 * Fades in after 2% of scroll so it doesn't compete with the hero's own
 * wordmark on load. Fades out in the last 3% so it clears the footer.
 */
export default function ScrollNav() {
  const navRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    const bar = barRef.current;
    const topBar = topBarRef.current;
    if (!nav || !bar || !topBar) return;

    let raf = 0;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        const total = document.body.scrollHeight - window.innerHeight;
        if (total <= 0) return;

        const progress = scrolled / total;

        const fadeIn = Math.min(1, progress / 0.02);
        const fadeOut = progress > 0.97 ? Math.max(0, 1 - (progress - 0.97) / 0.03) : 1;
        const opacity = Math.min(fadeIn, fadeOut);

        nav.style.opacity = String(opacity);
        nav.style.pointerEvents = opacity < 0.1 ? 'none' : 'auto';

        const scale = `scaleX(${progress})`;
        bar.style.transform = scale;
        topBar.style.transform = scale;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50"
      style={{ opacity: 0, pointerEvents: 'none' }}
      aria-hidden
    >
      {/* 1px gold progress line at the very top edge of the viewport */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden" style={{ height: '1px' }}>
        <div
          ref={topBarRef}
          className="absolute inset-0 origin-left"
          style={{ background: 'linear-gradient(90deg, var(--gold-accent), var(--gold-bright))', transform: 'scaleX(0)' }}
        />
      </div>

      {/* Backdrop blur strip */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(5,7,13,0.82) 0%, transparent 100%)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          maskImage: 'linear-gradient(to bottom, black 55%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 55%, transparent 100%)',
        }}
      />

      {/* Nav content — progress only, no logo */}
      <div
        className="relative flex items-center justify-end px-6 md:px-10"
        style={{ height: '52px' }}
      >
        {/* Compact progress track + fill */}
        <div
          className="relative overflow-hidden rounded-full"
          style={{ width: 72, height: '2px', background: 'rgba(244,241,234,0.12)' }}
        >
          <div
            ref={barRef}
            className="absolute inset-0 rounded-full origin-left"
            style={{
              background: 'linear-gradient(90deg, var(--gold-accent), var(--gold-bright))',
              transform: 'scaleX(0)',
            }}
          />
        </div>
      </div>
    </header>
  );
}
