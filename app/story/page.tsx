import Image from 'next/image';
import Link from 'next/link';
import Footer from '../components/sections/Footer';
import DispatchCountdown from '../components/sections/DispatchCountdown';
import StoryBody from './StoryBody';
import StoryEntry from './StoryEntry';
import { dispatchSE101 as d, nextDispatch } from '../../content/dispatch-se1-01';
import { pageMetadata, SITE_URL } from '../../lib/seo';

export const metadata = pageMetadata({
  title: `Dispatch ${d.code}: ${d.title} — Explorer 233`,
  description: `${d.setting}. The first message from another star was discovered because Dr. Amara Nkrumah wanted tea.`,
  path: '/story',
  image: '/images/dispatch-one-wide.png',
  imageAlt: 'Explorer 233 Dispatch One artwork',
  imageWidth: 1672,
  imageHeight: 941,
  type: 'article',
  publishedTime: '2026-08-03',
});

const WORDS = d.scenes.reduce((n, s) => n + s.paragraphs.join(' ').split(/\s+/).length, 0);
const MINUTES = Math.max(1, Math.round(WORDS / 220));

const storyJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ShortStory',
  '@id': `${SITE_URL}/story#dispatch-one`,
  url: `${SITE_URL}/story`,
  name: `${d.code}: ${d.title}`,
  headline: d.title,
  description: 'Explorer 233 unveils its first interstellar ship in Accra. Before the night is over, someone promises to kill one of its scientists.',
  image: `${SITE_URL}/images/dispatch-one-wide.png`,
  inLanguage: 'en',
  datePublished: '2026-08-03',
  isAccessibleForFree: true,
  author: { '@id': `${SITE_URL}/#august-peekay` },
  publisher: { '@id': `${SITE_URL}/#organization` },
  isPartOf: { '@type': 'CreativeWorkSeries', '@id': `${SITE_URL}/#story-world`, name: 'Explorer 233' },
};

export default function StoryPage() {
  return (
    <main className="story-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(storyJsonLd) }} />
      <header className="story-cover">
        <Image
          src="/images/dispatch-one-wide.png"
          alt="Explorer 233 characters, spacecraft and the Baobab gathered beneath a signal-filled sky"
          fill
          sizes="100vw"
          preload
          className="story-cover-image object-cover"
        />
        <div className="story-cover-scrim" aria-hidden />

        <div className="story-cover-content chapter-shell">
          <div className="story-cover-copy">
            <p className="story-cover-kicker">{d.season} · {d.code}</p>
            <h1>{d.title}</h1>
            <p className="story-cover-synopsis">
              Explorer 233 unveils its first interstellar ship in Accra. Before the night is
              over, someone promises to kill one of its scientists.
            </p>
            <p className="story-cover-meta tabnum">
              {d.setting} · {MINUTES} min read
            </p>
            <StoryEntry firstSceneId={d.scenes[0].id} />
          </div>
        </div>
      </header>

      <StoryBody scenes={d.scenes} title={d.title} code={d.code} />

      <section className="dispatch-end">
        <div className="chapter-shell">
          <div className="dispatch-end-inner">
            <p className="dispatch-end-kicker">End of Dispatch {d.code}</p>
            <h2>The opening is over.<br />The threat has begun.</h2>
            <p className="dispatch-end-teaser">
              The Baobab is sealed. Somewhere in Accra, a twenty-four-hour countdown has already started.
            </p>
            <div className="dispatch-next">
              <span>Next transmission</span>
              <strong>{nextDispatch.code} — {nextDispatch.title}</strong>
            </div>
            <DispatchCountdown />
            <p className="dispatch-end-join">Join Explorer 233 for new dispatches, project news, events and member benefits.</p>
            <Link href="/#join" className="btn-join">Join Explorer 233</Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
