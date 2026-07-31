'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * The cold open.
 *
 * Replaces the old 242-frame rocket-launch scrub entirely. That hero belonged
 * to a different premise — a launch. This story does not begin with a launch;
 * it begins with a message arriving from somewhere nobody was listening to.
 *
 * So the site opens the way Dispatch One opens: black, then three words, then
 * the scale of them. No scroll-jacking, no image sequence, no 3D — just type,
 * a starfield, and timing. Loads instantly and behaves identically on mobile,
 * which the scrubbed hero never did.
 */
export default function SignalHero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = el.querySelectorAll<HTMLElement>('[data-seq]');

    if (reduced) {
      targets.forEach((t) => {
        t.style.opacity = '1';
        t.style.transform = 'none';
        t.style.letterSpacing = '';
      });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // The signal itself: arrives wide and dim, then tightens — like something
      // resolving out of noise rather than fading in.
      tl.fromTo(
        '[data-seq="signal"]',
        { opacity: 0, letterSpacing: '0.9em', filter: 'blur(14px)' },
        { opacity: 1, letterSpacing: '0.34em', filter: 'blur(0px)', duration: 2.1 },
        0.35,
      )
        .fromTo('[data-seq="rule"]', { scaleX: 0 }, { scaleX: 1, duration: 1.1 }, '-=0.7')
        .fromTo('[data-seq="line"]', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 1 }, '-=0.5')
        .fromTo('[data-seq="mark"]', { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 1 }, '-=0.6')
        .fromTo('[data-seq="cta"]', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.9 }, '-=0.55')
        .fromTo('[data-seq="scroll"]', { opacity: 0 }, { opacity: 1, duration: 0.8 }, '-=0.3');
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden"
      style={{ background: 'var(--deep-space-black)' }}
    >
      {/* Faint interference wash — the sky is not empty, it just wasn't listening */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 drift"
        style={{
          background:
            'radial-gradient(ellipse 60% 45% at 50% 42%, rgba(31,166,168,0.10) 0%, transparent 70%), radial-gradient(ellipse 80% 60% at 50% 100%, rgba(214,168,79,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="chapter-shell relative z-10 flex flex-col items-center text-center">
        <h1
          data-seq="signal"
          className="font-display"
          style={{
            opacity: 0,
            fontSize: 'clamp(1.75rem, 7vw, 5rem)',
            fontWeight: 500,
            lineHeight: 1,
            color: 'var(--star-white)',
            textTransform: 'uppercase',
          }}
        >
          We are here
        </h1>

        <div
          data-seq="rule"
          aria-hidden
          className="origin-center"
          style={{
            width: 'min(30rem, 70vw)',
            height: '1px',
            marginTop: 'clamp(1.75rem, 4vh, 2.75rem)',
            background:
              'linear-gradient(90deg, transparent, var(--orbit-teal) 35%, var(--mission-gold) 65%, transparent)',
            transform: 'scaleX(0)',
          }}
        />

        <p
          data-seq="line"
          className="font-body"
          style={{
            opacity: 0,
            marginTop: 'clamp(1.75rem, 4vh, 2.5rem)',
            fontSize: 'var(--step-1)',
            lineHeight: 1.6,
            color: 'var(--lunar-silver)',
            maxWidth: '34ch',
          }}
        >
          In 2047, dozens of nearby stars sent the same three words. Every government on
          Earth began deciding what humanity would be permitted to know.
        </p>

        <div data-seq="mark" style={{ opacity: 0, marginTop: 'clamp(2.5rem, 6vh, 4rem)' }}>
          <p className="eyebrow" style={{ color: 'var(--lunar-silver)', opacity: 0.75 }}>
            Ghana answered
          </p>
          <p
            className="font-display mt-3"
            style={{
              fontSize: 'clamp(1.6rem, 4.5vw, 3rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1,
              color: 'var(--star-white)',
            }}
          >
            EXPLORER 233
          </p>
        </div>

        <div
          data-seq="cta"
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
          style={{ opacity: 0 }}
        >
          <Link href="/story" className="btn-join">
            Read Dispatch One
          </Link>
          <Link href="#join" className="btn-ghost">
            Join the mission
          </Link>
        </div>
      </div>

      <div
        data-seq="scroll"
        aria-hidden
        className="absolute inset-x-0 bottom-8 flex justify-center"
        style={{ opacity: 0 }}
      >
        <span className="eyebrow" style={{ color: 'var(--lunar-silver)', opacity: 0.5, fontSize: '10px' }}>
          Scroll
        </span>
      </div>
    </section>
  );
}
