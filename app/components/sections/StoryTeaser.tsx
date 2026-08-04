'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useReveal } from '../useReveal';

/** The signal resolves into one clear next step: begin Dispatch One. */
export default function StoryTeaser() {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="home-dispatch">
      <div className="chapter-shell">
        <p data-reveal className="home-dispatch-bridge" style={{ opacity: 0 }}>
          That message changes humanity’s future. Explorer 233 is created to find its senders—and
          must survive those determined to keep humanity home.
        </p>

        <article data-reveal data-reveal-delay="0.05" className="home-dispatch-feature" style={{ opacity: 0 }}>
          <div className="home-dispatch-art">
            <Image
              src="/images/home-dispatch.jpg"
              alt="Explorer 233 personnel, the Baobab headquarters and spacecraft beneath Earth and the Moon"
              fill
              sizes="(max-width: 800px) 100vw, 58vw"
              className="object-cover"
              unoptimized
            />
            <div className="home-dispatch-scrim" aria-hidden="true" />
            <p className="home-dispatch-art-label">Season One · Dispatch SE1-01</p>
          </div>

          <div className="home-dispatch-copy">
            <p className="eyebrow">Begin the story</p>
            <h2>The Grand Opening</h2>
            <p className="caption-meta">10-minute read · Free</p>
            <p className="home-dispatch-synopsis">
              Explorer 233 unveils its first interstellar ship in Accra. Before the night ends,
              an impossible file opens on founder Laura Osei Baako’s desk—and someone promises to
              kill one of her scientists.
            </p>
            <Link href="/story" className="btn-join home-dispatch-cta">
              Begin Dispatch One <span aria-hidden="true">→</span>
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
