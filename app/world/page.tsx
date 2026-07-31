import type { Metadata } from 'next';
import Image from 'next/image';
import PageHeader from '../components/PageHeader';
import StarSky from '../components/sections/StarSky';
import Footer from '../components/sections/Footer';

export const metadata: Metadata = {
  title: 'The World — Explorer 233',
  description:
    'The people and places of Explorer 233: Laura Osei Baako, Maximus Boateng, Menaye Ama Mensah, and the Baobab in Accra.',
};

const PEOPLE = [
  {
    name: 'Laura Osei Baako',
    role: 'Founder, Explorer 233',
    src: '/images/laura-maximus.jpg',
    pos: '32% 24%',
    body: [
      'White braids framing her face, a plain white shirt beneath a dark jacket, black trousers, glasses, and one black glove. She crosses press lines without slowing.',
      'She founded MellaniumORBIT before she was thirty, sold it for an amount no news channel could agree upon, then came home to Ghana and spent much of that fortune building the Baobab. She is either one of the most important people alive or completely insane — and both may be true.',
      'Her case is not that Ghana should own the stars. No country can. It is that humanity will reach them, and Africa must arrive as a builder, not a passenger.',
    ],
  },
  {
    name: 'Maximus Boateng',
    role: 'Mission Director',
    src: '/images/laura-maximus.jpg',
    pos: '70% 24%',
    body: [
      'Bald, broad-shouldered and bearded, with an earring, dark glasses and a small cowry pendant at his throat. He looks exactly as he does in interviews, except more tired.',
      'He is the person who tells Laura the thing she does not want to hear on the morning she least wants to hear it — and the one who does not flinch when she decides to go ahead anyway. He notices who leaves a room, and when.',
    ],
  },
  {
    name: 'Menaye Ama Mensah',
    role: 'Physics student, Accra',
    src: '/images/char-mam.jpg',
    pos: '50% 28%',
    body: [
      'Eighteen, sharp, and unwilling to let anyone repeat a rumour sloppily in her presence. She has read every public paper Laura has written and argued online with strangers who insist a computer scientist has no business building an interstellar programme.',
      'She is the reason the agency matters. Not the funding, not the facilities — a student in Accra doing her own arithmetic on everything the sky owes her, and deciding to go and collect it herself.',
    ],
  },
];

const PLACES = [
  {
    name: 'The Baobab',
    where: 'Accra, Ghana',
    line: 'Headquarters. Concrete, wood, glass and ambition, spreading like a living trunk into research wings and public halls. Adinkra geometry runs through the facade without ever becoming decoration.',
  },
  {
    name: 'Explorer Coastal Launch Complex',
    where: 'Western Region, Ghana',
    line: 'The ECLC — where the agency meets the Atlantic, and where everything that leaves Ghana for orbit begins its count.',
  },
  {
    name: 'The Moon',
    where: 'Phase One',
    line: 'The first destination, and deliberately not the last. Phase One is the Agency Era: lunar missions, crew selection, and a Mission Control that answers to Accra.',
  },
];

export default function WorldPage() {
  return (
    <main>
      <StarSky />

      <PageHeader
        eyebrow="The World"
        title="Someone has to be first."
        lede="Explorer 233 is a private Ghanaian space agency. These are the people who carry it, and the places it is built from."
      />

      {/* People */}
      <section className="chapter-shell relative z-10" style={{ paddingBlock: 'clamp(4rem, 9vh, 7rem)' }}>
        <ul className="flex flex-col gap-16 md:gap-24">
          {PEOPLE.map((p, i) => (
            <li key={p.name}>
              <article className={`editorial-grid${i % 2 === 1 ? ' editorial-reverse' : ''}`}>
                <div className="relative w-full overflow-hidden rounded-lg" style={{ aspectRatio: '4 / 5' }}>
                  <Image
                    src={p.src}
                    alt={p.name}
                    fill
                    sizes="(max-width: 900px) 92vw, 46vw"
                    className="object-cover"
                    style={{ objectPosition: p.pos }}
                  />
                </div>
                <div>
                  <h2
                    className="font-display font-light"
                    style={{ fontSize: 'var(--step-3)', lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--star-white)' }}
                  >
                    {p.name}
                  </h2>
                  <p className="eyebrow mt-3" style={{ color: 'var(--mission-gold)' }}>
                    {p.role}
                  </p>
                  {p.body.map((para) => (
                    <p
                      key={para.slice(0, 24)}
                      className="font-body mt-5"
                      style={{ fontSize: 'var(--step-0)', lineHeight: 1.8, color: 'var(--lunar-silver)', maxWidth: '52ch' }}
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>

      {/* Places */}
      <section className="relative z-10" style={{ paddingBlock: 'clamp(3rem, 8vh, 6rem)' }}>
        <div className="chapter-shell">
          <p className="eyebrow" style={{ color: 'var(--mission-gold)' }}>
            The mission begins
          </p>
          <ul className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {PLACES.map((place) => (
              <li key={place.name} style={{ borderTop: '1px solid rgba(174,183,194,0.16)', paddingTop: '1.5rem' }}>
                <h3 className="font-display" style={{ fontSize: 'var(--step-1)', color: 'var(--star-white)' }}>
                  {place.name}
                </h3>
                <p className="eyebrow mt-2" style={{ color: 'var(--lunar-silver)', opacity: 0.7 }}>
                  {place.where}
                </p>
                <p
                  className="font-body mt-4"
                  style={{ fontSize: 'var(--step-0)', lineHeight: 1.7, color: 'var(--lunar-silver)' }}
                >
                  {place.line}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Footer />
    </main>
  );
}
