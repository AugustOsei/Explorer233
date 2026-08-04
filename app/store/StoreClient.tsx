'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  COLLECTION_URL,
  GHANA_TEE_PRICE,
  products,
  RUD_WHATSAPP_NUMBER,
  type Product,
} from '../../content/store';
import styles from './store.module.css';

const SIZES = ['S', 'M', 'L', 'XL', '2XL'];
const QUANTITIES = [1, 2, 3, 4, 5];

type Region = 'ghana' | 'international';

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M11 5l5 5-5 5" />
    </svg>
  );
}

function ProductCard({
  product,
  region,
  onOrder,
}: {
  product: Product;
  region: Region;
  onOrder: (product: Product) => void;
}) {
  const isGhana = region === 'ghana';

  return (
    <li className={product.featured ? styles.featuredProduct : undefined}>
      <article className={styles.productCard}>
        <div className={styles.productImage}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes={product.featured ? '(max-width: 720px) 100vw, 50vw' : '(max-width: 720px) 50vw, 30vw'}
          />
          <span>{product.category}</span>
        </div>

        <div className={styles.productDetails}>
          <div>
            <h3>{product.name}</h3>
            <p>{isGhana ? `GH₵${GHANA_TEE_PRICE}` : product.internationalPrice}</p>
          </div>

          {isGhana ? (
            <button type="button" onClick={() => onOrder(product)} className={styles.cardAction}>
              Order on WhatsApp
              <ArrowIcon />
            </button>
          ) : (
            <a href={product.href} target="_blank" rel="noopener noreferrer" className={styles.cardAction}>
              Buy on Colourfro
              <ArrowIcon />
            </a>
          )}
        </div>
      </article>
    </li>
  );
}

export default function StoreClient() {
  const [region, setRegion] = useState<Region>('ghana');
  const [selected, setSelected] = useState<Product | null>(null);
  const [size, setSize] = useState('M');
  const [quantity, setQuantity] = useState(1);

  const isGhana = region === 'ghana';
  const visibleProducts = isGhana ? products.filter((product) => product.ghanaAvailable) : products;

  useEffect(() => {
    if (!selected) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelected(null);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selected]);

  function selectRegion(nextRegion: Region) {
    setRegion(nextRegion);
    setSelected(null);
  }

  function beginGhanaOrder(product: Product) {
    setSize('M');
    setQuantity(1);
    setSelected(product);
  }

  const whatsappMessage = selected
    ? [
        'Hello RUD Clothing, I would like to order an Explorer 233 item.',
        '',
        `Product: ${selected.name}`,
        `Size: ${size}`,
        `Quantity: ${quantity}`,
        `Item price: GH₵${GHANA_TEE_PRICE} each`,
        '',
        'Please confirm the delivery fee, MoMo payment details and estimated delivery date.',
      ].join('\n')
    : '';

  const whatsappUrl = `https://wa.me/${RUD_WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <>
      <section id="collection" className={styles.collection} aria-labelledby="collection-title">
        <div className={styles.shell}>
          <div className={styles.collectionHeader}>
            <div>
              <p className={styles.kicker}>The collection</p>
              <h2 id="collection-title">Choose how you are ordering.</h2>
            </div>
            <p>
              The selection, prices and checkout route adapt to where the order is going.
            </p>
          </div>

          <div className={styles.regionSelector} role="tablist" aria-label="Order destination">
            <button
              type="button"
              role="tab"
              aria-selected={isGhana}
              aria-controls="product-collection"
              onClick={() => selectRegion('ghana')}
              className={isGhana ? styles.activeRegion : undefined}
            >
              <span>Ordering from</span>
              Ghana
              <small>RUD Clothing · MoMo · nationwide delivery</small>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={!isGhana}
              aria-controls="product-collection"
              onClick={() => selectRegion('international')}
              className={!isGhana ? styles.activeRegion : undefined}
            >
              <span>Ordering from</span>
              Outside Ghana
              <small>Colourfro · online checkout · international shipping</small>
            </button>
          </div>

          <div className={styles.regionNotice} role="status">
            <span>{isGhana ? 'Ghana orders' : 'International orders'}</span>
            <p>
              {isGhana
                ? 'All tees are GH₵250. RUD confirms the delivery fee and MoMo details in WhatsApp before production begins.'
                : 'Prices are shown in USD. Payment, shipping and order support are completed securely on Colourfro.'}
            </p>
          </div>

          <ul id="product-collection" className={styles.productGrid}>
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} region={region} onOrder={beginGhanaOrder} />
            ))}
          </ul>

          {!isGhana && (
            <a href={COLLECTION_URL} target="_blank" rel="noopener noreferrer" className={styles.collectionLink}>
              View the full Explorer 233 collection on Colourfro
              <ArrowIcon />
            </a>
          )}
        </div>
      </section>

      <section className={styles.orderGuide} aria-labelledby="order-guide-title">
        <div className={styles.shell}>
          <div className={styles.guideHeading}>
            <p className={styles.kicker}>Before you order</p>
            <h2 id="order-guide-title">A clear path from selection to delivery.</h2>
          </div>

          {isGhana ? (
            <ol className={styles.steps}>
              <li>
                <span>01</span>
                <h3>Choose your tee</h3>
                <p>Select your design, size and quantity. Every locally produced tee is GH₵250.</p>
              </li>
              <li>
                <span>02</span>
                <h3>Confirm on WhatsApp</h3>
                <p>RUD Clothing confirms nationwide delivery cost, production timing and MoMo payment details.</p>
              </li>
              <li>
                <span>03</span>
                <h3>Produced and delivered</h3>
                <p>Your order is printed after payment and delivered within an estimated 7–14 days.</p>
              </li>
            </ol>
          ) : (
            <ol className={styles.steps}>
              <li>
                <span>01</span>
                <h3>Choose a product</h3>
                <p>Open the exact product on Colourfro to select the available colour and size.</p>
              </li>
              <li>
                <span>02</span>
                <h3>Checkout on Colourfro</h3>
                <p>Colourfro securely handles payment, supported destinations and shipping rates.</p>
              </li>
              <li>
                <span>03</span>
                <h3>Track with Colourfro</h3>
                <p>Order confirmation, fulfilment updates and international support come from Colourfro.</p>
              </li>
            </ol>
          )}

          <div className={styles.policyBar}>
            <div>
              <span>{isGhana ? 'Ghana fulfilment' : 'International fulfilment'}</span>
              <strong>{isGhana ? 'RUD Clothing' : 'Colourfro'}</strong>
            </div>
            <p>
              {isGhana
                ? 'Please confirm your size carefully. Wrong-size exchanges are not available. Items that arrive damaged are eligible for a refund.'
                : 'Colourfro’s shipping, returns and refund policies apply to every international purchase.'}
            </p>
          </div>
        </div>
      </section>

      {selected ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="ghana-order-title"
          aria-describedby="ghana-order-description"
          className={styles.dialogBackdrop}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelected(null);
          }}
        >
          <div className={styles.orderSheet}>
            <button type="button" onClick={() => setSelected(null)} className={styles.closeButton} aria-label="Close order form" autoFocus>
              ×
            </button>

            <div className={styles.sheetImage}>
              <Image src={selected.image} alt={selected.name} fill sizes="(max-width: 640px) 100vw, 42vw" />
            </div>

            <div className={styles.sheetContent}>
              <p className={styles.kicker}>Order in Ghana</p>
              <h2 id="ghana-order-title">{selected.name}</h2>
              <p className={styles.sheetPrice}>GH₵{GHANA_TEE_PRICE}</p>
              <p id="ghana-order-description" className={styles.sheetIntro}>
                Choose your size and quantity, then continue to WhatsApp. RUD Clothing will confirm delivery and send the MoMo payment details.
              </p>

              <div className={styles.optionGrid}>
                <label>
                  <span>Size</span>
                  <select value={size} onChange={(event) => setSize(event.target.value)}>
                    {SIZES.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </label>
                <label>
                  <span>Quantity</span>
                  <select value={quantity} onChange={(event) => setQuantity(Number(event.target.value))}>
                    {QUANTITIES.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div className={styles.orderSummary}>
                <span>Item total</span>
                <strong>GH₵{GHANA_TEE_PRICE * quantity}</strong>
                <small>Delivery is confirmed separately by RUD.</small>
              </div>

              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={styles.whatsappButton}>
                Continue in WhatsApp
                <ArrowIcon />
              </a>
              <p className={styles.sheetPolicy}>Production and nationwide delivery take approximately 7–14 days after payment.</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
