'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useReveal } from '../useReveal';

/**
 * The people of the world — Laura, Maximus, Mam. Three only, by design.
 */

type Character = {
  name: string;
  role: string;
  line: string;
  src: string;
  pos: string;
};

/**
 * Portraits are the approved visual-lock references from the Character Bible,
 * not scene stills — neutral backdrops, consistent framing, canon wardrobe.
 * Maximus's lock ships as a three-panel contact sheet, so his portrait is cut
 * from the front three-quarter panel (clear of the sheet's baked-in caption).
 */
const CHARACTERS: Character[] = [
  {
    name: 'Laura Osei Baako',
    role: 'Founder, Explorer 233',
    line: 'White braids, one red glove, and a refusal to make the future smaller so it fits.',
    src: '/images/char-laura-full.jpg',
    pos: '50% 18%',
  },
  {
    name: 'Maximus Boateng',
    role: 'Mission Director · Second-in-command',
    line: 'Notices who leaves the room, and when. Tells Laura what she does not want to hear.',
    src: '/images/char-maximus.jpg',
    pos: '50% 18%',
  },
  {
    name: 'Menaye Ama Mensah',
    role: 'Physics student, Accra',
    line: 'Eighteen, and already keeping her own count of everything the sky owes her.',
    src: '/images/char-mam.jpg',
    pos: '50% 22%',
  },
];

export default function CharacterRow() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="relative"
      style={{ paddingBlock: 'clamp(5rem, 12vh, 8rem)', background: 'transparent' }}
    >
      <div className="chapter-shell relative z-10">
        <p data-reveal className="eyebrow" style={{ color: 'var(--mission-gold)', opacity: 0 }}>
          The World
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
            maxWidth: '22ch',
            opacity: 0,
          }}
        >
          Someone has to be first.
        </h2>

        <ul className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-8">
          {CHARACTERS.map((c, i) => (
            <li key={c.name} data-reveal data-reveal-delay={String(0.06 * i)} style={{ opacity: 0 }}>
              <article className="character-card">
                <div className="relative w-full overflow-hidden rounded-lg" style={{ aspectRatio: '4 / 5' }}>
                  <Image
                    src={c.src}
                    alt={c.name}
                    fill
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
                    className="object-cover character-card-img"
                    style={{ objectPosition: c.pos }}
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    aria-hidden
                    style={{
                      background:
                        'linear-gradient(to top, rgba(5,7,11,0.88) 0%, rgba(5,7,11,0.25) 42%, transparent 72%)',
                    }}
                  />
                </div>

                <h3
                  className="font-display mt-5"
                  style={{ fontSize: 'var(--step-1)', letterSpacing: '-0.01em', color: 'var(--star-white)' }}
                >
                  {c.name}
                </h3>
                <p className="eyebrow mt-2" style={{ color: 'var(--mission-gold)' }}>
                  {c.role}
                </p>
                <p
                  className="font-body mt-3"
                  style={{ fontSize: 'var(--step-0)', lineHeight: 1.65, color: 'var(--lunar-silver)' }}
                >
                  {c.line}
                </p>
              </article>
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
