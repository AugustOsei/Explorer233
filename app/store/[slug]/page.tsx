import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Footer from '../../components/sections/Footer';
import {
  GHANA_TEE_PRICE,
  RUD_WHATSAPP_NUMBER,
  getProductDescription,
  products,
} from '../../../content/store';
import { pageMetadata, SITE_URL } from '../../../lib/seo';
import styles from './product.module.css';

type ProductPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.id }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((entry) => entry.id === slug);
  if (!product) return {};

  return pageMetadata({
    title: `${product.name} — Official Explorer 233 Merchandise`,
    description: getProductDescription(product),
    path: `/store/${product.id}`,
    image: product.image,
    imageAlt: product.name,
    imageWidth: 1200,
    imageHeight: 1200,
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = products.find((entry) => entry.id === slug);
  if (!product) notFound();

  const description = getProductDescription(product);
  const usdPrice = product.internationalPrice.replace(/[^0-9.]/g, '');
  const pageUrl = `${SITE_URL}/store/${product.id}`;
  const whatsappText = encodeURIComponent(
    `Hello RUD Clothing, I would like to order the ${product.name}. Please confirm available sizes, delivery fee and MoMo payment details.`,
  );
  const whatsappUrl = `https://wa.me/${RUD_WHATSAPP_NUMBER}?text=${whatsappText}`;

  const offers = [
    ...(product.ghanaAvailable
      ? [{
          '@type': 'Offer',
          price: GHANA_TEE_PRICE,
          priceCurrency: 'GHS',
          availability: 'https://schema.org/InStock',
          url: pageUrl,
          seller: { '@type': 'Organization', name: 'RUD Clothing' },
          areaServed: { '@type': 'Country', name: 'Ghana' },
        }]
      : []),
    {
      '@type': 'Offer',
      price: usdPrice,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: product.href,
      seller: { '@type': 'Organization', name: 'Colourfro', url: 'https://colourfro.com' },
    },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        '@id': `${pageUrl}#product`,
        name: product.name,
        description,
        image: `${SITE_URL}${product.image}`,
        category: product.category,
        brand: { '@type': 'Brand', name: 'Explorer 233' },
        url: pageUrl,
        offers,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Store', item: `${SITE_URL}/store` },
          { '@type': 'ListItem', position: 3, name: product.name, item: pageUrl },
        ],
      },
    ],
  };

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className={styles.product}>
        <div className={styles.mediaShell}>
          <div className={styles.media}>
            <Image src={product.image} alt={product.name} fill sizes="(max-width: 800px) 100vw, 56vw" preload />
          </div>
        </div>
        <article className={styles.details}>
          <Link href="/store#collection" className={styles.back}>← Official store</Link>
          <p className={styles.kicker}>{product.category} · Explorer 233</p>
          <h1>{product.name}</h1>
          <p className={styles.description}>{description}</p>

          {product.ghanaAvailable ? (
            <section className={styles.route} aria-labelledby="ghana-order">
              <div><span>Ghana</span><strong>GH₵{GHANA_TEE_PRICE}</strong></div>
              <h2 id="ghana-order">Produced locally by RUD Clothing</h2>
              <p>Order by WhatsApp and pay by MoMo. Production and nationwide delivery take approximately 7–14 days.</p>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">Order in Ghana <span aria-hidden="true">↗</span></a>
            </section>
          ) : null}

          <section className={styles.route} aria-labelledby="international-order">
            <div><span>International</span><strong>{product.internationalPrice}</strong></div>
            <h2 id="international-order">Fulfilled by Colourfro</h2>
            <p>Colourfro handles size and colour selection, secure checkout, shipping and international order support.</p>
            <a href={product.href} target="_blank" rel="noopener noreferrer">Buy on Colourfro <span aria-hidden="true">↗</span></a>
          </section>

          <p className={styles.policy}>
            Ghana orders: confirm your size carefully; wrong-size exchanges are unavailable. Damaged arrivals are eligible for a refund. Colourfro policies apply to international purchases.
          </p>
        </article>
      </div>
      <Footer />
    </main>
  );
}
