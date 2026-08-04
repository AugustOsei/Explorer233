import type { Metadata } from 'next';
import Image from 'next/image';
import Footer from '../components/sections/Footer';
import StoreClient from './StoreClient';
import styles from './store.module.css';

export const metadata: Metadata = {
  title: 'Official Merchandise — Explorer 233',
  description:
    'Shop official Explorer 233 apparel. International orders are fulfilled by Colourfro; Ghana orders are produced and delivered locally by RUD Clothing.',
};

export default function StorePage() {
  return (
    <main className={styles.page}>
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
