import type { Metadata } from 'next';
import PageHeader from '../components/PageHeader';
import StarSky from '../components/sections/StarSky';
import Footer from '../components/sections/Footer';
import StoreClient from './StoreClient';

export const metadata: Metadata = {
  title: 'Store — Explorer 233',
  description: "The Explorer 233 collection — tees and prints. International orders via Colourfro; Ghana delivery by local partner.",
};

export default function StorePage() {
  return (
    <main>
      <StarSky />

      <PageHeader
        eyebrow="Store"
        title="Carry it with you."
        lede="Wear it. The collection is printed and shipped by Colourfro; in Ghana, reserve here and pay on delivery."
      />

      <StoreClient />

      <Footer />
    </main>
  );
}
