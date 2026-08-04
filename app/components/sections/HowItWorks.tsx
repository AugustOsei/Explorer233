'use client';

import { useReveal } from '../useReveal';

/**
 * What Explorer 233 actually is, in 2026 terms.
 *
 * The one section on this page written from outside the fiction. Everything
 * else speaks from inside 2048, which meant a stranger could read the whole
 * homepage and still not know whether they were looking at a film, a game, a
 * novel, or a real Ghanaian space company. This says: it is a written story,
 * it arrives monthly, it is free, and here is what else exists.
 *
 * Keep it plain. Any voice creeping in here is a bug — the mystery belongs to
 * the plot, not to the format.
 */

const ITEMS = [
  {
    label: 'Read the story',
    body: 'Begin with Dispatch One. A new written chapter arrives every month — free, with no account required.',
  },
  {
    label: 'Meet the world',
    body: 'Explore the characters, factions, ships and places shaping the Signal Age. Start anywhere without needing the lore first.',
  },
  {
    label: 'Join the mission',
    body: 'Receive story releases, franchise news, event announcements and member offers as the universe expands.',
  },
];

export default function HowItWorks() {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="relative" style={{ paddingBlock: 'clamp(4rem, 10vh, 7rem)' }}>
      <div className="chapter-shell relative z-10">
        <h2 data-reveal className="section-title" style={{ opacity: 0 }}>
          Start exploring
        </h2>
        <p data-reveal data-reveal-delay="0.04" className="section-lede mt-5" style={{ opacity: 0 }}>
          You do not need to learn the lore first. Begin with the story, then go deeper wherever your curiosity leads.
        </p>

        <ol className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10 lg:gap-x-14">
          {ITEMS.map((it, i) => (
            <li key={it.label} data-reveal data-reveal-delay={(0.06 * i).toFixed(2)} style={{ opacity: 0 }}>
              {/* Same convention as TheSignal's pillars: gold accent rule,
                  then the name at heading size in the display face, then body
                  a clear step smaller and muted. */}
              <div
                aria-hidden
                style={{ width: '2rem', height: '1px', background: 'var(--mission-gold)', opacity: 0.7 }}
              />
              <h3
                className="font-display font-light mt-4"
                style={{
                  fontSize: 'var(--step-1)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.2,
                  color: 'var(--star-white)',
                }}
              >
                {it.label}
              </h3>
              <p
                className="font-body mt-3"
                style={{
                  fontSize: '15px',
                  lineHeight: 1.7,
                  color: 'var(--lunar-silver)',
                  maxWidth: '38ch',
                }}
              >
                {it.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
