'use client';

import { useState } from 'react';
import { subscribeEmail } from '../../../lib/supabase';
import { useReveal } from '../useReveal';

/** One focused conversion moment after the story and world have been introduced. */

const PARTNER_MAILTO =
  'mailto:hello@explorer233.com?subject=Explorer%20233&body=Tell%20us%20who%20you%20are%20and%20how%20you%20would%20like%20to%20be%20involved.';

export default function JoinPartner() {
  const scope = useReveal<HTMLElement>();

  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'dupe' | 'error'>('idle');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setState('sending');
    const res = await subscribeEmail(email.trim());
    if (res.success) setState('done');
    else if (res.duplicate) setState('dupe');
    else setState('error');
  }

  return (
    <section
      ref={scope}
      id="join"
      className="relative overflow-hidden"
      style={{ background: 'var(--deep-space-black)', paddingBlock: 'clamp(5rem, 13vh, 9rem)' }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(31,166,168,0.10), transparent 70%), radial-gradient(ellipse 60% 50% at 50% 100%, rgba(214,168,79,0.08), transparent 70%)',
        }}
      />

      <div className="chapter-shell relative z-10">
        <div data-reveal className="join-single" style={{ opacity: 0 }}>
          <div>
            <h2 className="join-single-title">Stay close to the signal.</h2>
            <p
              className="font-body mt-4"
              style={{ fontSize: 'var(--step-0)', lineHeight: 1.7, color: 'var(--lunar-silver)', maxWidth: '48ch' }}
            >
              Get every new dispatch, franchise news, event announcements and occasional
              member discounts as the universe grows.
            </p>
          </div>

          <div className="join-single-form">
            {state === 'done' || state === 'dupe' ? (
              <p className="font-display mt-8" style={{ fontSize: 'var(--step-1)', color: 'var(--star-white)' }}>
                {state === 'done' ? 'You’re on the list. Welcome aboard.' : 'You’re already with us.'}
              </p>
            ) : (
              <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  aria-label="Email address"
                  className="field-input flex-1"
                />
                <button type="submit" className="btn-join justify-center" disabled={state === 'sending'}>
                  {state === 'sending' ? 'Joining…' : 'Join'}
                </button>
              </form>
            )}
            {state !== 'done' && state !== 'dupe' && (
              <p className="font-body mt-4" style={{ fontSize: '13px', color: 'var(--lunar-silver)', opacity: 0.75 }}>
                Free to join. Story releases come monthly; news, events and member offers
                arrive only when there is something worth sharing.
              </p>
            )}
            {state === 'error' && (
              <p className="font-body mt-3" style={{ fontSize: '13px', color: 'var(--earth-red-clay)' }} role="alert">
                That didn’t send. Try again in a moment.
              </p>
            )}
          </div>
        </div>
        <p className="join-collaborate">
          Want to collaborate or support the project? <a href={PARTNER_MAILTO}>Get in touch.</a>
        </p>
      </div>
    </section>
  );
}
