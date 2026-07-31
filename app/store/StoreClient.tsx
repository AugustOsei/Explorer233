'use client';

import Image from 'next/image';
import { useState } from 'react';
import { products, COLLECTION_URL, type Product } from '../../content/store';

/**
 * One grid, two ways to buy.
 *
 * International goes straight to Colourfro, which already handles payment and
 * shipping — no reason to rebuild a checkout we would only do worse. Ghana takes
 * no payment here at all: picking a piece opens an intake sheet, and a local
 * partner settles mobile money by hand. No card data touches this site.
 */

const SIZES = ['S', 'M', 'L', 'XL', '2XL'];

type Region = 'ghana' | 'international';
type Status = 'idle' | 'sending' | 'done' | 'error';

export default function StoreClient() {
  const [region, setRegion] = useState<Region>('ghana');
  const [selected, setSelected] = useState<Product | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/store-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, product: selected?.name ?? 'unspecified' }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Something went wrong.');
      setStatus('done');
      form.reset();
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  function closeSheet() {
    setSelected(null);
    setStatus('idle');
    setError('');
  }

  return (
    <div className="chapter-shell relative z-10" style={{ paddingBottom: 'clamp(4rem, 10vh, 7rem)' }}>
      {/* Region toggle */}
      <div className="flex flex-wrap items-center justify-between gap-5">
        <div
          role="tablist"
          aria-label="Shipping region"
          className="inline-flex rounded-full p-1"
          style={{ border: '1px solid rgba(174,183,194,0.18)', background: 'rgba(174,183,194,0.04)' }}
        >
          {([
            ['ghana', 'Ghana'],
            ['international', 'International'],
          ] as const).map(([key, label]) => (
            <button
              key={key}
              role="tab"
              type="button"
              aria-selected={region === key}
              onClick={() => {
                setRegion(key);
                closeSheet();
              }}
              className="region-tab"
              data-active={region === key || undefined}
            >
              {label}
            </button>
          ))}
        </div>

        <p className="font-body" style={{ fontSize: '13px', color: 'var(--lunar-silver)', maxWidth: '42ch' }}>
          {region === 'ghana'
            ? 'No payment here — reserve a piece and our Accra partner arranges mobile money and delivery.'
            : 'Shipped worldwide by Colourfro, who print and fulfil the collection.'}
        </p>
      </div>

      {/* Product grid */}
      <ul className="mt-10 grid grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
        {products.map((p) => (
          <li key={p.href}>
            <article className="product-card flex flex-col">
              <div
                className="relative w-full overflow-hidden rounded-lg"
                style={{ aspectRatio: '1 / 1', background: 'rgba(174,183,194,0.05)' }}
              >
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 24vw"
                  className="object-cover product-card-img"
                />
              </div>
              <h3
                className="font-display mt-4"
                style={{ fontSize: 'var(--step-0)', color: 'var(--star-white)', letterSpacing: '-0.01em' }}
              >
                {p.name}
              </h3>
              <p className="font-body mt-1 tabnum" style={{ fontSize: '13px', color: 'var(--lunar-silver)' }}>
                {p.price}
              </p>

              {region === 'international' ? (
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-arrow mt-4 self-start inline-flex"
                  style={{ fontSize: '11px' }}
                >
                  Buy
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setSelected(p);
                    setStatus('idle');
                  }}
                  className="link-arrow mt-4 self-start inline-flex"
                  style={{ fontSize: '11px', background: 'none', cursor: 'pointer' }}
                >
                  Reserve
                </button>
              )}
            </article>
          </li>
        ))}
      </ul>

      <a href={COLLECTION_URL} target="_blank" rel="noopener noreferrer" className="link-arrow mt-12 inline-flex">
        See the full collection on Colourfro
      </a>

      {/* Ghana intake sheet */}
      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Reserve ${selected.name}`}
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center sm:p-6"
          style={{ background: 'rgba(5,7,11,0.82)', backdropFilter: 'blur(6px)' }}
          onClick={closeSheet}
        >
          <div
            className="w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl p-6 md:p-8"
            style={{
              background: '#0B0F18',
              border: '1px solid rgba(174,183,194,0.18)',
              maxHeight: '92dvh',
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow" style={{ color: 'var(--mission-gold)' }}>
                  Reserve · Ghana
                </p>
                <h3 className="font-display mt-2" style={{ fontSize: 'var(--step-1)', color: 'var(--star-white)' }}>
                  {selected.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={closeSheet}
                aria-label="Close"
                style={{ color: 'var(--lunar-silver)', fontSize: '22px', lineHeight: 1, cursor: 'pointer' }}
              >
                ×
              </button>
            </div>

            {status === 'done' ? (
              <div className="mt-7">
                <p className="font-display" style={{ fontSize: 'var(--step-1)', color: 'var(--star-white)' }}>
                  Reserved.
                </p>
                <p className="font-body mt-2" style={{ fontSize: 'var(--step-0)', color: 'var(--lunar-silver)' }}>
                  Someone will reach you shortly to confirm and take payment.
                </p>
                <button type="button" onClick={closeSheet} className="btn-ghost mt-6 self-start">
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4">
                <label className="field">
                  <span className="field-label">Full name</span>
                  <input name="name" required autoComplete="name" className="field-input" />
                </label>
                <label className="field">
                  <span className="field-label">Phone (WhatsApp preferred)</span>
                  <input
                    name="phone"
                    required
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="+233 …"
                    className="field-input"
                  />
                </label>
                <label className="field">
                  <span className="field-label">Delivery address</span>
                  <textarea name="address" required rows={3} autoComplete="street-address" className="field-input" />
                </label>
                <label className="field">
                  <span className="field-label">Size</span>
                  <select name="size" required defaultValue="M" className="field-input">
                    {SIZES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </label>

                {status === 'error' && (
                  <p className="font-body" style={{ fontSize: '13px', color: 'var(--earth-red-clay)' }} role="alert">
                    {error}
                  </p>
                )}

                <button type="submit" className="btn-join mt-1 justify-center" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : 'Reserve mine'}
                </button>
                <p
                  className="font-body"
                  style={{ fontSize: '11.5px', lineHeight: 1.6, color: 'var(--lunar-silver)', opacity: 0.7 }}
                >
                  We store your name, phone and address only to fulfil this order.
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
