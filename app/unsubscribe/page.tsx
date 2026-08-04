import type { Metadata } from 'next';
import Footer from '../components/sections/Footer';
import PageHeader from '../components/PageHeader';

export const metadata: Metadata = {
  title: 'Unsubscribe — Explorer 233',
  description: 'Manage your Explorer 233 email preferences.',
  robots: { index: false, follow: false, nocache: true },
};

const copy: Record<string, { title: string; body: string }> = {
  success: {
    title: 'You have been unsubscribed.',
    body: "You won't receive further dispatches from Explorer 233. If this was a mistake, you can rejoin any time from the homepage.",
  },
  invalid: {
    title: 'This link is invalid.',
    body: 'The unsubscribe link appears incomplete or expired. Please use the link from your most recent email, or contact us directly.',
  },
  error: {
    title: 'Something went wrong.',
    body: 'We could not process your request. Please try again in a moment, or contact us directly.',
  },
};

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const { title, body } = copy[status ?? ''] ?? copy.invalid;

  return (
    <main>
      <PageHeader eyebrow="Preferences" title={title} lede={body} />
      <article className="legal-copy chapter-shell">
        <p>
          Questions can be sent to{' '}
          <a href="mailto:theteam@augustwheel.com">theteam@augustwheel.com</a>.
        </p>
      </article>
      <Footer />
    </main>
  );
}
