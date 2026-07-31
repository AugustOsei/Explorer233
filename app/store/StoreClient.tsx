'use client';

import Image from 'next/image';
import { useState } from 'react';

/**
 * Two-region store.
 *
 * International ships through Colourfro's existing storefront, so that side is
 * a link-out, not a checkout. Ghana takes NO payment here on purpose: the form
 * captures an intent to buy, and a local partner settles mobile money by hand.
 * That keeps card data off this site entirely.
 */

const SIZES = ['One size', 'S', 'M', 'L', 'XL'];
const INTERNATIONAL_URL = 'https://colourfro.com';

type Region = 'ghana' | 'international';
type Status = 'idle' | 'sending' | 'done' | 'error';

export default function StoreClient() {
  const [region, setRegion] = useState<Region>('ghana');
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
        body: JSON.stringify(data),
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

  return (
    <div className="chapter-shell relative z-10" style={{ paddingBlock: 'clamp(3rem, 7vh, 5rem)' }}>
      {/* Region toggle */}
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
            onClick={() => setRegion(key)}
            className="region-tab"
            data-active={region === key || undefined}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-10 editorial-grid">
        {/* Product */}
        <div className="relative w-full overflow-hidden rounded-lg" style={{ aspectRatio: '4 / 5' }}>
          <Image
            src="/images/store-cap.jpg"
            alt="The Explorer 233 cap, black with the agency wordmark"
            fill
            sizes="(max-width: 900px) 92vw, 46vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Panel */}
        <div>
          <h2
            className="font-display font-light"
            style={{ fontSize: 'var(--step-3)', lineHeight: 1.12, letterSpacing: '-0.02em', color: 'var(--star-white)' }}
          >
            The Explorer 233 cap
          </h2>
          <p
            className="font-body mt-5"
            style={{ fontSize: 'var(--step-0)', lineHeight: 1.75, color: 'var(--lunar-silver)', maxWidth: '46ch' }}
          >
            Black, low profile, agency wordmark on the front. The first object from this world you
            can actually put on your head.
          </p>

          {region === 'international' ? (
            <div className="mt-9">
              <p
                className="font-body"
                style={{ fontSize: 'var(--step-0)', lineHeight: 1.75, color: 'var(--lunar-silver)', maxWidth: '46ch' }}
              >
                Outside Ghana, our pieces ship through Colourfro — same team, existing storefront,
                proper international delivery.
              </p>
              <a
                href={INTERNATIONAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-join mt-7"
              >
                Shop on Colourfro
              </a>
            </div>
          ) : (
            <div className="mt-9">
              <p
                className="font-body"
                style={{ fontSize: '13.5px', lineHeight: 1.7, color: 'var(--lunar-silver)', maxWidth: '46ch' }}
              >
                No payment on this page. Leave your details and our Accra partner will reach you on
                WhatsApp or phone to arrange mobile money and delivery.
              </p>

              {status === 'done' ? (
                <div
                  className="mt-7 rounded-lg p-6"
                  style={{ border: '1px solid rgba(31,166,168,0.35)', background: 'rgba(31,166,168,0.07)' }}
                >
                  <p className="font-display" style={{ fontSize: 'var(--step-1)', color: 'var(--star-white)' }}>
                    Order noted.
                  </p>
                  <p className="font-body mt-2" style={{ fontSize: 'var(--step-0)', color: 'var(--lunar-silver)' }}>
                    Someone will contact you shortly to confirm and take payment.
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="mt-7 flex flex-col gap-4" style={{ maxWidth: '30rem' }}>
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
                    <select name="size" required defaultValue="One size" className="field-input">
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

                  <button type="submit" className="btn-join mt-2 justify-center" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending…' : 'Reserve mine'}
                  </button>

                  <p className="font-body" style={{ fontSize: '11.5px', lineHeight: 1.6, color: 'var(--lunar-silver)', opacity: 0.7 }}>
                    We store your name, phone and address only to fulfil this order.
                  </p>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
