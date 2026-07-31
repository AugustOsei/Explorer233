'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReveal } from '../useReveal';

gsap.registerPlugin(ScrollTrigger);

/**
 * A full-bleed cinematic beat: one image doing the work, copy sitting low in the
 * frame, slow scrub parallax underneath.
 *
 * The landing page is a sequence of these rather than a scroll-jacked set piece
 * — each one is a held shot, and the scroll is just the cut between them.
 */
export default function CinematicPlate({
  src,
  alt,
  eyebrow,
  title,
  body,
  meta,
  href,
  cta,
  align = 'left',
  height = 'clamp(32rem, 90vh, 54rem)',
  priority = false,
}: {
  src: string;
  alt: string;
  eyebrow: string;
  title: string;
  body?: string;
  meta?: string;
  href?: string;
  cta?: string;
  align?: 'left' | 'center';
  height?: string;
  priority?: boolean;
}) {
  const scope = useReveal<HTMLElement>();
  const media = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = media.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -6, scale: 1.1 },
        {
          yPercent: 6,
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={scope} className="relative overflow-hidden" style={{ background: 'var(--deep-space-black)' }}>
      <div className="relative w-full overflow-hidden" style={{ height }}>
        <div ref={media} className="absolute inset-0" style={{ willChange: 'transform' }}>
          <Image src={src} alt={alt} fill sizes="100vw" priority={priority} className="object-cover" />
        </div>

        <div className="seam-scrim" aria-hidden />
        <div className="media-scrim-bottom" aria-hidden />

        <div className="absolute inset-x-0 bottom-0 z-[2] pb-12 md:pb-16">
          <div className="chapter-shell">
            <div
              className={align === 'center' ? 'mx-auto text-center' : ''}
              style={{ maxWidth: align === 'center' ? '46rem' : '38rem' }}
            >
              <p data-reveal className="eyebrow" style={{ color: 'var(--mission-gold)', opacity: 0 }}>
                {eyebrow}
              </p>
              <h2
                data-reveal
                data-reveal-delay="0.06"
                className="font-display font-light mt-3 balance"
                style={{
                  fontSize: 'var(--step-3)',
                  lineHeight: 1.12,
                  letterSpacing: '-0.02em',
                  color: 'var(--star-white)',
                  opacity: 0,
                }}
              >
                {title}
              </h2>
              {body && (
                <p
                  data-reveal
                  data-reveal-delay="0.1"
                  className="font-body mt-5"
                  style={{ fontSize: 'var(--step-0)', lineHeight: 1.75, color: 'rgba(245,247,250,0.78)', opacity: 0 }}
                >
                  {body}
                </p>
              )}
              {meta && (
                <p
                  data-reveal
                  data-reveal-delay="0.13"
                  className="font-body mt-5 tabnum"
                  style={{
                    fontSize: '11.5px',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: 'var(--lunar-silver)',
                    opacity: 0,
                  }}
                >
                  {meta}
                </p>
              )}
              {href && cta && (
                <Link
                  href={href}
                  className="link-arrow mt-8 inline-flex"
                  data-reveal
                  data-reveal-delay="0.16"
                  style={{ opacity: 0 }}
                >
                  {cta}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
