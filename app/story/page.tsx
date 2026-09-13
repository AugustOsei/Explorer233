import Image from 'next/image';
import Link from 'next/link';
import Footer from '../components/sections/Footer';
import { publishedDispatches } from '../../content/dispatches';
import { pageMetadata } from '../../lib/seo';

const latest = publishedDispatches[0];
const first = publishedDispatches[publishedDispatches.length - 1];

export const metadata = pageMetadata({
  title: 'The Story — Explorer 233',
  description: 'Read Explorer 233 from the beginning or enter the latest dispatch, Day Zero.',
  path: '/story',
  image: latest.cover,
  imageAlt: latest.coverAlt,
  imageWidth: latest.imageWidth,
  imageHeight: latest.imageHeight,
});

export default function StoryPage() {
  return (
    <main className="story-index-page">
      <section className="story-index-hero">
        <Image src={latest.cover} alt={latest.coverAlt} fill sizes="100vw" preload className="story-index-hero-image object-cover" />
        <div className="story-index-hero-scrim" aria-hidden />
        <div className="chapter-shell story-index-hero-content">
          <div className="story-index-hero-copy">
            <p className="story-cover-kicker">Available now · {latest.dispatch.season}</p>
            <h1>{latest.dispatch.title}</h1>
            <p>{latest.synopsis}</p>
            <div className="story-index-actions">
              <Link href={`/story/${latest.slug}`} className="btn-join">Read Dispatch Two <span aria-hidden>→</span></Link>
              <Link href={`/story/${first.slug}`} className="story-index-start-link">New here? Start with Dispatch One</Link>
            </div>
            <Link href="/story/dispatch-two#recap" className="story-index-recap-link">Already read Dispatch One? Read the 60-second recap</Link>
          </div>
        </div>
      </section>

      <section id="dispatches" className="story-archive">
        <div className="chapter-shell">
          <div className="story-archive-heading">
            <div>
              <p className="eyebrow">The story</p>
              <h2>Start with Dispatch One.<br />Continue with Dispatch Two.</h2>
            </div>
            <p>New to Explorer 233? Begin with The Grand Opening. Already caught up? Read the newest chapter, Day Zero.</p>
          </div>

          <div className="story-archive-grid">
            {[...publishedDispatches].reverse().map((entry, index) => {
              const words = entry.dispatch.scenes.reduce((total, scene) => total + scene.paragraphs.join(' ').split(/\s+/).length, 0);
              const minutes = Math.max(1, Math.round(words / 220));
              return (
                <article key={entry.slug} className="story-archive-card">
                  <Link href={`/story/${entry.slug}`} className="story-archive-art" aria-label={`Read ${entry.dispatch.season}: ${entry.dispatch.title}`}>
                    <Image src={entry.cover} alt="" fill sizes="(max-width: 760px) 100vw, 50vw" className="object-cover" />
                    <span className="story-archive-number tabnum">{String(index + 1).padStart(2, '0')}</span>
                  </Link>
                  <div className="story-archive-copy">
                    <p>{entry.dispatch.season} · {entry.dispatch.code}</p>
                    <h3><Link href={`/story/${entry.slug}`}>{entry.dispatch.title}</Link></h3>
                    <p className="story-archive-synopsis">{entry.synopsis}</p>
                    <div className="story-archive-meta">
                      <span>{minutes} min read</span>
                      <Link href={`/story/${entry.slug}`}>Read free <span aria-hidden>→</span></Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
