import type { Metadata } from 'next';

export const SITE_URL = 'https://explorer233.com';
export const SITE_NAME = 'Explorer 233';
export const SITE_DESCRIPTION =
  'Explorer 233 is an African science-fiction saga about a Ghanaian-led space exploration company responding to signals from star systems near and far calling to humanity.';

type PageMetadata = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article';
};

export function pageMetadata({
  title,
  description,
  path,
  image = '/explorer.png',
  imageAlt = 'Explorer 233 — an African science-fiction saga',
  type = 'website',
}: PageMetadata): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      type,
      images: [{ url: image, width: 1200, height: 630, alt: imageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}
