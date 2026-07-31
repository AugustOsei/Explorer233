'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useReveal } from '../useReveal';

/**
 * Story teaser — the door into the Dispatches. Shows the opening beat of
 * SE1-01 and stops before the turn, so the reader has to follow it to /story.
 */
export default function StoryTeaser() {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="relative" style={{ paddingBlock: 'clamp(5rem, 12vh, 8rem)' }}>
      <div className="chapter-shell relative z-10">
        <div className="editorial-grid">
          {/* Media rail */}
          <div data-reveal className="relative w-full overflow-hidden rounded-lg" style={{ aspectRatio: '16 / 9', opacity: 0 }}>
            <Image
              src="/images/baobab-lockdown.jpg"
              alt="The Baobab under lockdown, emergency lighting along the facade"
              fill
              sizes="(max-width: 900px) 92vw, 52vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              aria-hidden
              style={{ background: 'linear-gradient(to top, rgba(5,7,11,0.55), transparent 60%)' }}
            />
          </div>

          {/* Text column */}
          <div>
            <p data-reveal className="eyebrow" style={{ color: 'var(--mission-gold)', opacity: 0 }}>
              The Story · Dispatch SE1-01
            </p>
            <h2
              data-reveal
              data-reveal-delay="0.06"
              className="font-display font-light mt-3 balance"
              style={{
                fontSize: 'var(--step-3)',
                lineHeight: 1.14,
                letterSpacing: '-0.02em',
                color: 'var(--star-white)',
                maxWidth: '18ch',
                opacity: 0,
              }}
            >
              The Baobab
            </h2>
            <p
              data-reveal
              data-reveal-delay="0.1"
              className="font-body mt-6"
              style={{ fontSize: 'var(--step-0)', lineHeight: 1.75, color: 'var(--lunar-silver)', maxWidth: '46ch', opacity: 0 }}
            >
              The first message from another star was discovered because Dr. Amara Nkrumah
              wanted tea. Six months later, Accra opened a building, and a girl who had read
              every paper Laura Osei Baako ever published went to watch.
            </p>
            <p
              data-reveal
              data-reveal-delay="0.14"
              className="font-body mt-4"
              style={{ fontSize: 'var(--step-0)', lineHeight: 1.75, color: 'var(--lunar-silver)', maxWidth: '46ch', opacity: 0 }}
            >
              The day went perfectly. It was near midnight that it did not.
            </p>

            <Link href="/story" className="link-arrow mt-8 inline-flex" data-reveal data-reveal-delay="0.18" style={{ opacity: 0 }}>
              Read the dispatch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
