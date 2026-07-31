import type { Metadata } from 'next';
import PageHeader from '../components/PageHeader';
import StarSky from '../components/sections/StarSky';
import Footer from '../components/sections/Footer';

export const metadata: Metadata = {
  title: 'Games & Events — Explorer 233',
  description: 'Play and gather. Chop First, plus events as they are announced.',
};

/**
 * One real card, one honest empty state.
 *
 * Deliberately no invented Explorer 233-branded titles here — Chop First is the
 * only real thing, and the events rail stays empty until there is something
 * true to put in it. Details below are taken from the live game at
 * chop-first.vercel.app (v2.1).
 */
const GAMES = [
  {
    name: 'Chop First',
    kind: 'Free browser racing',
    blurb:
      'Drift a mountain touge, street-race Accra, or fly a neon highway in orbit. Set a time and your friends get 24 hours to chop it — or take on Ananse, a live AI rival who talks the whole race and claims he let you win.',
    facts: ['3 circuits — Akina Ridge, Accra City Run, Orbital Highway', '4 cars — Street Coupe, Ghana Taxi, Trotro, Hover Bike', 'Time Attack & Arcade · day, dusk, night', 'Free. No install.'],
    href: 'https://chop-first.vercel.app/',
    cta: 'Play Chop First',
  },
];

export default function GamesEventsPage() {
  return (
    <main>
      <StarSky />

      <PageHeader
        eyebrow="Games & Events"
        title="Play, and gather."
        lede="Some of this world you read. Some of it you play. And some of it only happens when we are in a room together."
      />

      {/* Games */}
      <section className="chapter-shell relative z-10" style={{ paddingBlock: 'clamp(3.5rem, 8vh, 6rem)' }}>
        <p className="eyebrow" style={{ color: 'var(--mission-gold)' }}>
          Games
        </p>
        <ul className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-7">
          {GAMES.map((g) => (
            <li key={g.name}>
              <article
                className="h-full flex flex-col rounded-lg p-7 md:p-9"
                style={{
                  border: '1px solid rgba(174,183,194,0.16)',
                  background: 'linear-gradient(180deg, rgba(174,183,194,0.05), rgba(174,183,194,0.01))',
                }}
              >
                <p className="eyebrow" style={{ color: 'var(--orbit-teal)' }}>
                  {g.kind}
                </p>
                <h2
                  className="font-display mt-3"
                  style={{ fontSize: 'var(--step-2)', letterSpacing: '-0.02em', color: 'var(--star-white)' }}
                >
                  {g.name}
                </h2>
                <p
                  className="font-body mt-4"
                  style={{ fontSize: 'var(--step-0)', lineHeight: 1.7, color: 'var(--lunar-silver)' }}
                >
                  {g.blurb}
                </p>
                <ul className="mt-6 flex-1 flex flex-col gap-2">
                  {g.facts.map((f) => (
                    <li
                      key={f}
                      className="font-body"
                      style={{ fontSize: '13px', lineHeight: 1.5, color: 'var(--lunar-silver)', opacity: 0.8 }}
                    >
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={g.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-arrow mt-7 inline-flex self-start"
                >
                  {g.cta}
                </a>
              </article>
            </li>
          ))}
        </ul>
      </section>

      {/* Events — intentionally empty */}
      <section className="chapter-shell relative z-10" style={{ paddingBottom: 'clamp(4rem, 10vh, 7rem)' }}>
        <p className="eyebrow" style={{ color: 'var(--mission-gold)' }}>
          Events
        </p>
        <div
          className="mt-8 rounded-lg px-7 py-14 md:py-20 text-center"
          style={{ border: '1px dashed rgba(174,183,194,0.22)' }}
        >
          <p
            className="font-display font-light"
            style={{ fontSize: 'var(--step-2)', color: 'var(--star-white)', letterSpacing: '-0.02em' }}
          >
            Nothing on the calendar yet.
          </p>
          <p
            className="font-body mt-4 mx-auto"
            style={{ fontSize: 'var(--step-0)', lineHeight: 1.7, color: 'var(--lunar-silver)', maxWidth: '38ch' }}
          >
            When there is a date worth travelling for, the people on the list hear first.
          </p>
          <a href="/#join" className="link-arrow mt-8 inline-flex">
            Join the list
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
