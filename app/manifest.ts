import type { MetadataRoute } from 'next';
import { SITE_DESCRIPTION } from '../lib/seo';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Explorer 233',
    short_name: 'Explorer 233',
    description: SITE_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: '#05070B',
    theme_color: '#05070B',
    icons: [
      {
        src: '/logo-emblem.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
