'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReveal } from '../useReveal';

gsap.registerPlugin(ScrollTrigger);

/**
 * The Baobab reveal — the first concrete thing in the universe.
 *
 * After the void of the hero, a real building at golden hour. The image sits on
 * a slow parallax (scrubbed, unlike the play-once text reveals) so the HQ rises
 * into frame as the reader scrolls: the sky gives way to ground.
 */
export default function BaobabReveal() {
  const scope = useReveal<HTMLElement>();
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        media,
        { yPercent: -8, scale: 1.12 },
        {
          yPercent: 8,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: media.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={scope} className="relative overflow-hidden" style={{ background: 'var(--deep-space-black)' }}>
      {/* Parallax plate */}
      <div className="relative w-full overflow-hidden" style={{ height: 'clamp(28rem, 78vh, 46rem)' }}>
        <div ref={mediaRef} className="absolute inset-0" style={{ willChange: 'transform' }}>
          <Image
            src="/images/baobab-hq.jpg"
            alt="The Baobab — Explorer 233 headquarters in Accra, at golden hour"
            fill
            sizes="100vw"
            priority={false}
            className="object-cover"
          />
        </div>

        {/* Fade the plate into the void above and below so it seams with the
            starfield sections on either side. */}
        <div className="seam-scrim" aria-hidden />
        <div className="media-scrim-bottom" aria-hidden />

        {/* Caption sits on the darkened floor of the image */}
        <div className="absolute inset-x-0 bottom-0 z-[2] pb-10 md:pb-14">
          <div className="chapter-shell">
            <p data-reveal className="eyebrow" style={{ color: 'var(--mission-gold)', opacity: 0 }}>
              The Baobab · Accra
            </p>
            <h2
              data-reveal
              data-reveal-delay="0.08"
              className="font-display font-light mt-3 balance"
              style={{
                fontSize: 'var(--step-3)',
                lineHeight: 1.14,
                letterSpacing: '-0.02em',
                color: 'var(--star-white)',
                maxWidth: '20ch',
                opacity: 0,
              }}
            >
              Headquarters of a private Ghanaian space agency.
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
