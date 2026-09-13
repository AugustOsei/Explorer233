import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Footer from '../../components/sections/Footer';
import StoryBody from '../StoryBody';
import StoryEntry from '../StoryEntry';
import { dispatchTwoRecap, getDispatch, publishedDispatches } from '../../../content/dispatches';
import { pageMetadata, SITE_URL } from '../../../lib/seo';

type StoryDispatchPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedDispatches.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: StoryDispatchPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getDispatch(slug);
  if (!entry) return {};
  return pageMetadata({
    title: `${entry.dispatch.season}: ${entry.dispatch.title} — Explorer 233`,
    description: entry.synopsis,
    path: `/story/${entry.slug}`,
    image: entry.cover,
    imageAlt: entry.coverAlt,
    imageWidth: entry.imageWidth,
    imageHeight: entry.imageHeight,
    type: 'article',
    publishedTime: entry.publishedTime,
  });
}

export default async function StoryDispatchPage({ params }: StoryDispatchPageProps) {
  const { slug } = await params;
  const entry = getDispatch(slug);
  if (!entry) notFound();

  const d = entry.dispatch;
  const words = d.scenes.reduce((total, scene) => total + scene.paragraphs.join(' ').split(/\s+/).length, 0);
  const minutes = Math.max(1, Math.round(words / 220));
  const related = entry.slug === 'dispatch-one' ? publishedDispatches[0] : publishedDispatches[publishedDispatches.length - 1];
  const relatedLabel = entry.slug === 'dispatch-one' ? 'Continue to Dispatch Two' : 'Read Dispatch One';
  const storyJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ShortStory',
    '@id': `${SITE_URL}/story/${entry.slug}#dispatch`,
    url: `${SITE_URL}/story/${entry.slug}`,
    name: `${d.code}: ${d.title}`,
    headline: d.title,
    description: entry.synopsis,
    image: `${SITE_URL}${entry.cover}`,
    inLanguage: 'en',
    datePublished: entry.publishedTime,
    isAccessibleForFree: true,
    position: entry.slug === 'dispatch-one' ? 1 : 2,
    author: { '@id': `${SITE_URL}/#august-peekay` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    isPartOf: { '@type': 'CreativeWorkSeries', '@id': `${SITE_URL}/#story-world`, name: 'Explorer 233' },
  };

  return (
    <main className="story-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(storyJsonLd) }} />
      <header className="story-cover">
        <Image src={entry.cover} alt={entry.coverAlt} fill sizes="100vw" preload className="story-cover-image object-cover" />
        <div className="story-cover-scrim" aria-hidden />
        <div className="story-cover-content chapter-shell">
          <div className="story-cover-copy">
            <p className="story-cover-kicker">{d.season} · {d.code}</p>
            <h1>{d.title}</h1>
            <p className="story-cover-synopsis">{entry.synopsis}</p>
            <p className="story-cover-meta tabnum">{d.setting} · {minutes} min read</p>
            <StoryEntry firstSceneId={d.scenes[0].id} code={d.code} dispatchLabel={d.season} />
          </div>
        </div>
      </header>

      {entry.slug === 'dispatch-two' && (
        <section id="recap" className="story-recap" aria-labelledby="story-recap-title">
          <div className="chapter-shell story-recap-inner">
            <details open>
              <summary>
                <span>Before Dispatch Two</span>
                <strong id="story-recap-title">Previously on Explorer 233</strong>
                <small>60-second recap</small>
              </summary>
              <div className="story-recap-copy">
                {dispatchTwoRecap.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                <p className="story-recap-close">Dispatch Two follows the police officer Day Zero recruits to help.</p>
              </div>
            </details>
          </div>
        </section>
      )}

      <StoryBody scenes={d.scenes} title={d.title} code={d.code} />

      <section className="dispatch-end">
        <div className="chapter-shell">
          <div className="dispatch-end-inner">
            <p className="dispatch-end-kicker">End of {d.season} · {d.code}</p>
            <h2>{entry.endTitle[0]}<br />{entry.endTitle[1]}</h2>
            <p className="dispatch-end-teaser">{entry.endTeaser}</p>
            <div className="dispatch-end-actions">
              <Link href={`/story/${related.slug}`} className="btn-join">{relatedLabel} <span aria-hidden>→</span></Link>
              <Link href="/story" className="dispatch-archive-link">All dispatches</Link>
            </div>
            <p className="dispatch-end-join">Join Explorer 233 for new dispatches, project news, events and member benefits.</p>
            <Link href="/#join" className="btn-join">Join Explorer 233</Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
