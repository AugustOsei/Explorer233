import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '../components/sections/Footer';
import DispatchCountdown from '../components/sections/DispatchCountdown';
import StoryBody from './StoryBody';
import StoryEntry from './StoryEntry';
import { dispatchSE101 as d, nextDispatch } from '../../content/dispatch-se1-01';

export const metadata: Metadata = {
  title: `Dispatch ${d.code}: ${d.title} — Explorer 233`,
  description: `${d.setting}. The first message from another star was discovered because Dr. Amara Nkrumah wanted tea.`,
};

const WORDS = d.scenes.reduce((n, s) => n + s.paragraphs.join(' ').split(/\s+/).length, 0);
const MINUTES = Math.max(1, Math.round(WORDS / 220));

export default function StoryPage() {
  return (
    <main className="story-page">
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
