import type { Metadata } from 'next';
import PageHeader from '../../components/PageHeader';
import StarSky from '../../components/sections/StarSky';
import Footer from '../../components/sections/Footer';
import { journal } from '../../../content/about';

export const metadata: Metadata = {
  title: 'Journal — Explorer 233',
  description: 'Notes from building Explorer 233. Real voice, not fiction.',
};

export default function JournalPage() {
  return (
    <main>
      <StarSky />

      <PageHeader
        eyebrow="Journal"
        title="Notes from the workbench."
        lede="The one part of this site that is not a world. Real voice, plainly — how Explorer 233 is actually being made."
      />

      <div className="chapter-shell relative z-10" style={{ paddingBlock: 'clamp(3.5rem, 8vh, 6rem)' }}>
        <ul style={{ maxWidth: '38rem' }} className="flex flex-col">
          {journal.map((entry, i) => (
            <li
              key={entry.slug}
              id={entry.slug}
              style={{
                borderTop: '1px solid rgba(174,183,194,0.16)',
                paddingTop: 'clamp(2rem, 5vh, 3rem)',
                marginTop: i === 0 ? 0 : 'clamp(2.5rem, 6vh, 4rem)',
              }}
            >
              <article>
                <time
                  dateTime={entry.date}
                  className="eyebrow"
                  style={{ color: 'var(--lunar-silver)', opacity: 0.65 }}
                >
                  {entry.dateLabel}
                </time>
                <h2
                  className="font-display font-light mt-3"
                  style={{ fontSize: 'var(--step-2)', letterSpacing: '-0.02em', color: 'var(--star-white)' }}
                >
                  {entry.title}
                </h2>
                <p
                  className="font-body mt-2"
                  style={{ fontSize: 'var(--step-0)', color: 'var(--mission-gold)' }}
                >
                  {entry.standfirst}
                </p>
                {entry.paragraphs.map((p, pi) => (
                  <p
                    key={pi}
                    className="font-body"
                    style={{
                      fontSize: 'var(--step-1)',
                      lineHeight: 1.85,
                      color: 'rgba(245,247,250,0.86)',
                      marginTop: pi === 0 ? '1.75rem' : '1.35em',
                    }}
                  >
                    {p}
                  </p>
                ))}
              </article>
            </li>
          ))}
        </ul>
      </div>

      <Footer />
    </main>
  );
}
