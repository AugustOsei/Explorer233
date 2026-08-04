import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Footer from '../../../components/sections/Footer';
import { getJournalEntry, getReadingTime, journal } from '../../../../content/about';
import { pageMetadata, SITE_URL } from '../../../../lib/seo';
import styles from '../../about.module.css';

type JournalArticleProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return journal.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: JournalArticleProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getJournalEntry(slug);
  if (!entry) return {};

  return pageMetadata({
    title: `${entry.title} — Explorer 233 Journal`,
    description: entry.standfirst,
    path: `/about/journal/${entry.slug}`,
    type: 'article',
    publishedTime: entry.date,
  });
}

export default async function JournalArticle({ params }: JournalArticleProps) {
  const { slug } = await params;
  const entry = getJournalEntry(slug);
  if (!entry) notFound();

  const minutes = getReadingTime(entry);
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: entry.title,
    description: entry.standfirst,
    datePublished: entry.date,
    dateModified: entry.date,
    inLanguage: 'en',
    articleSection: 'Creator journal',
    image: `${SITE_URL}/explorer.png`,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/about/journal/${entry.slug}` },
    author: { '@type': 'Person', '@id': `${SITE_URL}/#august-peekay`, name: entry.author, url: `${SITE_URL}/about` },
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Explorer 233',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo-emblem.png` },
    },
  };

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <article>
        <header className={styles.articleHero}>
          <Link href="/about/journal" className={styles.breadcrumb}>← Back to the journal</Link>
          <div className={styles.articleMeta}>
            <time dateTime={entry.date}>{entry.dateLabel}</time>
            <span>{minutes} min read</span>
          </div>
          <h1>{entry.title}</h1>
          <p className={styles.articleStandfirst}>{entry.standfirst}</p>
          <p className={styles.articleByline}>By {entry.author}</p>
        </header>
        <div className={styles.articleBody}>
          {entry.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <div className={styles.articleEnd}>
            <Link href="/about/journal" className={styles.arrowLink}>More from the journal <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  );
}
