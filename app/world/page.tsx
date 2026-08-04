import Footer from '../components/sections/Footer';
import WorldGallery from './WorldGallery';
import styles from './world-page.module.css';
import { pageMetadata, SITE_URL } from '../../lib/seo';
import { WORLD_CARDS } from '../../content/world-gallery';

export const metadata = pageMetadata({
  title: 'World Gallery — Explorer 233',
  description: 'Browse collectible artwork cards featuring characters, places and spacecraft from Explorer 233.',
  path: '/world',
  image: '/images/crew-wide.png',
  imageAlt: 'Characters, places and spacecraft from Explorer 233',
  imageWidth: 2000,
  imageHeight: 1116,
});

export default function WorldPage() {
  const galleryJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE_URL}/world`,
    name: 'Explorer 233 World Gallery',
    description: 'A gallery of characters, spacecraft, places and promotional artwork from Explorer 233.',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: WORLD_CARDS.length,
      itemListElement: WORLD_CARDS.map((card, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: card.title,
        url: `${SITE_URL}/world/${card.id}`,
      })),
    },
  };

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(galleryJsonLd) }} />
      <div className={styles.atmosphere} aria-hidden />

      <header className={`${styles.hero} chapter-shell relative z-10`}>
        <p className="eyebrow" style={{ color: 'var(--mission-gold)' }}>
          World Gallery
        </p>
        <h1 className="font-display font-light balance">The Explorer 233 collection.</h1>
        <p className="font-body">
          A growing gallery of characters, spacecraft, places and promotional artwork from the Explorer 233 universe.
        </p>
      </header>

      <section className={`${styles.gallery} chapter-shell relative z-10`} aria-label="Explorer 233 collectible card gallery">
        <WorldGallery />
      </section>

      <Footer />
    </main>
  );
}
