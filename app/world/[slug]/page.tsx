import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Footer from '../../components/sections/Footer';
import { WORLD_CARDS, categoryLabel } from '../../../content/world-gallery';
import { pageMetadata, SITE_URL } from '../../../lib/seo';
import styles from './world-entry.module.css';

type WorldEntryProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return WORLD_CARDS.map((card) => ({ slug: card.id }));
}

export async function generateMetadata({ params }: WorldEntryProps): Promise<Metadata> {
  const { slug } = await params;
  const card = WORLD_CARDS.find((entry) => entry.id === slug);
  if (!card) return {};

  return pageMetadata({
    title: `${card.title} — Explorer 233 World Gallery`,
    description: card.bio,
    path: `/world/${card.id}`,
    image: card.image,
    imageAlt: card.alt,
  });
}

export default async function WorldEntryPage({ params }: WorldEntryProps) {
  const { slug } = await params;
  const card = WORLD_CARDS.find((entry) => entry.id === slug);
  if (!card) notFound();

  const pageUrl = `${SITE_URL}/world/${card.id}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': pageUrl,
        url: pageUrl,
        name: `${card.title} — Explorer 233`,
        description: card.bio,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        mainEntity: { '@id': `${pageUrl}#entity` },
      },
      {
        '@type': 'Thing',
        '@id': `${pageUrl}#entity`,
        name: card.title,
        description: card.bio,
        image: card.gallery.map((art) => `${SITE_URL}${art.src}`),
        additionalType: categoryLabel(card.category),
        isPartOf: {
          '@type': 'CreativeWorkSeries',
          '@id': `${SITE_URL}/#story-world`,
          name: 'Explorer 233',
          url: SITE_URL,
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'World Gallery', item: `${SITE_URL}/world` },
          { '@type': 'ListItem', position: 3, name: card.title, item: pageUrl },
        ],
      },
    ],
  };

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className={styles.hero}>
        <div className={styles.art}>
          <Image
            src={card.image}
            alt={card.alt}
            fill
            sizes="(max-width: 800px) 100vw, 58vw"
            preload
            style={{ objectPosition: card.position ?? '50% 50%' }}
          />
        </div>
        <div className={styles.copy}>
          <Link href="/world" className={styles.back}>← World Gallery</Link>
          <p className={styles.kicker}>{categoryLabel(card.category)} · Explorer 233</p>
          <h1>{card.title}</h1>
          <p className={styles.role}>{card.role}</p>
          <p className={styles.bio}>{card.bio}</p>
          {card.category === 'promotional' && card.id === 'grand-opening' ? (
            <Link href="/story" className={styles.action}>Read Dispatch One <span aria-hidden="true">→</span></Link>
          ) : null}
        </div>
      </header>

      {card.gallery.length > 1 ? (
        <section className={styles.gallery} aria-labelledby="artwork-title">
          <div className={styles.sectionHead}>
            <p className={styles.kicker}>Artwork set</p>
            <h2 id="artwork-title">More views of {card.title}</h2>
          </div>
          <div className={styles.grid}>
            {card.gallery.map((art) => (
              <figure key={`${art.src}-${art.label}`}>
                <span>
                  <Image
                    src={art.src}
                    alt={`${card.title} — ${art.label}`}
                    fill
                    sizes="(max-width: 700px) 88vw, 31vw"
                    style={{ objectFit: art.fit ?? 'cover', objectPosition: art.position ?? '50% 50%' }}
                  />
                </span>
                <figcaption>{art.label}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      <nav className={styles.next} aria-label="Continue exploring">
        <Link href="/world">Browse the full gallery <span aria-hidden="true">→</span></Link>
      </nav>
      <Footer />
    </main>
  );
}
