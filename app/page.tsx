import Departure from './components/hero/Departure';
import TheSignal from './components/sections/TheSignal';
import StoryTeaser from './components/sections/StoryTeaser';
import ExploreDoors from './components/sections/ExploreDoors';
import JoinPartner from './components/sections/JoinPartner';
import Footer from './components/sections/Footer';
import { pageMetadata, SITE_DESCRIPTION } from '../lib/seo';

export const metadata = pageMetadata({
  title: 'Explorer 233 — An African Science-Fiction Saga',
  description: SITE_DESCRIPTION,
  path: '/',
});

/** Homepage journey: enter → understand → read → explore → join. */
export default function Home() {
  return (
    <main>
      <a href="#story-premise" className="skip-link">
        Skip to content
      </a>

      <Departure />

      <TheSignal />

      <StoryTeaser />

      <ExploreDoors />

      <JoinPartner />

      <Footer />
    </main>
  );
}
