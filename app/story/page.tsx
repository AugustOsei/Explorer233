import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '../components/sections/Footer';
import StoryBody from './StoryBody';
import { dispatchSE101 as d, nextDispatch } from '../../content/dispatch-se1-01';

export const metadata: Metadata = {
  title: `Dispatch ${d.code}: ${d.title} — Explorer 233`,
  description: `${d.setting}. The first message from another star was discovered because Dr. Amara Nkrumah wanted tea.`,
};

const WORDS = d.scenes.reduce((n, s) => n + s.paragraphs.join(' ').split(/\s+/).length, 0);
const MINUTES = Math.max(1, Math.round(WORDS / 220));

export default function StoryPage() {
  return (
    <main style={{ background: 'var(--deep-space-black)' }}>
      {/* Full-bleed opening plate — the cover of the issue */}
      <header className="relative w-full overflow-hidden" style={{ height: 'clamp(26rem, 76vh, 44rem)' }}>
        <Image
          src="/images/baobab-hq.jpg"
          alt="The Baobab at golden hour on commissioning day"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="media-scrim-bottom" aria-hidden />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(5,7,11,0.85) 0%, transparent 45%)' }}
        />

        <div className="absolute inset-x-0 bottom-0 z-[2] pb-12 md:pb-16">
          <div className="chapter-shell">
            <p className="eyebrow" style={{ color: 'var(--mission-gold)' }}>
              {d.season} · Dispatch {d.code}
            </p>
            <h1
              className="font-display font-light mt-4 balance"
              style={{
                fontSize: 'var(--step-4)',
                lineHeight: 1.02,
                letterSpacing: '-0.03em',
                color: 'var(--star-white)',
              }}
            >
              {d.title}
            </h1>
            <p
              className="font-body mt-5 tabnum"
              style={{
                fontSize: '11.5px',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--lunar-silver)',
              }}
            >
              {d.setting} · {MINUTES} min read · {d.status}
            </p>
          </div>
        </div>
      </header>

      <StoryBody scenes={d.scenes} title={d.title} code={d.code} />

      {/* End matter */}
      <div className="chapter-shell" style={{ paddingBottom: 'clamp(4rem, 10vh, 7rem)' }}>
        <div
          className="mx-auto text-center"
          style={{
            maxWidth: '36rem',
            borderTop: '1px solid rgba(174,183,194,0.16)',
            paddingTop: 'clamp(2.5rem, 6vh, 4rem)',
          }}
        >
          <p className="eyebrow" style={{ color: 'var(--mission-gold)' }}>
            End of Dispatch {d.code}
          </p>
          <h2
            className="font-display font-light mt-4"
            style={{ fontSize: 'var(--step-2)', letterSpacing: '-0.02em', color: 'var(--star-white)' }}
          >
            {nextDispatch.code} — {nextDispatch.title}
          </h2>
          <p
            className="font-body mt-4"
            style={{ fontSize: 'var(--step-0)', lineHeight: 1.7, color: 'var(--lunar-silver)' }}
          >
            The next dispatch lands soon. Join the mission and it reaches you the moment it does.
          </p>
          <Link href="/#join" className="btn-join mt-8">
            Join the mission
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
