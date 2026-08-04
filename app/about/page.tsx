import Image from 'next/image';
import Link from 'next/link';
import Footer from '../components/sections/Footer';
import { creator, journal } from '../../content/about';
import { pageMetadata, SITE_URL } from '../../lib/seo';
import styles from './about.module.css';

export const metadata = pageMetadata({
  title: 'About Explorer 233 — Creator & Partners',
  description:
    'Meet August Peekay, creator of Explorer 233, and the partners supporting this African science-fiction story IP from Ghana.',
  path: '/about',
  image: '/images/about-hero.jpg',
  imageAlt: 'Characters and spacecraft from the Explorer 233 universe',
  imageWidth: 2000,
  imageHeight: 1116,
});

const REASONS = [
  {
    number: '01',
    title: 'A Ghanaian point of origin',
    body: '233 is Ghana’s international calling code. It anchors the franchise to the place from which it is being imagined.',
  },
  {
    number: '02',
    title: 'A signal meant to travel',
    body: 'The story begins when signals reach humanity from worlds near and far. The name carries that idea of calling and answering.',
  },
  {
    number: '03',
    title: 'One world, many forms',
    body: 'Explorer 233 is designed to expand through fiction, visual art, games, merchandise and experiences without losing one connected story.',
  },
];

const FACTS = [
  {
    question: 'What is Explorer 233?',
    answer: 'Explorer 233 is an African science-fiction story franchise created in Ghana. It follows a Ghanaian-led space exploration company responding to signals from star systems near and far.',
  },
  {
    question: 'Who created Explorer 233?',
    answer: 'Explorer 233 was created by August Peekay, the creator’s pen name.',
  },
  {
    question: 'Where should I begin?',
    answer: 'Begin with Dispatch One, The Grand Opening. It is available to read free on this website.',
  },
  {
    question: 'What does 233 mean?',
    answer: '233 is Ghana’s international calling code. It anchors the franchise to its Ghanaian point of origin and reflects a story about signals, calling and answering.',
  },
];

export default function AboutPage() {
  const aboutJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': `${SITE_URL}/about`,
        name: 'About Explorer 233',
        description: 'About Explorer 233, its creator August Peekay and supporting partners.',
        mainEntity: [{ '@id': `${SITE_URL}/#organization` }, { '@id': `${SITE_URL}/#august-peekay` }],
        isPartOf: { '@id': `${SITE_URL}/#website` },
      },
      {
        '@type': 'CreativeWorkSeries',
        '@id': `${SITE_URL}/#story-world`,
        name: 'Explorer 233',
        creator: { '@id': `${SITE_URL}/#august-peekay` },
        publisher: { '@id': `${SITE_URL}/#organization` },
        countryOfOrigin: { '@type': 'Country', name: 'Ghana' },
        genre: ['African science fiction', 'Space opera'],
        description: creator.intro,
        url: SITE_URL,
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/about#questions`,
        mainEntity: FACTS.map((fact) => ({
          '@type': 'Question',
          name: fact.question,
          acceptedAnswer: { '@type': 'Answer', text: fact.answer },
        })),
      },
    ],
  };

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }} />
      <header className={styles.hero}>
        <div className={styles.heroImage}>
          <Image
            src="/images/about-hero.jpg"
            alt="The Explorer 233 crew and spacecraft beneath a signal-filled sky"
            fill
            sizes="100vw"
            preload
          />
        </div>
        <div className={styles.heroScrim} aria-hidden="true" />
        <div className={`${styles.shell} ${styles.heroContent}`}>
          <p className={styles.kicker}>About Explorer 233</p>
          <h1>A story universe<br />built from Ghana.</h1>
          <p>{creator.intro}</p>
        </div>
      </header>

      <section className={`${styles.creator} ${styles.shell}`} aria-labelledby="creator-title">
        <div className={styles.creatorMark} aria-hidden="true">
          <span>AP</span>
          <small>Accra · 233</small>
        </div>
        <div className={styles.creatorCopy}>
          <p className={styles.kicker}>The creator</p>
          <h2 id="creator-title">{creator.name}</h2>
          <p className={styles.role}>{creator.role}</p>
          {creator.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <Link href="/about/journal" className={styles.arrowLink}>
            Read August’s journal <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <section className={styles.why} aria-labelledby="why-title">
        <div className={styles.shell}>
          <div className={styles.sectionHeading}>
            <p className={styles.kicker}>Why 233</p>
            <h2 id="why-title">The name tells you where the signal begins.</h2>
          </div>
          <div className={styles.reasonGrid}>
            {REASONS.map((reason) => (
              <article key={reason.number}>
                <span>{reason.number}</span>
                <h3>{reason.title}</h3>
                <p>{reason.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.facts} ${styles.shell}`} aria-labelledby="facts-title">
        <div className={styles.sectionHeading}>
          <p className={styles.kicker}>The essentials</p>
          <h2 id="facts-title">Explorer 233, clearly explained.</h2>
        </div>
        <div className={styles.factList}>
          {FACTS.map((fact) => (
            <article key={fact.question}>
              <h3>{fact.question}</h3>
              <p>{fact.answer}</p>
              {fact.question === 'Where should I begin?' ? <Link href="/story">Read Dispatch One →</Link> : null}
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.partners} ${styles.shell}`} aria-labelledby="partners-title">
        <div className={styles.sectionHeading}>
          <p className={styles.kicker}>Supporting partners</p>
          <h2 id="partners-title">The story grows through collaboration.</h2>
          <p>RUD Clothing and TWO Cedi are supporting partners of the Explorer 233 story IP.</p>
        </div>
        <div className={styles.partnerGrid}>
          <article className={styles.partnerCard}>
            <div className={`${styles.partnerLogo} ${styles.rudLogo}`}>
              <Image src="/images/partners/rud.webp" alt="RUD Clothing" fill sizes="(max-width: 700px) 90vw, 40vw" />
            </div>
            <div><h3>RUD Clothing</h3><p>Supporting partner</p></div>
          </article>
          <article className={styles.partnerCard}>
            <div className={`${styles.partnerLogo} ${styles.twoCediLogo}`}>
              <Image src="/images/partners/two-cedi.png" alt="TWO Cedi" fill sizes="(max-width: 700px) 90vw, 40vw" />
            </div>
            <div><h3>TWO Cedi</h3><p>Supporting partner</p></div>
          </article>
        </div>
      </section>

      <section className={styles.collaborate}>
        <div className={`${styles.shell} ${styles.collaborateInner}`}>
          <div>
            <p className={styles.kicker}>Build with us</p>
            <h2>Have something worth building together?</h2>
          </div>
          <div>
            <p>Explorer 233 is open to thoughtful collaborations with artists, developers, publishers, cultural organisations, makers and event partners.</p>
            <a href="mailto:hello@explorer233.com?subject=Explorer%20233%20partnership" className={styles.primaryButton}>
              Propose a partnership <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <section className={`${styles.journalPreview} ${styles.shell}`} aria-labelledby="journal-title">
        <div className={styles.sectionHeading}>
          <p className={styles.kicker}>From the journal</p>
          <h2 id="journal-title">Notes from behind the universe.</h2>
        </div>
        <div className={styles.journalGrid}>
          {journal.map((entry) => (
            <Link key={entry.slug} href={`/about/journal/${entry.slug}`} className={styles.journalCard}>
              <time dateTime={entry.date}>{entry.dateLabel}</time>
              <h3>{entry.title}</h3>
              <p>{entry.standfirst}</p>
              <span>Read note ↗</span>
            </Link>
          ))}
        </div>
        <Link href="/about/journal" className={styles.arrowLink}>View the journal <span aria-hidden="true">→</span></Link>
      </section>

      <Footer />
    </main>
  );
}
