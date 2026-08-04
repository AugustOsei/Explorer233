'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Next's built-in hash scroll (triggered by <Link href="/#join"> when
 * navigating in from another page) fires before Departure's GSAP
 * ScrollTrigger has inserted its pin spacer (+=215% of viewport — see
 * hero/Departure.tsx). It lands short by exactly that spacer's height
 * because the document is still shorter than its settled layout.
 *
 * This waits for document height to stop changing (frame load, pin
 * spacer insertion, etc.) and then corrects the scroll to the real
 * target position. No-op if there is no hash on navigation.
 */
export default function HashScrollFix() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const id = hash.slice(1);

    let cancelled = false;
    let raf = 0;
    let stableFrames = 0;
    let lastHeight = -1;
    const start = performance.now();

    const settle = () => {
      if (cancelled) return;
      const height = document.body.scrollHeight;
      if (height === lastHeight) {
        stableFrames += 1;
      } else {
        stableFrames = 0;
        lastHeight = height;
      }
      const timedOut = performance.now() - start > 2000;
      if (stableFrames >= 4 || timedOut) {
        document.getElementById(id)?.scrollIntoView({ block: 'start' });
        return;
      }
      raf = requestAnimationFrame(settle);
    };

    raf = requestAnimationFrame(settle);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  return null;
}
