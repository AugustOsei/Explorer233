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
  imageWidth?: number;
  imageHeight?: number;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
};

export function pageMetadata({
  title,
  description,
  path,
  image = '/explorer.png',
  imageAlt = 'Explorer 233 — an African science-fiction saga',
  imageWidth = 1200,
  imageHeight = 630,
  type = 'website',
  publishedTime,
  modifiedTime,
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
      locale: 'en_GH',
      images: [{ url: image, width: imageWidth, height: imageHeight, alt: imageAlt }],
      ...(type === 'article'
        ? {
            publishedTime,
            modifiedTime: modifiedTime ?? publishedTime,
            authors: [`${SITE_URL}/about`],
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}
