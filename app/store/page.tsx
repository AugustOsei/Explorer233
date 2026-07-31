import type { Metadata } from 'next';
import PageHeader from '../components/PageHeader';
import StarSky from '../components/sections/StarSky';
import Footer from '../components/sections/Footer';
import StoreClient from './StoreClient';

export const metadata: Metadata = {
  title: 'Store — Explorer 233',
  description: 'Objects from the Explorer 233 world. Ghana delivery by local partner; international via Colourfro.',
};

export default function StorePage() {
  return (
    <main>
      <StarSky />

      <PageHeader
        eyebrow="Store"
        title="Carry it with you."
        lede="A small, deliberate set of objects from this world — starting with one."
      />

      <StoreClient />

      <Footer />
    </main>
  );
}
