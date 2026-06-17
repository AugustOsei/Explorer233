'use client';

import Image from 'next/image';
import RevealText from '../RevealText';
import { useReveal } from '../useReveal';

/**
 * The thesis — a setup line and a challenge aimed at the reader, no chapter
 * scaffolding, no explanation. The two EXPLORER 233 astronauts stand as a figure
 * in the right of the void, masked into the black so they read as characters
 * inhabiting the scene.
 */
export default function TheCall() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="relative overflow-hidden noise-overlay"
      style={{ background: 'transparent', minHeight: '90vh', display: 'flex', alignItems: 'center', paddingBlock: 'clamp(6rem, 12vh, 9rem)' }}
    >
      {/* No own background: the shared fixed StarSky shows through so the stars
          flow continuously from the hero. Just a soft radial wash behind the
          text column so the copy stays legible over the sky. */}
      <div className="absolute inset-0 z-[1] pointer-events-none" aria-hidden
        style={{ background: 'radial-gradient(ellipse 80% 70% at 30% 50%, rgba(5,7,13,0.7) 0%, rgba(5,7,13,0.25) 55%, transparent 80%)' }} />

      {/* The crew — a figure standing in the right of the void (desktop only).
          Positioned to overlap the text column's right edge so the two halves
          read as one frame rather than clinging to opposite edges. */}
      <div
        data-reveal
        aria-hidden
        className="hidden lg:block absolute right-0 bottom-0 top-0 pointer-events-none z-[2]"
        style={{ width: 'min(50vw, 44rem)', opacity: 0 }}
      >
        <Image
          src="/images/crew-pair.png"
          alt=""
          fill
          sizes="50vw"
          className="object-contain object-bottom"
          style={{
            objectPosition: 'center bottom',
            WebkitMaskImage: 'linear-gradient(to left, black 45%, transparent 100%), linear-gradient(to top, transparent 0%, black 16%)',
            WebkitMaskComposite: 'source-in',
            maskImage: 'linear-gradient(to left, black 45%, transparent 100%), linear-gradient(to top, transparent 0%, black 16%)',
            maskComposite: 'intersect',
          }}
        />
      </div>

      <div className="chapter-shell relative z-10">
        {/* Centered + wider on mobile (no crew image there); left-aligned editorial
            column on desktop, occupying the left ~half so it meets the crew. */}
        <div
          className="flex flex-col items-center text-center lg:items-start lg:text-left mx-auto lg:mx-0"
          style={{ maxWidth: 'min(46rem, 100%)' }}
        >
          <RevealText
            text="Humanity will reach the stars."
            as="h2"
            className="font-display font-light text-center lg:text-left"
            style={{ fontSize: 'var(--step-2)', lineHeight: 1.25, letterSpacing: '-0.01em', color: 'rgba(244,241,234,0.82)', marginInline: 0, maxWidth: '30ch' }}
            stagger={0.04}
          />
          <RevealText
            text="The question is whether Africa arrives as a passenger or a builder."
            as="p"
            className="font-display font-bold mt-5 text-center lg:text-left balance"
            style={{ fontSize: 'var(--step-3)', lineHeight: 1.12, letterSpacing: '-0.02em', color: 'var(--white-warm)', marginInline: 0, maxWidth: '28ch' }}
            stagger={0.05}
            delay={0.1}
            rise={1.1}
            highlight={['Africa', 'builder']}
          />
        </div>
      </div>
    </section>
  );
}
