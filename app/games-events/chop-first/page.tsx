import Image from 'next/image';
import Link from 'next/link';
import Footer from '../../components/sections/Footer';
import { pageMetadata, SITE_URL } from '../../../lib/seo';
import styles from './chop-first.module.css';

const GAME_URL = 'https://chop-first.vercel.app/';

export const metadata = pageMetadata({
  title: 'Chop First — Free Browser Racing Game | Explorer 233',
  description: 'Play Chop First, a free browser racing game with mountain, Accra and orbital circuits, four cars, time challenges and the live rival Ananse.',
  path: '/games-events/chop-first',
  image: '/images/games/chop-first/cover-orbital.jpg',
  imageAlt: 'A neon orbital racing circuit in Chop First',
  imageWidth: 1376,
  imageHeight: 768,
});

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'VideoGame',
      '@id': `${SITE_URL}/games-events/chop-first#game`,
      name: 'Chop First',
      description: 'A free browser racing game with mountain, Accra and orbital circuits, four cars, time challenges and the live rival Ananse.',
      url: `${SITE_URL}/games-events/chop-first`,
      gamePlatform: 'Web browser',
      applicationCategory: 'Game',
      genre: ['Racing', 'Arcade'],
      playMode: ['SinglePlayer', 'MultiPlayer'],
      isAccessibleForFree: true,
      image: [
        `${SITE_URL}/images/games/chop-first/cover.jpg`,
        `${SITE_URL}/images/games/chop-first/cover-accra.jpg`,
        `${SITE_URL}/images/games/chop-first/cover-orbital.jpg`,
      ],
      publisher: { '@id': `${SITE_URL}/#organization` },
      potentialAction: { '@type': 'PlayAction', target: GAME_URL },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Games & Events', item: `${SITE_URL}/games-events` },
        { '@type': 'ListItem', position: 3, name: 'Chop First', item: `${SITE_URL}/games-events/chop-first` },
      ],
    },
  ],
};

export default function ChopFirstPage() {
  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className={styles.hero}>
        <Image
          src="/images/games/chop-first/cover-orbital.jpg"
          alt="A neon highway winding through orbit in Chop First"
          fill
          sizes="100vw"
          preload
        />
        <div className={styles.scrim} aria-hidden="true" />
        <div className={styles.heroContent}>
          <Link href="/games-events" className={styles.back}>← Games &amp; Events</Link>
          <p>Free browser racing</p>
          <h1>Chop First</h1>
          <span>Mountain roads. Accra streets. An orbital highway.</span>
          <a href={GAME_URL} target="_blank" rel="noopener noreferrer">Play now <span aria-hidden="true">↗</span></a>
        </div>
      </header>

      <section className={styles.intro}>
        <div>
          <p className={styles.kicker}>The game</p>
          <h2>Three circuits.<br />Four cars.<br />One loud rival.</h2>
        </div>
        <div className={styles.copy}>
          <p>Drift a mountain road, street-race through Accra or fly a neon highway in orbit. Challenge a friend&apos;s time or race Ananse, a live rival who talks the entire way.</p>
          <dl>
            <div><dt>Access</dt><dd>Free · no installation</dd></div>
            <div><dt>Platform</dt><dd>Desktop web browser</dd></div>
            <div><dt>Modes</dt><dd>Time challenge · rival race</dd></div>
          </dl>
        </div>
      </section>

      <section className={styles.circuits} aria-labelledby="circuits-title">
        <div className={styles.circuitHead}>
          <p className={styles.kicker}>Choose a circuit</p>
          <h2 id="circuits-title">Every road changes the race.</h2>
        </div>
        <div className={styles.grid}>
          {[
            ['/images/games/chop-first/cover.jpg', 'Mountain Drift', 'Technical bends at sunset.'],
            ['/images/games/chop-first/cover-accra.jpg', 'Accra City Run', 'Speed through the city after dark.'],
            ['/images/games/chop-first/cover-orbital.jpg', 'Orbital Highway', 'Leave the ground and chase the lights.'],
          ].map(([src, title, body]) => (
            <article key={title}>
              <span><Image src={src} alt={`${title} circuit in Chop First`} fill sizes="(max-width: 760px) 90vw, 32vw" /></span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <div className={styles.finalCta}>
        <p>Ready when you are.</p>
        <a href={GAME_URL} target="_blank" rel="noopener noreferrer">Launch Chop First <span aria-hidden="true">↗</span></a>
      </div>
      <Footer />
    </main>
  );
}
