import Link from 'next/link';
import Footer from '../../components/sections/Footer';
import { getReadingTime, journal } from '../../../content/about';
import { pageMetadata } from '../../../lib/seo';
import styles from '../about.module.css';

export const metadata = pageMetadata({
  title: 'Journal — Explorer 233',
  description: 'Notes from August Peekay on creating and building the Explorer 233 science-fiction franchise.',
  path: '/about/journal',
});

export default function JournalPage() {
  return (
    <main className={styles.page}>
      <header className={`${styles.journalHero} ${styles.shell}`}>
        <p className={styles.kicker}>The journal</p>
        <h1>Notes on building<br />Explorer 233.</h1>
        <p>Ideas, decisions and lessons from August Peekay on developing an African science-fiction franchise.</p>
      </header>

      <section className={`${styles.journalIndex} ${styles.shell}`} aria-label="Journal entries">
        <div className={styles.journalIndexLabel}>
          <span>Latest notes</span>
          <span>{journal.length.toString().padStart(2, '0')} entries</span>
        </div>
        {journal.map((entry) => (
          <Link key={entry.slug} href={`/about/journal/${entry.slug}`} className={styles.journalRow}>
            <div>
              <time dateTime={entry.date}>{entry.dateLabel}</time>
              <span>{getReadingTime(entry)} min read</span>
            </div>
            <div>
              <h2>{entry.title}</h2>
              <p>{entry.standfirst}</p>
            </div>
            <span className={styles.rowArrow} aria-hidden="true">↗</span>
          </Link>
        ))}
      </section>

      <Footer />
    </main>
  );
}
