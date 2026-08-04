import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '../components/sections/Footer';
import styles from './games-events.module.css';

export const metadata: Metadata = {
  title: 'Games & Events — Explorer 233',
  description:
    'Play games created by Explorer 233 and our collaborators, and find online and in-person events we organize or attend.',
};

const GAME_URL = 'https://chop-first.vercel.app/';

const GAME_FACTS = [
  { value: 'Free', label: 'No installation' },
  { value: '3', label: 'Distinct circuits' },
  { value: '4', label: 'Cars to master' },
  { value: '2', label: 'Ways to race' },
];

const EVENT_TYPES = [
  'Online premieres and community sessions',
  'Explorer 233 gatherings and live experiences',
  'Convention, exhibition and partner appearances',
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M11 5l5 5-5 5" />
    </svg>
  );
}

export default function GamesEventsPage() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.shell}>
          <p className={styles.kicker}>Games &amp; Events</p>
          <div className={styles.heroGrid}>
            <h1>Games to play.<br />Events to join.</h1>
            <div className={styles.heroCopy}>
              <p>
                Play games created by Explorer 233 and our collaborators. Find online and in-person events we organize, host or take part in.
              </p>
              <a href="#featured-game" className={styles.textLink}>
                See what is playable now
                <ArrowIcon />
              </a>
            </div>
          </div>
        </div>
      </header>

      <section id="featured-game" className={styles.gameSection} aria-labelledby="featured-game-title">
        <div className={styles.shell}>
          <div className={styles.sectionIntro}>
            <div>
              <p className={styles.kicker}>Featured now</p>
              <h2 id="featured-game-title">Start with Chop First</h2>
            </div>
            <p>One game is live now. More experiences will follow.</p>
          </div>

          <article className={styles.gameFeature}>
            <div className={styles.gameMedia}>
              <figure className={styles.primaryArt}>
                <Image
                  src="/images/games/chop-first/cover.jpg"
                  alt="A red sports car drifting through a mountain circuit at sunset in Chop First"
                  fill
                  sizes="(max-width: 900px) 100vw, 66vw"
                  priority
                />
              </figure>
              <figure className={styles.secondaryArt}>
                <Image
                  src="/images/games/chop-first/cover-accra.jpg"
                  alt="A racing circuit running through the streets of Accra in Chop First"
                  fill
                  sizes="(max-width: 900px) 50vw, 34vw"
                />
                <figcaption>Accra City Run</figcaption>
              </figure>
              <figure className={styles.secondaryArt}>
                <Image
                  src="/images/games/chop-first/cover-orbital.jpg"
                  alt="A neon highway winding through orbit in Chop First"
                  fill
                  sizes="(max-width: 900px) 50vw, 34vw"
                />
                <figcaption>Orbital Highway</figcaption>
              </figure>
              <div className={styles.liveBadge}>
                <span aria-hidden="true" />
                Playable now
              </div>
            </div>

            <div className={styles.gameContent}>
              <div className={styles.gamePitch}>
                <p className={styles.gameType}>Free browser racing</p>
                <h3>
                  <span>Chop</span> First
                </h3>
                <p className={styles.gameDescription}>
                  Drift a mountain road, street-race through Accra or fly a neon highway in orbit. Challenge a friend&apos;s time or race Ananse, a live rival who talks the entire way.
                </p>
                <div className={styles.gameActions}>
                  <a href={GAME_URL} target="_blank" rel="noopener noreferrer" className={styles.primaryButton}>
                    Play now
                    <ArrowIcon />
                  </a>
                  <a href={GAME_URL} target="_blank" rel="noopener noreferrer" className={styles.secondaryButton}>
                    Explore the game
                  </a>
                </div>
                <p className={styles.externalNote}>Opens the game in a new tab</p>
              </div>

              <dl className={styles.gameFacts}>
                {GAME_FACTS.map((fact) => (
                  <div key={fact.label}>
                    <dt>{fact.value}</dt>
                    <dd>{fact.label}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </article>
        </div>
      </section>

      <section className={styles.eventsSection} aria-labelledby="events-title">
        <div className={styles.shell}>
          <div className={styles.eventsCard}>
            <div className={styles.eventsMain}>
              <p className={styles.kicker}>Upcoming events</p>
              <p className={styles.status}>No dates are currently announced.</p>
              <h2 id="events-title">The calendar is quiet.<br />{' '}It will not stay that way.</h2>
              <p className={styles.eventsCopy}>
                Join Explorer 233 to hear when we host, stream, exhibit or appear—online and in person.
              </p>
              <Link href="/#join" className={styles.primaryButton}>
                Join for announcements
                <ArrowIcon />
              </Link>
            </div>

            <div className={styles.eventTypes}>
              <p>What will appear here</p>
              <ul>
                {EVENT_TYPES.map((eventType, index) => (
                  <li key={eventType}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    {eventType}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.collaboration} aria-labelledby="collaboration-title">
        <div className={styles.shell}>
          <div className={styles.collaborationInner}>
            <div>
              <p className={styles.kicker}>Collaborate</p>
              <h2 id="collaboration-title">Build something with us.</h2>
            </div>
            <div>
              <p>
                We collaborate with game developers, artists, cultural organizations and event producers to create new experiences around Explorer 233.
              </p>
              <a
                href="mailto:hello@explorer233.com?subject=Explorer%20233%20collaboration"
                className={styles.textLink}
              >
                Propose a collaboration
                <ArrowIcon />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
