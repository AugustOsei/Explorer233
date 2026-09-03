'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Next's built-in hash scroll (triggered by <Link href="/#join"> when
 * navigating in from another page) fires before the document has settled to
 * its final height, so it lands short.
 *
 * This originally existed for one specific culprit: the Departure hero's GSAP
 * pin spacer (+=215% of viewport), which was inserted after the initial scroll
 * and made the document far taller. The homepage now opens on DayZeroHero,
 * which does not pin, so that particular gap is gone — but late image and
 * media loads still shift height, and other routes still rely on this.
 *
 * It waits for document height to stop changing and then corrects the scroll
 * to the real target position. No-op if there is no hash on navigation.
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
