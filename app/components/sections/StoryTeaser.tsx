'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useReveal } from '../useReveal';

/** The latest transmission, with a clear route back to the beginning. */
export default function StoryTeaser() {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="home-dispatch">
      <div className="chapter-shell">
        <article data-reveal className="home-dispatch-feature" style={{ opacity: 0 }}>
          <div className="home-dispatch-art">
            <Image
              src="/images/dispatch-two-poster.jpg"
              alt="A masked Day Zero figure stands against a red signal-filled sky"
              fill
              sizes="(max-width: 800px) 100vw, 58vw"
              className="object-cover"
            />
            <div className="home-dispatch-scrim" aria-hidden="true" />
            <p className="home-dispatch-art-label">Season One · Dispatch SE1-02</p>
          </div>

          <div className="home-dispatch-copy">
            <p className="eyebrow">Available now · Dispatch Two</p>
            <h2>Day Zero</h2>
            <p className="caption-meta">18-minute read · Free</p>
            <p className="home-dispatch-synopsis">
              A midnight traffic stop pulls Constable Constantine Bediako into Day Zero—and
              toward a choice that will place the movement inside the Baobab.
            </p>
            <div className="home-dispatch-actions">
              <Link href="/story/dispatch-two" className="btn-join home-dispatch-cta">
                Read Dispatch Two <span aria-hidden="true">→</span>
              </Link>
              <Link href="/story/dispatch-one" className="home-dispatch-start">New here? Start with Dispatch One</Link>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
