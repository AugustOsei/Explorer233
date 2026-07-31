'use client';

import { useEffect, useState } from 'react';
import { subscribeEmail } from '../../../lib/supabase';
import { nextDispatch } from '../../../content/dispatch-se1-01';
import { useReveal } from '../useReveal';

/**
 * The one conversion moment, with two doors.
 *
 * Individuals join and get the dispatches. Creatives and companies take the
 * other door — this world needs illustrators, writers, voices, and backers, and
 * burying that in a footer link would waste the only moment they are paying
 * attention. Deliberately two tracks, one section, no competition between them.
 *
 * The clock counts to the next dispatch, not to a site launch. The site is the
 * thing that is live; the story is the thing that keeps arriving.
 */

const PARTNER_MAILTO =
  'mailto:hello@explorer233.com?subject=Partnering%20with%20Explorer%20233&body=Tell%20us%20who%20you%20are%20and%20what%20you%20want%20to%20build%20with%20us.';

/**
 * Takes the ISO string, not a Date — a Date built during render is a new object
 * every pass, which would make the effect re-subscribe forever.
 */
function useCountdown(iso: string) {
  const [left, setLeft] = useState<{ d: number; h: number; m: number; s: number } | null>(null);

  useEffect(() => {
    const targetMs = new Date(iso).getTime();
    const tick = () => {
      const diff = Math.max(0, targetMs - Date.now());
      setLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [iso]);

  return left;
}

const pad = (n: number) => String(n).padStart(2, '0');

export default function JoinPartner() {
  const scope = useReveal<HTMLElement>();
  const left = useCountdown(nextDispatch.releasesAt);

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
        {/* Next dispatch clock */}
        <div data-reveal className="text-center" style={{ opacity: 0 }}>
          <p className="eyebrow" style={{ color: 'var(--mission-gold)' }}>
            {nextDispatch.code} · {nextDispatch.title}
          </p>
          <p
            className="font-body mt-3"
            style={{ fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--lunar-silver)' }}
          >
            Next dispatch in
          </p>
          <div className="mt-5 flex items-start justify-center gap-3 md:gap-5">
            {[
              [left?.d ?? 0, 'Days'],
              [left?.h ?? 0, 'Hours'],
              [left?.m ?? 0, 'Minutes'],
              [left?.s ?? 0, 'Seconds'],
            ].map(([v, label]) => (
              <div key={label as string} className="flex flex-col items-center gap-2" style={{ minWidth: '4.5rem' }}>
                <span
                  className="tabnum font-display"
                  style={{
                    fontSize: 'clamp(1.9rem, 5vw, 3.2rem)',
                    fontWeight: 300,
                    lineHeight: 1,
                    color: 'var(--star-white)',
                    letterSpacing: '-0.03em',
                  }}
                >
                  {left ? pad(v as number) : '--'}
                </span>
                <span className="eyebrow" style={{ color: 'var(--lunar-silver)', opacity: 0.6, fontSize: '10px' }}>
                  {label as string}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Two doors */}
        <div className="mt-16 md:mt-20 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Individuals */}
          <div data-reveal className="cta-card" style={{ opacity: 0 }}>
            <p className="eyebrow" style={{ color: 'var(--orbit-teal)' }}>
              For explorers
            </p>
            <h2
              className="font-display font-light mt-4 balance"
              style={{ fontSize: 'var(--step-2)', lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--star-white)' }}
            >
              Are you ready to be an Explorer?
            </h2>
            <p
              className="font-body mt-4"
              style={{ fontSize: 'var(--step-0)', lineHeight: 1.7, color: 'var(--lunar-silver)', maxWidth: '40ch' }}
            >
              Every dispatch, the moment it lands. No noise, no filler — just the story as it
              arrives.
            </p>

            {state === 'done' || state === 'dupe' ? (
              <p className="font-display mt-8" style={{ fontSize: 'var(--step-1)', color: 'var(--star-white)' }}>
                {state === 'done' ? 'You’re on the list. Welcome aboard.' : 'You’re already with us.'}
              </p>
            ) : (
              <form onSubmit={onSubmit} className="mt-8 flex flex-col sm:flex-row gap-3">
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
            {state === 'error' && (
              <p className="font-body mt-3" style={{ fontSize: '13px', color: 'var(--earth-red-clay)' }} role="alert">
                That didn’t send. Try again in a moment.
              </p>
            )}
          </div>

          {/* Creatives & companies */}
          <div data-reveal data-reveal-delay="0.08" className="cta-card" style={{ opacity: 0 }}>
            <p className="eyebrow" style={{ color: 'var(--mission-gold)' }}>
              For creatives & companies
            </p>
            <h2
              className="font-display font-light mt-4 balance"
              style={{ fontSize: 'var(--step-2)', lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--star-white)' }}
            >
              One hand cannot lift a load.
            </h2>
            <p
              className="font-body mt-4"
              style={{ fontSize: 'var(--step-0)', lineHeight: 1.7, color: 'var(--lunar-silver)', maxWidth: '40ch' }}
            >
              Illustrators, writers, animators, voice actors, composers — and the companies
              willing to back an African science-fiction universe properly. If that is you,
              this is the door.
            </p>
            <a href={PARTNER_MAILTO} className="btn-ghost mt-8 self-start">
              Partner with us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
