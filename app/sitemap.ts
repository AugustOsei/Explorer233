import type { MetadataRoute } from 'next';
import { journal } from '../content/about';
import { products } from '../content/store';
import { WORLD_CARDS } from '../content/world-gallery';
import { SITE_URL } from '../lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date('2026-08-04');
  const corePages = [
    { path: '', priority: 1, changeFrequency: 'weekly' as const, images: [`${SITE_URL}/explorer.png`] },
    { path: '/story', priority: 0.9, changeFrequency: 'monthly' as const, images: [`${SITE_URL}/images/dispatch-one-wide.png`] },
    { path: '/world', priority: 0.8, changeFrequency: 'monthly' as const, images: [`${SITE_URL}/images/crew-wide.png`] },
    { path: '/games-events', priority: 0.7, changeFrequency: 'weekly' as const, images: [`${SITE_URL}/images/games/chop-first/cover-orbital.jpg`] },
    { path: '/games-events/chop-first', priority: 0.8, changeFrequency: 'monthly' as const, images: [`${SITE_URL}/images/games/chop-first/cover-orbital.jpg`] },
    { path: '/store', priority: 0.7, changeFrequency: 'weekly' as const, images: [`${SITE_URL}/images/store/classic-tee-black.jpg`] },
    { path: '/about', priority: 0.7, changeFrequency: 'monthly' as const, images: [`${SITE_URL}/images/about-hero.jpg`] },
    { path: '/about/journal', priority: 0.7, changeFrequency: 'monthly' as const, images: [`${SITE_URL}/explorer.png`] },
    { path: '/privacy', priority: 0.2, changeFrequency: 'yearly' as const },
    { path: '/terms', priority: 0.2, changeFrequency: 'yearly' as const },
  ];

  return [
    ...corePages.map((page) => ({
      url: `${SITE_URL}${page.path}`,
      priority: page.priority,
      changeFrequency: page.changeFrequency,
      lastModified: updated,
      images: 'images' in page ? page.images : undefined,
    })),
    ...WORLD_CARDS.map((card) => ({
      url: `${SITE_URL}/world/${card.id}`,
      lastModified: updated,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
      images: card.gallery.map((art) => `${SITE_URL}${art.src}`),
    })),
    ...products.map((product) => ({
      url: `${SITE_URL}/store/${product.id}`,
      lastModified: updated,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
      images: [`${SITE_URL}${product.image}`],
    })),
    ...journal.map((entry) => ({
      url: `${SITE_URL}/about/journal/${entry.slug}`,
      lastModified: new Date(entry.date),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ];
}
