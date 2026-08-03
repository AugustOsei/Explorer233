'use client';

import Link from 'next/link';
import { useCallback, useRef } from 'react';
import FrameScrub from './FrameScrub';

/**
 * Ignition — the scroll-scrubbed lift-off.
 *
 * Picks up exactly where ShipReveal leaves off: that section ends on the full
 * frame of the Nipa Nsa in its chamber, and this sequence's first frame *is*
 * that same plate, because the clip was generated from it. The segmented doors
 * are DOM, the lift-off is 121 decoded frames — the cut between them is
 * invisible.
 *
 * Overlay copy is written straight to the DOM from the scrub callback. Putting
 * it in React state would re-render the tree on every scroll tick.
 */
const FRAMES = 121;
const framePath = (i: number) => `/hero-frames/f${String(i).padStart(3, '0')}.jpg`;

export default function Ignition() {
  const bloom = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const cue = useRef<HTMLDivElement>(null);

  const onProgress = useCallback((p: number) => {
    const span = (a: number, b: number) => Math.min(1, Math.max(0, (p - a) / (b - a)));

    // Engine bloom peaks with the ignition, then burns off.
    if (bloom.current) {
      const b = Math.sin(span(0.05, 0.45) * Math.PI);
      bloom.current.style.opacity = String(b * 0.5);
    }

    // Copy arrives once the vessel is clearly moving, and clears before the end
    // so the next section never shares the screen with it.
    if (copy.current) {
      const inn = span(0.3, 0.52);
      const out = span(0.82, 0.96);
      copy.current.style.opacity = String(inn * (1 - out));
      copy.current.style.transform = `translateY(${(1 - inn) * 24 - out * 40}px)`;
    }

    if (cue.current) cue.current.style.opacity = String((1 - span(0.02, 0.14)) * 0.5);
  }, []);

  return (
    <FrameScrub
      count={FRAMES}
      src={framePath}
      runway="+=260%"
      className="relative"
      onProgress={onProgress}
    >
      {/* Ignition bloom */}
      <div
        ref={bloom}
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0,
          background:
            'radial-gradient(ellipse 55% 30% at 50% 68%, rgba(120,190,255,0.55), transparent 70%)',
          mixBlendMode: 'screen',
        }}
      />

      <p className="sr-only">
        The Nipa Nsa ignites its engines and lifts out of the Baobab assembly chamber.
      </p>

      <div className="absolute inset-x-0 bottom-0 z-[2] pb-12 md:pb-16">
        <div className="chapter-shell">
          <div ref={copy} style={{ opacity: 0, maxWidth: '34rem' }}>
            <p className="eyebrow" style={{ color: 'var(--mission-gold)' }}>
              Departure · ECLC
            </p>
            <h2
              className="font-display font-light mt-3 balance"
              style={{
                fontSize: 'var(--step-3)',
                lineHeight: 1.12,
                letterSpacing: '-0.02em',
                color: 'var(--star-white)',
              }}
            >
              If we keep waiting for permission, who writes the future while we wait?
            </h2>
            <Link href="/story" className="link-arrow mt-8 inline-flex">
              Read Dispatch One
            </Link>
          </div>
        </div>
      </div>

      <div
        ref={cue}
        aria-hidden
        className="eyebrow absolute inset-x-0 bottom-8 text-center"
        style={{ color: 'var(--lunar-silver)', fontSize: '10px' }}
      >
        Keep scrolling
      </div>
    </FrameScrub>
  );
}
