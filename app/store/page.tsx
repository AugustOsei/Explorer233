import Image from 'next/image';
import Footer from '../components/sections/Footer';
import StoreClient from './StoreClient';
import styles from './store.module.css';
import { pageMetadata, SITE_URL } from '../../lib/seo';
import { products } from '../../content/store';

export const metadata = pageMetadata({
  title: 'Official Merchandise — Explorer 233',
  description:
    'Shop official Explorer 233 apparel. International orders are fulfilled by Colourfro; Ghana orders are produced and delivered locally by RUD Clothing.',
  path: '/store',
  image: '/images/store/classic-tee-black.jpg',
  imageAlt: 'Black Explorer 233 classic T-shirt',
  imageWidth: 1200,
  imageHeight: 1200,
});

export default function StorePage() {
  const storeJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE_URL}/store`,
    name: 'Official Explorer 233 Merchandise',
    description: 'Official Explorer 233 apparel and accessories for Ghana and international buyers.',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: products.length,
      itemListElement: products.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: product.name,
        url: `${SITE_URL}/store/${product.id}`,
      })),
    },
  };

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(storeJsonLd) }} />
      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>Official merchandise</p>
          <h1>Wear the universe.</h1>
          <p className={styles.heroLede}>
            Apparel from Explorer 233, fulfilled worldwide by Colourfro and produced locally in Ghana by RUD Clothing.
          </p>
          <a href="#collection" className={styles.heroLink}>
            Shop the collection
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="M4 10h11M11 5l5 5-5 5" />
            </svg>
          </a>
        </div>

        <div className={styles.heroMerch} aria-label="Selected Explorer 233 merchandise">
          <figure className={styles.heroPrimaryProduct}>
            <Image
              src="/images/store/classic-tee-black.jpg"
              alt="Black Explorer 233 classic tee"
              fill
              sizes="(max-width: 800px) 72vw, 38vw"
              priority
            />
          </figure>
          <figure className={styles.heroSecondaryProduct}>
            <Image
              src="/images/store/explorer-yellow.jpg"
              alt="Yellow Explorer 233 orbit tee"
              fill
              sizes="(max-width: 800px) 42vw, 22vw"
              priority
            />
          </figure>
          <p className={styles.heroEdition}>Explorer 233<br />Collection 01</p>
        </div>
      </header>

      <StoreClient />

      <Footer />
    </main>
  );
}
