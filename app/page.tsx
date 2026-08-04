import Departure from './components/hero/Departure';
import TheSignal from './components/sections/TheSignal';
import StoryTeaser from './components/sections/StoryTeaser';
import ExploreDoors from './components/sections/ExploreDoors';
import BeyondDispatches from './components/sections/BeyondDispatches';
import JoinPartner from './components/sections/JoinPartner';
import Footer from './components/sections/Footer';
import { pageMetadata, SITE_DESCRIPTION, SITE_URL } from '../lib/seo';

export const metadata = pageMetadata({
  title: 'Explorer 233 — An African Science-Fiction Saga',
  description: SITE_DESCRIPTION,
  path: '/',
});

/** Homepage journey: enter → understand → read → explore → join. */
export default function Home() {
  const homeJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': SITE_URL,
    url: SITE_URL,
    name: 'Explorer 233 — An African Science-Fiction Saga',
    description: SITE_DESCRIPTION,
    inLanguage: 'en',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: {
      '@type': 'CreativeWorkSeries',
      '@id': `${SITE_URL}/#story-world`,
      name: 'Explorer 233',
      genre: ['African science fiction', 'Space opera'],
      creator: { '@id': `${SITE_URL}/#august-peekay` },
    },
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }} />
      <a href="#story-premise" className="skip-link">
        Skip to content
      </a>

      <Departure />

      <TheSignal />

      <StoryTeaser />

      <ExploreDoors />

      <BeyondDispatches />

      <JoinPartner />

      <Footer />
    </main>
  );
}
