import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '../components/PageHeader';
import StarSky from '../components/sections/StarSky';
import Footer from '../components/sections/Footer';
import { creator } from '../../content/about';

export const metadata: Metadata = {
  title: 'About — Explorer 233',
  description: 'Who is building Explorer 233, and why.',
};

export default function AboutPage() {
  return (
    <main>
      <StarSky />

      <PageHeader eyebrow="Creator(s)" title="Who is building this." lede={creator.intro} />

      <article className="chapter-shell relative z-10" style={{ paddingBlock: 'clamp(3.5rem, 8vh, 6rem)' }}>
        <div style={{ maxWidth: '38rem' }}>
          <p className="eyebrow" style={{ color: 'var(--mission-gold)' }}>
            {creator.name} · {creator.role}
          </p>

          {creator.paragraphs.map((p, i) => (
            <p
              key={i}
              className="font-body"
              style={{
                fontSize: 'var(--step-1)',
                lineHeight: 1.85,
                color: 'rgba(245,247,250,0.86)',
                marginTop: i === 0 ? '2rem' : '1.35em',
              }}
            >
              {p}
            </p>
          ))}

          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4">
            <Link href="/about/journal" className="link-arrow inline-flex">
              Read the journal
            </Link>
            <Link href="/#join" className="link-arrow inline-flex">
              Join the mission
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
