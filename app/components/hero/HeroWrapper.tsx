'use client';

import { useEffect, useState } from 'react';
import HeroScene from './HeroScene';

export default function HeroWrapper() {
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)');
    const mqlMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    setIsMobile(mql.matches);
    setPrefersReducedMotion(mqlMotion.matches);
    setMounted(true);

    const onResize = () => setIsMobile(mql.matches);
    const onMotion = () => setPrefersReducedMotion(mqlMotion.matches);

    mql.addEventListener('change', onResize);
    mqlMotion.addEventListener('change', onMotion);
    return () => {
      mql.removeEventListener('change', onResize);
      mqlMotion.removeEventListener('change', onMotion);
    };
  }, []);

  // Show a minimal void placeholder before hydration
  if (!mounted) {
    return (
      <div style={{ height: '100vh', background: 'var(--bg-void)' }} />
    );
  }

  return <HeroScene isMobile={isMobile} prefersReducedMotion={prefersReducedMotion} />;
}
