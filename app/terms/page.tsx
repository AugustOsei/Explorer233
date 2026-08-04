import Footer from '../components/sections/Footer';
import PageHeader from '../components/PageHeader';
import { pageMetadata } from '../../lib/seo';

export const metadata = pageMetadata({
  title: 'Terms — Explorer 233',
  description: 'Terms for using the Explorer 233 website and story materials.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <main>
      <PageHeader eyebrow="Legal" title="Terms." lede="The basic rules for using this website and the Explorer 233 story materials." />
      <article className="legal-copy chapter-shell">
        <h2>Story and artwork</h2>
        <p>Explorer 233, its characters, story, artwork, names and associated materials are protected creative works. Reading and sharing links is encouraged; reproducing or commercially using the materials requires permission.</p>
        <h2>Membership</h2>
        <p>Joining is free unless a specific paid offer states otherwise. Member news, event information and discounts may change, expire or be limited by region.</p>
        <h2>Store and events</h2>
        <p>Purchases, tickets and partner services may include additional terms shown at checkout or registration. Those specific terms apply to that transaction.</p>
        <h2>Contact</h2>
        <p>For permissions or questions, contact <a href="mailto:hello@explorer233.com">hello@explorer233.com</a>.</p>
        <p className="legal-note">Launch notice: this summary should receive legal review before publication.</p>
      </article>
      <Footer />
    </main>
  );
}
