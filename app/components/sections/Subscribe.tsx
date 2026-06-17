'use client';

import { useState } from 'react';
import Image from 'next/image';
import { subscribeEmail } from '@/lib/supabase';
import RevealText from '../RevealText';
import CountdownClock from './CountdownClock';
import { useReveal } from '../useReveal';

type State = 'idle' | 'loading' | 'success' | 'duplicate' | 'error';

// TODO: Replace # hrefs with actual social handles before launch
const SOCIALS = [
  { label: 'Instagram', href: '#' },
  { label: 'TikTok', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Facebook', href: '#' },
];

export default function Subscribe() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<State>('idle');
  const ref = useReveal<HTMLElement>();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || state === 'loading') return;
    setState('loading');
    const res = await subscribeEmail(email);
    setState(res.success ? 'success' : res.duplicate ? 'duplicate' : 'error');
  }

  const done = state === 'success' || state === 'duplicate';

  return (
    <section
      ref={ref}
      id="join"
      className="relative overflow-hidden noise-overlay"
      style={{ background: 'transparent', minHeight: '100vh', display: 'flex', alignItems: 'center', paddingBlock: 'clamp(9rem, 18vh, 15rem)' }}
    >
      {/* Dawn breaking over Earth — the hopeful climax. Masked to fade IN from
          the top so the shared star sky shows through up top and the dawn rises
          into it: stars → dawn, one continuous sky, no hard cut. */}
      <Image
        src="/images/dawn-earth.png"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="bleed-media"
        style={{
          objectPosition: 'center bottom',
          opacity: 0.7,
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 38%, black 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 38%, black 100%)',
        }}
      />
      {/* Legibility wash for the headline + form (top); let the dawn glow below. */}
      <div className="absolute inset-0 z-[1] pointer-events-none" aria-hidden
        style={{ background: 'linear-gradient(to bottom, rgba(5,7,13,0.78) 0%, rgba(5,7,13,0.6) 45%, rgba(5,7,13,0.3) 75%, rgba(5,7,13,0.5) 100%)' }} />

      <div className="relative z-10 chapter-shell flex flex-col items-center text-center" style={{ maxWidth: '54rem' }}>
        <RevealText
          text="Are you curious? Are you ready to be an Explorer?"
          as="h2"
          className="font-display font-bold"
          style={{ fontSize: 'var(--step-3)', lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--white-warm)', maxWidth: '20ch' }}
          stagger={0.06}
          highlight={['Explorer?']}
        />

        <RevealText
          text="Some people look up at the stars and feel small. Others feel called. Explorer 233 exists for the second kind — the ones who see infinity and want in. We open August 1, 2026. Your seat is waiting."
          className="font-body font-light mt-7"
          style={{ fontSize: 'var(--step-0)', lineHeight: 1.75, color: 'rgba(244,241,234,0.7)', maxWidth: '46ch' }}
          stagger={0.012}
        />

        {/* Live countdown — urgency right above the action */}
        <div data-reveal data-reveal-delay="0.06" className="mt-10 w-full max-w-xl" style={{ opacity: 0 }}>
          <p className="eyebrow mb-5" style={{ color: 'rgba(244,241,234,0.5)' }}>Going live in</p>
          <CountdownClock />
        </div>

        {/* Form — the single focal point */}
        <div data-reveal data-reveal-delay="0.12" className="mt-10 w-full max-w-xl" style={{ opacity: 0 }}>
          {done ? (
            <div
              className="py-7 px-8 rounded-2xl"
              style={{
                border: `1px solid ${state === 'duplicate' ? 'rgba(232,179,57,0.3)' : 'rgba(45,108,255,0.3)'}`,
                background: state === 'duplicate' ? 'rgba(232,179,57,0.05)' : 'rgba(45,108,255,0.06)',
              }}
            >
              {state === 'success' ? (
                <p className="font-display" style={{ fontSize: 'var(--step-1)', color: 'var(--white-warm)' }}>
                  The call is heeded. <span className="text-gold-grad">When the door opens, you&apos;ll be among the first through it.</span>
                </p>
              ) : (
                <p className="font-display" style={{ fontSize: 'var(--step-1)', color: 'var(--gold-accent)' }}>
                  You&apos;ve already heeded the call. Watch your inbox.
                </p>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="flex flex-col sm:flex-row gap-3">
                <label className="sr-only" htmlFor="cta-email">Email address</label>
                <input
                  id="cta-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email to enlist"
                  required
                  disabled={state === 'loading'}
                  className="flex-1 px-6 py-5 rounded-2xl text-base outline-none font-body text-left"
                  style={{
                    background: 'rgba(244,241,234,0.04)',
                    border: '1px solid rgba(244,241,234,0.12)',
                    color: 'var(--white-warm)',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => { e.target.style.borderColor = 'rgba(232,179,57,0.6)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(244,241,234,0.12)'; }}
                />
                <button
                  type="submit"
                  disabled={state === 'loading' || !email.trim()}
                  className="px-9 py-5 rounded-2xl font-semibold uppercase flex-shrink-0 font-body"
                  style={{
                    fontSize: '13px',
                    letterSpacing: '0.16em',
                    background: state === 'loading' ? 'rgba(232,179,57,0.55)' : 'var(--gold-accent)',
                    color: 'var(--bg-void)',
                    cursor: state === 'loading' || !email.trim() ? 'not-allowed' : 'pointer',
                    opacity: !email.trim() ? 0.5 : 1,
                    transition: 'opacity 0.2s, background 0.2s, transform 0.15s',
                  }}
                  onMouseEnter={(e) => { if (email.trim() && state !== 'loading') e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  {state === 'loading' ? 'Sending…' : 'Join the Mission'}
                </button>
              </div>
              <p className="mt-3 font-body" style={{ fontSize: '12px', color: 'rgba(244,241,234,0.32)' }}>
                One signal, the moment we open. No noise.
              </p>
              {state === 'error' && (
                <p className="mt-2 font-body" style={{ fontSize: '14px', color: 'rgba(255,90,70,0.85)' }}>
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          )}
        </div>

        {/* Socials */}
        <div data-reveal data-reveal-delay="0.18" className="flex flex-col items-center gap-4 pt-10 mt-16 border-t w-full" style={{ opacity: 0, borderColor: 'rgba(244,241,234,0.08)' }}>
          <p className="eyebrow" style={{ color: 'rgba(244,241,234,0.3)' }}>Follow the Mission</p>
          <div className="flex flex-wrap justify-center gap-8">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="font-body"
                style={{ fontSize: '15px', color: 'rgba(244,241,234,0.5)', textDecoration: 'none', transition: 'color 0.15s' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--gold-accent)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(244,241,234,0.5)'; }}
              >
                {/* TODO: Replace href with real handle before launch */}
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
