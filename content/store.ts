/**
 * Explorer 233 merchandise mirrored from the live Colourfro collection on
 * 4 August 2026. International checkout happens on the linked Colourfro
 * product page. Shirts can also be produced in Ghana by RUD Clothing.
 */

export type Product = {
  id: string;
  name: string;
  category: 'Tee' | 'Accessory';
  internationalPrice: string;
  href: string;
  image: string;
  ghanaAvailable: boolean;
  featured?: boolean;
};

export const COLLECTION_URL = 'https://colourfro.com/collections/explorer-233';
export const RUD_WHATSAPP_NUMBER = '233246240669';
export const GHANA_TEE_PRICE = 250;

export function getProductDescription(product: Product) {
  if (product.category === 'Accessory') {
    return `${product.name} from the official Explorer 233 merchandise collection.`;
  }

  return `${product.name}, an official Explorer 233 graphic T-shirt available for local production in Ghana and international fulfilment through Colourfro.`;
}

export const products: Product[] = [
  {
    id: 'explorer-233-classic-black',
    name: 'Explorer 233 — Classic Tee',
    category: 'Tee',
    internationalPrice: '$25.50',
    href: 'https://colourfro.com/products/explorer-233-unisex-classic-tee?variant=48096142917783',
    image: '/images/store/classic-tee-black.jpg',
    ghanaAvailable: true,
    featured: true,
  },
  {
    id: 'explorer-233-yellow',
    name: 'Explorer 233 — Orbit Tee',
    category: 'Tee',
    internationalPrice: '$25.00',
    href: 'https://colourfro.com/products/explorer-233?variant=48067705766039',
    image: '/images/store/explorer-yellow.jpg',
    ghanaAvailable: true,
  },
  {
    id: 'explorer-233-i-am',
    name: 'Explorer 233 — I Am',
    category: 'Tee',
    internationalPrice: '$25.50',
    href: 'https://colourfro.com/products/explorer-233-i-am?variant=48067674505367',
    image: '/images/store/i-am-black.jpg',
    ghanaAvailable: true,
  },
  {
    id: 'star-stuff-2',
    name: 'Star Stuff 2.0',
    category: 'Tee',
    internationalPrice: '$24.99',
    href: 'https://colourfro.com/products/star-stuff-2-0?variant=48067684663447',
    image: '/images/store/star-stuff-green.jpg',
    ghanaAvailable: true,
  },
  {
    id: 'i-heart-start',
    name: 'I Heart Start',
    category: 'Tee',
    internationalPrice: '$25.00',
    href: 'https://colourfro.com/products/i-heart-start?variant=48067699343511',
    image: '/images/store/i-heart-start-black.jpg',
    ghanaAvailable: true,
  },
  {
    id: 'star-stuff',
    name: 'Star Stuff',
    category: 'Tee',
    internationalPrice: '$25.00',
    href: 'https://colourfro.com/products/star-sutff?variant=48067679420567',
    image: '/images/store/star-stuff-black.png',
    ghanaAvailable: true,
  },
  {
    id: 'classic-maroon',
    name: 'Explorer 233 — Maroon Tee',
    category: 'Tee',
    internationalPrice: '$25.00',
    href: 'https://colourfro.com/products/unisex-classic-tee?variant=48067680993431',
    image: '/images/store/classic-tee-maroon.jpg',
    ghanaAvailable: true,
  },
  {
    id: 'corduroy-cap',
    name: 'Explorer 233 — Corduroy Cap',
    category: 'Accessory',
    internationalPrice: '$27.00',
    href: 'https://colourfro.com/products/explorer-233-vintage-corduroy-cap?variant=48096139477143',
    image: '/images/store/corduroy-cap-black.jpg',
    ghanaAvailable: false,
  },
];
