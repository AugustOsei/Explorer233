'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';
import { WORLD_CARDS, categoryLabel, type Category, type TradingCard } from '../../content/world-gallery';
import styles from './world-gallery.module.css';

type Filter = 'all' | Category;

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All cards' },
  { id: 'characters', label: 'Characters' },
  { id: 'assets', label: 'Assets' },
  { id: 'promotional', label: 'Promo art' },
];

function ArtworkSurface({ card }: { card: TradingCard }) {
  if (card.crop) {
    return <span className={styles.referenceCrop} data-crop={card.crop} role="img" aria-label={card.alt} />;
  }

  return (
    <Image
      src={card.image}
      alt={card.alt}
      fill
      sizes="(max-width: 620px) 82vw, (max-width: 980px) 42vw, 23vw"
      style={{ objectFit: 'cover', objectPosition: card.position ?? '50% 50%' }}
    />
  );
}

export default function WorldGallery() {
  const [filter, setFilter] = useState<Filter>('all');
  const [turned, setTurned] = useState<string | null>(null);
  const [collectionId, setCollectionId] = useState<string | null>(null);

  const visible = filter === 'all' ? WORLD_CARDS : WORLD_CARDS.filter((card) => card.category === filter);
  const collection = collectionId ? WORLD_CARDS.find((card) => card.id === collectionId) ?? null : null;

  useEffect(() => {
    if (!collection) return;
    const previous = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setCollectionId(null);
    };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [collection]);

  const chooseFilter = (next: Filter) => {
    setFilter(next);
    setTurned(null);
    setCollectionId(null);
  };

  return (
    <>
      <div className={styles.toolbar}>
        <div className={styles.filters} role="group" aria-label="Filter gallery cards">
          {FILTERS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={styles.filter}
              data-active={filter === item.id || undefined}
              aria-pressed={filter === item.id}
              onClick={() => chooseFilter(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <p>Choose a card to reveal its story.</p>
      </div>

      <div className={styles.deck}>
        {visible.map((card) => {
          const isTurned = turned === card.id;
          const serial = WORLD_CARDS.findIndex((entry) => entry.id === card.id) + 1;
          return (
            <article
              key={card.id}
              className={styles.slot}
              data-has-set={card.gallery.length > 1 ? true : undefined}
              data-muted={turned && !isTurned ? true : undefined}
            >
              <div className={styles.tradingCard} data-turned={isTurned || undefined} data-tone={card.tone ?? 'standard'}>
                <div className={`${styles.face} ${styles.front}`}>
                  <button
                    type="button"
                    className={styles.frontAction}
                    aria-label={`Turn over ${card.title}`}
                    tabIndex={isTurned ? -1 : 0}
                    onClick={() => setTurned(card.id)}
                  >
                    <span className={styles.frontHead}>
                      <span>{card.title}</span>
                      <span>{String(serial).padStart(2, '0')}</span>
                    </span>
                    <span className={styles.artWindow}>
                      <ArtworkSurface card={card} />
                      <span className={styles.artSheen} aria-hidden />
                    </span>
                    <span className={styles.frontFoot}>
                      <span className={styles.cardType}>{categoryLabel(card.category)}</span>
                      <span className={styles.role}>{card.role}</span>
                      <span className={styles.series}>Explorer 233 · First Edition</span>
                    </span>
                  </button>
                </div>

                <div className={`${styles.face} ${styles.back}`} aria-hidden={!isTurned}>
                  <span className={styles.backOrbit} aria-hidden />
                  <div className={styles.backHead}>
                    <span>Explorer 233</span>
                    <span>{String(serial).padStart(2, '0')} / 11</span>
                  </div>
                  <div className={styles.backIdentity}>
                    <span className={styles.backLogo}>
                      <Image src="/logo-emblem.png" alt="" width={54} height={54} />
                    </span>
                    <span className={styles.backType}>{categoryLabel(card.category)}</span>
                    <h2>{card.title}</h2>
                    <p>{card.bio}</p>
                  </div>
                  <div className={styles.backActions}>
                    <Link href={`/world/${card.id}`} className={styles.profileLink} tabIndex={isTurned ? 0 : -1}>
                      Open full profile
                    </Link>
                    {card.gallery.length > 1 && (
                      <button type="button" className={styles.revealButton} tabIndex={isTurned ? 0 : -1} onClick={() => setCollectionId(card.id)}>
                        Reveal {card.gallery.length}-card set
                      </button>
                    )}
                    <button type="button" className={styles.returnButton} tabIndex={isTurned ? 0 : -1} onClick={() => setTurned(null)}>
                      Return to front
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {collection && (
        <div className={styles.collectionOverlay} role="dialog" aria-modal="true" aria-label={`${collection.title} artwork set`}>
          <button type="button" className={styles.scrim} aria-label="Close artwork set" onClick={() => setCollectionId(null)} />
          <section className={styles.collectionPanel}>
            <header className={styles.collectionHead}>
              <div>
                <span>Artwork set · {String(collection.gallery.length).padStart(2, '0')} cards</span>
                <h2>{collection.title}</h2>
              </div>
              <button type="button" onClick={() => setCollectionId(null)}>Close</button>
            </header>
            <div className={styles.collectionSpread}>
              {collection.gallery.map((art, index) => {
                const centre = (collection.gallery.length - 1) / 2;
                const spreadStyle = {
                  '--deal-index': index,
                  '--deal-angle': `${(index - centre) * 1.8}deg`,
                  '--deal-y': `${Math.abs(index - centre) * 0.3}rem`,
                } as CSSProperties;
                return (
                  <figure key={`${art.src}-${art.label}`} className={styles.collectionCard} style={spreadStyle}>
                    <span className={styles.collectionImage}>
                      <Image
                        src={art.src}
                        alt={`${collection.title} — ${art.label}`}
                        fill
                        sizes="(max-width: 700px) 68vw, 19vw"
                        style={{ objectFit: art.fit ?? 'cover', objectPosition: art.position ?? '50% 50%' }}
                      />
                    </span>
                    <figcaption>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <strong>{art.label}</strong>
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          </section>
        </div>
      )}
    </>
  );
}
