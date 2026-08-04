import Footer from '../components/sections/Footer';
import PageHeader from '../components/PageHeader';
import { pageMetadata } from '../../lib/seo';

export const metadata = pageMetadata({
  title: 'Privacy — Explorer 233',
  description: 'How Explorer 233 handles subscriber and website data.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <main>
      <PageHeader eyebrow="Legal" title="Privacy." lede="A plain-language summary of the information this website collects and why." />
      <article className="legal-copy chapter-shell">
        <h2>Email membership</h2>
        <p>When you join, we store the email address you provide so we can send story releases, franchise news, event announcements and occasional member offers. You can unsubscribe using the link included in those emails.</p>
        <h2>Website measurement</h2>
        <p>We use privacy-conscious website analytics to understand which pages visitors use and how the experience performs. We do not sell personal information.</p>
        <h2>Orders and enquiries</h2>
        <p>Store orders and messages may require additional contact or fulfilment information. That information is used only to provide the service you requested and meet applicable legal obligations.</p>
        <h2>Contact</h2>
        <p>Questions or data requests can be sent to <a href="mailto:hello@explorer233.com">hello@explorer233.com</a>.</p>
      </article>
      <Footer />
    </main>
  );
}
