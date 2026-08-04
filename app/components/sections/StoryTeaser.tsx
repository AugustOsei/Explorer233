'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useReveal } from '../useReveal';

/**
 * Story teaser — the door into the Dispatches. Shows the opening beat of
 * SE1-01 and stops before the turn, so the reader has to follow it to /story.
 *
 * A wide story plate gives the launch artwork room to read on desktop before
 * the compact editorial pitch below it.
 */
export default function StoryTeaser() {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="relative" style={{ paddingBlock: 'clamp(5rem, 12vh, 8rem)' }}>
      <div className="chapter-shell relative z-10">
        <div
          data-reveal
          className="dispatch-wide-art"
          style={{ opacity: 0 }}
        >
          <Image
            src="/images/dispatch-one-wide.png"
            alt="Explorer 233 personnel, the Baobab headquarters and spacecraft beneath Earth and the Moon"
            fill
            sizes="(max-width: 1280px) 100vw, 1248px"
            className="object-cover"
          />
          <div className="dispatch-wide-scrim" aria-hidden />
        </div>

        <div className="dispatch-pitch">
          <div>
            <h2
              data-reveal
              className="section-title balance"
              style={{
                maxWidth: '18ch',
                opacity: 0,
              }}
            >
              The Grand Opening
            </h2>
            <p data-reveal data-reveal-delay="0.04" className="caption-meta mt-4" style={{ opacity: 0 }}>
              Dispatch One · 10-minute read · Free
            </p>
          </div>
          <div>
            <p
              data-reveal
              data-reveal-delay="0.08"
              className="font-body mt-6"
              style={{ fontSize: 'var(--step-0)', lineHeight: 1.75, color: 'var(--lunar-silver)', maxWidth: '46ch', opacity: 0 }}
            >
              Explorer 233 unveils its first interstellar ship in Accra while the world is
              still deciding whether the signals from the stars are a greeting or a warning.
            </p>
            <p
              data-reveal
              data-reveal-delay="0.12"
              className="font-body mt-4"
              style={{ fontSize: 'var(--step-0)', lineHeight: 1.75, color: 'var(--lunar-silver)', maxWidth: '46ch', opacity: 0 }}
            >
              Before the night is over, an impossible file opens on founder Laura Osei
              Baako’s desk — and someone promises to kill one of her scientists.
            </p>

            <Link href="/story" className="link-arrow mt-8 inline-flex" data-reveal data-reveal-delay="0.16" style={{ opacity: 0 }}>
              Start reading
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
