import type { Metadata } from 'next';
import StarSky from '../components/sections/StarSky';
import Footer from '../components/sections/Footer';
import DossierRoster from './DossierRoster';
import DayZeroWatch from './DayZeroWatch';
import { AGENCY, OPPOSITION } from '../../content/personnel';

export const metadata: Metadata = {
  title: 'The World — Explorer 233',
  description:
    'Personnel files: Laura Osei Baako, Maximus Boateng, Menaye Ama Mensah — and the people who want the whole thing stopped.',
};

const FACILITIES = [
  {
    name: 'The Baobab',
    where: 'Accra, Ghana',
    line: 'Headquarters. Pale concrete, warm wood and shaded glass curved around courtyards and young trees. Adinkra geometry runs through the facade without becoming decoration. It looks less like a machine than something planted.',
  },
  {
    name: 'Explorer Coastal Launch Complex',
    where: 'Western Region, Ghana',
    line: 'The ECLC — where the agency meets the Atlantic, and where everything leaving Ghana for orbit begins its count.',
  },
  {
    name: 'Nipa Nsa',
    where: 'EX-233-001',
    line: 'Broad through the centre, reinforced spine, rotating habitat sections, smaller craft locked beneath the hull. Assembled in orbit. It will never land on a planet.',
  },
];

export default function WorldPage() {
  return (
    <main>
      <StarSky />

      {/* Masthead */}
      <header className="chapter-shell page-top relative z-10">
        <p className="eyebrow" style={{ color: 'var(--mission-gold)' }}>
          The World · Personnel
        </p>
        <h1
          className="font-display font-light mt-4 balance"
          style={{
            fontSize: 'var(--step-4)',
            lineHeight: 1.02,
            letterSpacing: '-0.03em',
            color: 'var(--star-white)',
            maxWidth: '16ch',
          }}
        >
          Someone has to be first.
        </h1>
        <p
          className="font-body mt-6"
          style={{ fontSize: 'var(--step-1)', lineHeight: 1.6, color: 'var(--lunar-silver)', maxWidth: '54ch' }}
        >
          Explorer 233 is a private Ghanaian space agency. These are the people carrying it — and
          the people who intend to stop them.
        </p>
      </header>

      {/* Agency files */}
      <section className="chapter-shell relative z-10" style={{ paddingBlock: 'clamp(3rem, 8vh, 5rem)' }}>
        <DossierRoster records={AGENCY} />
      </section>

      {/* The turn */}
      <section className="dz-section relative z-10">
        <div className="chapter-shell">
          <div className="dz-grid">
            <DayZeroWatch />

            <div>
              <p className="eyebrow" style={{ color: 'var(--earth-red-clay)' }}>
                Opposition
              </p>
              <h2
                className="font-display font-light mt-3 balance"
                style={{
                  fontSize: 'var(--step-3)',
                  lineHeight: 1.12,
                  letterSpacing: '-0.02em',
                  color: 'var(--star-white)',
                }}
              >
                Not everyone wants the door opened.
              </h2>
              <p
                className="font-body mt-5"
                style={{ fontSize: 'var(--step-0)', lineHeight: 1.8, color: 'var(--lunar-silver)', maxWidth: '46ch' }}
              >
                They wear black cloth and one white zero. They believe humanity has already gone too
                far, and that the correction has to come before we carry ourselves any further out.
              </p>
              <p
                className="font-body mt-4"
                style={{
                  fontSize: '13px',
                  lineHeight: 1.7,
                  color: 'var(--lunar-silver)',
                  opacity: 0.62,
                  maxWidth: '46ch',
                }}
              >
                Move closer, and it will look back at you.
              </p>
            </div>
          </div>

          <div style={{ marginTop: 'clamp(3rem, 7vh, 5rem)' }}>
            <DossierRoster records={OPPOSITION} />
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="relative z-10" style={{ paddingBlock: 'clamp(3rem, 8vh, 6rem)' }}>
        <div className="chapter-shell">
          <p className="eyebrow" style={{ color: 'var(--mission-gold)' }}>
            Facilities &amp; assets
          </p>
          <ul className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {FACILITIES.map((f) => (
              <li key={f.name} style={{ borderTop: '1px solid rgba(174,183,194,0.16)', paddingTop: '1.5rem' }}>
                <h3 className="font-display" style={{ fontSize: 'var(--step-1)', color: 'var(--star-white)' }}>
                  {f.name}
                </h3>
                <p className="eyebrow mt-2 tabnum" style={{ color: 'var(--lunar-silver)', opacity: 0.7 }}>
                  {f.where}
                </p>
                <p
                  className="font-body mt-4"
                  style={{ fontSize: 'var(--step-0)', lineHeight: 1.7, color: 'var(--lunar-silver)' }}
                >
                  {f.line}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Footer />
    </main>
  );
}
