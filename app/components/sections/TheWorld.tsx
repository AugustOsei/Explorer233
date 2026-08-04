'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useReveal } from '../useReveal';

/**
 * The world, as an index — not a story and not an About Us page.
 *
 * Design follows the codex/champion-grid pattern used by franchise universe
 * sites (League of Legends' Universe being the clearest example): art-first
 * tiles bled to the edges, a category tag and a name, and nothing else in the
 * grid itself. You browse, you click, the depth lives on the detail page. The
 * previous version was three cards each carrying a paragraph, which turned a
 * glance into homework and read like a startup team page.
 *
 * Two bands rather than one grid, because the source art demands it: the
 * character locks are portraits and the world plates are 16:9. Forcing all six
 * into one aspect ratio would either crop the ship in half or float the
 * portraits in dead space.
 *
 * Tags do the explaining. "Laura Osei Baako / FOUNDER" needs no sentence; the
 * one-liners below stay under ten words and describe what a thing IS. No plot,
 * no foreshadow — that rule killed the last two attempts at this section.
 */

type Tile = {
  src: string;
  alt: string;
  tag: string;
  name: string;
  line: string;
  pos?: string;
};

const PEOPLE: Tile[] = [
  {
    src: '/images/char-laura-bust.jpg',
    alt: 'Laura Osei Baako',
    tag: 'Founder',
    name: 'Laura Osei Baako',
    line: 'She built humanity’s path to the stars — then received a death threat on opening night.',
    pos: '50% 40%',
  },
  {
    src: '/images/char-maximus.jpg',
    alt: 'Maximus Boateng',
    tag: 'Mission Director',
    name: 'Maximus Boateng',
    line: 'He carries the responsibility of bringing every crew home.',
    pos: '50% 22%',
  },
  {
    src: '/images/char-mam.jpg',
    alt: 'Menaye Ama Mensah',
    tag: 'Physics student',
    name: 'Menaye Ama Mensah',
    line: 'A physics student about to be pulled into a conflict larger than Earth.',
    pos: '50% 24%',
  },
];

const ASPECTS: Tile[] = [
  {
    src: '/images/baobab-hq.jpg',
    alt: 'The Baobab at golden hour',
    tag: 'Headquarters',
    name: 'The Baobab',
    line: 'Explorer 233’s home on the eastern edge of Accra.',
  },
  {
    src: '/images/nipa-nsa.jpg',
    alt: 'The Nipa Nsa in its assembly chamber',
    tag: 'Flagship',
    name: 'Nipa Nsa',
    line: 'The first ship built in Africa for travel beyond the Solar System.',
  },
  {
    src: '/images/scene-mars.jpg',
    alt: 'A signal resolving on the Mars settlement displays',
    tag: 'The era',
    name: 'The Signal Age',
    line: 'The years since the stars started answering.',
  },
];

function WorldTile({ t, ratio }: { t: Tile; ratio: string }) {
  return (
    <Link href="/world" className="world-tile group block">
      <div className="relative w-full overflow-hidden rounded-lg" style={{ aspectRatio: ratio }}>
        <Image
          src={t.src}
          alt={t.alt}
          fill
          sizes="(max-width: 640px) 92vw, 31vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          style={{ objectPosition: t.pos ?? '50% 50%' }}
        />
        {/* Scrim carries the label. Strong enough to hold small caps over
            golden-hour concrete and a white hull, not so strong it kills the
            art in the top two-thirds. */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, rgba(5,7,11,0.92) 0%, rgba(5,7,11,0.55) 28%, transparent 62%)',
          }}
        />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="eyebrow" style={{ color: 'var(--mission-gold)' }}>
            {t.tag}
          </p>
          <p
            className="font-display mt-1.5"
            style={{
              fontSize: 'var(--step-1)',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              color: 'var(--star-white)',
            }}
          >
            {t.name}
          </p>
        </div>
      </div>
      <p
        className="font-body mt-3"
        style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--lunar-silver)', maxWidth: '34ch' }}
      >
        {t.line}
      </p>
    </Link>
  );
}

export default function TheWorld() {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="relative" style={{ paddingBlock: 'clamp(5rem, 12vh, 8rem)' }}>
      <div className="chapter-shell relative z-10">
        <div className="max-w-[42rem]">
          <h2
            data-reveal
            className="section-title balance"
            style={{
              opacity: 0,
            }}
          >
            Meet the people who choose to answer — and those determined to stop them.
          </h2>
          <p
            data-reveal
            data-reveal-delay="0.05"
            className="section-lede mt-5"
            style={{ opacity: 0 }}
          >
            Meet the characters, factions, ships and places behind the mission. Every entry
            begins plainly, with deeper archive material when you want it.
          </p>
        </div>

        <ul className="mt-12 md:mt-14 grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-7">
          {PEOPLE.map((t, i) => (
            <li key={t.name} data-reveal data-reveal-delay={(0.05 * i).toFixed(2)} style={{ opacity: 0 }}>
              <WorldTile t={t} ratio="3 / 4" />
            </li>
          ))}
        </ul>

        <ul className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-7">
          {ASPECTS.map((t, i) => (
            <li key={t.name} data-reveal data-reveal-delay={(0.05 * i).toFixed(2)} style={{ opacity: 0 }}>
              <WorldTile t={t} ratio="16 / 10" />
            </li>
          ))}
        </ul>

        <Link href="/world" className="link-arrow mt-12 inline-flex" data-reveal style={{ opacity: 0 }}>
          Enter the world
        </Link>
      </div>
    </section>
  );
}
