'use client';

import Image from 'next/image';

/**
 * One continuous starry sky shared by every section after the hero.
 *
 * It's a single FIXED layer (the same Milky Way frame the hero rocket vanished
 * into) sitting behind TheCall → Interlude → Subscribe. Because it's fixed, it
 * never restarts or seams between sections — scrolling reads as one long look
 * into the same sky. The hero ends on this exact starfield, so the moment the
 * hero unpins there is no dark gap: these stars are already behind it.
 *
 * Sections layer their own art (crew, dawn-over-Earth) and scrims on top.
 */
export default function StarSky() {
  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden
      // Promote to its own compositor layer so iOS Safari doesn't repaint /
      // flicker the fixed sky during momentum scroll.
      style={{ transform: 'translateZ(0)', willChange: 'transform' }}
    >
      <Image
        src="/images/hero-stars.jpg"
        alt=""
        fill
        sizes="100vw"
        priority
        className="object-cover"
        style={{ objectPosition: 'center' }}
      />
      {/* Gentle wash so foreground text/art always stays legible over the stars. */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(5,7,13,0.45)' }}
      />
    </div>
  );
}
