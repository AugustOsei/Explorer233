'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * The commissioning reveal, staged as the book stages it:
 *
 *   "The wall behind her began to separate, and light poured through the
 *    opening as the segmented panels withdrew to reveal the vessel suspended
 *    in the chamber beyond. For one long moment, nobody made a sound."
 *
 * Pinned and scrubbed: two segmented panels withdraw left and right as the
 * reader scrolls, a seam of light widens between them, and the Nipa Nsa is
 * behind it the whole time. The reader performs the reveal instead of watching
 * a fade.
 */
export default function ShipReveal() {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = section.current;
    if (!el) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const q = gsap.utils.selector(el);

    if (reduced) {
      gsap.set(q('[data-panel]'), { xPercent: (i: number) => (i === 0 ? -100 : 100) });
      gsap.set(q('[data-seam]'), { opacity: 0 });
      gsap.set(q('[data-copy]'), { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: '+=260%',
          pin: true,
          anticipatePin: 1,
          scrub: 0.6,
        },
      });

      // The ship settles as the doors open — slight push-in, not a zoom stunt.
      tl.fromTo(q('[data-ship]'), { scale: 1.18 }, { scale: 1, ease: 'none' }, 0);

      // Seam of light: blooms as the panels crack, then is washed out by the
      // room behind it.
      tl.fromTo(q('[data-seam]'), { opacity: 0, scaleX: 0.2 }, { opacity: 1, scaleX: 1, ease: 'none' }, 0)
        .to(q('[data-seam]'), { opacity: 0, ease: 'none' }, 0.45);

      tl.fromTo(q('[data-panel-left]'), { xPercent: 0 }, { xPercent: -100, ease: 'power1.inOut' }, 0.04)
        .fromTo(q('[data-panel-right]'), { xPercent: 0 }, { xPercent: 100, ease: 'power1.inOut' }, 0.04);

      tl.fromTo(q('[data-copy]'), { opacity: 0, y: 28 }, { opacity: 1, y: 0, ease: 'power2.out' }, 0.55);
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={section} className="ship-reveal relative" style={{ background: 'var(--deep-space-black)' }}>
      <div className="relative h-[100svh] w-full overflow-hidden">
        {/* The vessel, behind everything */}
        <div data-ship className="absolute inset-0" style={{ willChange: 'transform' }}>
          <Image
            src="/images/nipa-nsa.jpg"
            alt="The Nipa Nsa suspended in the Baobab's assembly chamber"
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(5,7,11,0.9) 0%, rgba(5,7,11,0.15) 45%, transparent 70%)' }}
          />
        </div>

        {/* Seam of light where the panels meet */}
        <div
          data-seam
          aria-hidden
          className="absolute inset-y-0 left-1/2 -translate-x-1/2"
          style={{
            width: 'clamp(6rem, 16vw, 16rem)',
            background:
              'linear-gradient(90deg, transparent, rgba(245,247,250,0.5) 42%, rgba(255,255,255,0.92) 50%, rgba(245,247,250,0.5) 58%, transparent)',
            filter: 'blur(10px)',
            opacity: 0,
          }}
        />

        {/* The segmented wall */}
        <div data-panel data-panel-left className="wall-panel absolute inset-y-0 left-0 w-1/2" aria-hidden />
        <div
          data-panel
          data-panel-right
          className="wall-panel wall-panel--right absolute inset-y-0 right-0 w-1/2"
          aria-hidden
        />

        {/* Copy */}
        <div className="absolute inset-x-0 bottom-0 z-[3] pb-12 md:pb-16">
          <div className="chapter-shell">
            <div data-copy style={{ opacity: 0, maxWidth: '38rem' }}>
              <p className="eyebrow" style={{ color: 'var(--mission-gold)' }}>
                Nipa Nsa · EX-233-001
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
                One hand cannot lift a load.
              </h2>
              <p
                className="font-body mt-5"
                style={{ fontSize: 'var(--step-0)', lineHeight: 1.75, color: 'rgba(245,247,250,0.78)' }}
              >
                The first vessel built in Africa for travel beyond the Solar System. It will never
                land on a planet — assembled in orbit, tested there, and brought home in sections to
                be shown to the people who paid for it in belief.
              </p>
              <Link href="/world" className="link-arrow mt-8 inline-flex">
                Enter the world
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
