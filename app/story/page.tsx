import type { Metadata } from 'next';
import Image from 'next/image';
import PageHeader from '../components/PageHeader';
import StarSky from '../components/sections/StarSky';
import Footer from '../components/sections/Footer';
import { dispatchSE101 as d } from '../../content/dispatch-se1-01';

export const metadata: Metadata = {
  title: 'The Story — Explorer 233',
  description: `Dispatch ${d.code}: ${d.title}. ${d.setting}.`,
};

export default function StoryPage() {
  return (
    <main>
      <StarSky />

      <PageHeader eyebrow={`Dispatch ${d.code} · ${d.season}`} title={d.title} />

      {/* Masthead strip — the dispatch "template" header */}
      <div className="chapter-shell relative z-10 mt-10">
        <dl
          className="grid grid-cols-2 md:grid-cols-3 gap-6"
          style={{ borderTop: '1px solid rgba(174,183,194,0.16)', borderBottom: '1px solid rgba(174,183,194,0.16)', paddingBlock: '1.25rem' }}
        >
          {[
            ['Dispatch', d.code],
            ['Setting', d.setting],
            ['Status', d.status],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="eyebrow" style={{ color: 'var(--lunar-silver)', opacity: 0.6 }}>
                {k}
              </dt>
              <dd className="font-body mt-2" style={{ fontSize: '13.5px', color: 'var(--star-white)' }}>
                {v}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Plate */}
      <div className="chapter-shell relative z-10 mt-12">
        <div className="relative w-full overflow-hidden rounded-lg" style={{ aspectRatio: '16 / 9' }}>
          <Image
            src="/images/baobab-hq.jpg"
            alt="The Baobab at golden hour on commissioning day"
            fill
            sizes="(max-width: 900px) 92vw, 78rem"
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Body — measure-constrained reading column */}
      <article className="chapter-shell relative z-10" style={{ paddingBlock: 'clamp(3.5rem, 8vh, 6rem)' }}>
        <div style={{ maxWidth: '38rem', marginInline: 'auto' }}>
          {d.scenes.map((scene, si) => (
            <section key={scene.id}>
              {si > 0 && (
                <div
                  aria-hidden
                  className="mx-auto"
                  style={{ width: '56px', height: '1px', background: 'var(--mission-gold)', opacity: 0.4, marginBlock: 'clamp(2.5rem, 6vh, 4rem)' }}
                />
              )}

              {scene.heading && (
                <div style={{ marginBottom: '2rem' }}>
                  <h2 className="eyebrow" style={{ color: 'var(--mission-gold)' }}>
                    {scene.heading}
                  </h2>
                  {scene.sub && (
                    <p className="font-display mt-1" style={{ fontSize: '13px', color: 'var(--lunar-silver)', letterSpacing: '0.14em' }}>
                      {scene.sub}
                    </p>
                  )}
                </div>
              )}
              {scene.paragraphs.map((p, pi) => (
                <p
                  key={pi}
                  className="font-body"
                  style={{
                    fontSize: 'var(--step-1)',
                    lineHeight: 1.85,
                    color: 'rgba(245,247,250,0.86)',
                    marginTop: pi === 0 ? 0 : '1.35em',
                  }}
                >
                  {p}
                </p>
              ))}
            </section>
          ))}

          <p
            className="eyebrow text-center"
            style={{ color: 'var(--mission-gold)', marginTop: 'clamp(3rem, 7vh, 5rem)' }}
          >
            Dispatch {d.code} continues
          </p>
        </div>
      </article>

      <Footer />
    </main>
  );
}
