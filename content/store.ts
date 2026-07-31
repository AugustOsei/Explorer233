/**
 * The Explorer 233 collection, mirrored from the live Colourfro storefront
 * (colourfro.com/collections/explorer-233), which is where every buyer is
 * ultimately sent. Titles, prices and imagery read from that shop on
 * 31 July 2026 — re-check before launch if the collection changes.
 *
 * Note: "Star Sutff" is spelled that way on the shop itself, and the
 * Explorer 233 Poster currently shows a tee as its featured image over
 * there — both worth fixing on the Colourfro side rather than papering
 * over here.
 */

export type Product = {
  name: string;
  price: string;
  href: string;
  image: string;
};

export const COLLECTION_URL = 'https://colourfro.com/collections/explorer-233';

export const products: Product[] = [
  {
    name: 'Explorer 233',
    price: '$25.00',
    href: 'https://colourfro.com/products/explorer-233',
    image: 'https://colourfro.com/cdn/shop/files/unisex-classic-tee-daisy-front-6a6585c23d390.jpg?v=1785038289',
  },
  {
    name: 'Explorer 233 — I Am',
    price: '$25.50',
    href: 'https://colourfro.com/products/explorer-233-i-am',
    image: 'https://colourfro.com/cdn/shop/files/unisex-classic-tee-black-front-6a65745850326.jpg?v=1785033836',
  },
  {
    name: 'Star Stuff 2.0',
    price: '$24.99',
    href: 'https://colourfro.com/products/star-stuff-2-0',
    image: 'https://colourfro.com/cdn/shop/files/unisex-classic-tee-forest-green-front-6a65798610dee.jpg?v=1785035163',
  },
  {
    name: 'Star Sutff',
    price: '$25.00',
    href: 'https://colourfro.com/products/star-sutff',
    image: 'https://colourfro.com/cdn/shop/files/unisex-classic-tee-black-front-6a6575b59719d.png?v=1785034192',
  },
  {
    name: 'I Heart Start',
    price: '$25.00',
    href: 'https://colourfro.com/products/i-heart-start',
    image: 'https://colourfro.com/cdn/shop/files/unisex-classic-tee-black-front-6a657e849072e.jpg?v=1785036440',
  },
  {
    name: 'Unisex classic tee',
    price: '$25.00',
    href: 'https://colourfro.com/products/unisex-classic-tee',
    image: 'https://colourfro.com/cdn/shop/files/unisex-classic-tee-maroon-front-6a6576e5ea394.jpg?v=1785034497',
  },
  {
    name: 'Explorer 233 Poster',
    price: '$24.99',
    href: 'https://colourfro.com/products/explorer-233-poster',
    image: 'https://colourfro.com/cdn/shop/files/unisex-classic-tee-gold-front-6a658650c036f.jpg?v=1785038439',
  },
];
