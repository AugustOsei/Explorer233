'use client';

import { Fragment, useEffect, useRef, type ElementType, type CSSProperties } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface RevealTextProps {
  text: string;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  /** Stagger per word (s). */
  stagger?: number;
  /** Delay before the reveal begins (s). */
  delay?: number;
  /** ScrollTrigger start. */
  start?: string;
  /** Highlight these exact words (case-insensitive, punctuation-trimmed) with the gold gradient. */
  highlight?: string[];
  /** Vertical travel of each word as a fraction of its height (1 = full height). */
  rise?: number;
}

/**
 * Splits `text` into words wrapped in clip-masked spans and reveals them with a
 * staggered upward slide on scroll — the SpaceX/Apple keynote line-reveal effect.
 * Honors prefers-reduced-motion (shows instantly). Pure DOM, no extra deps.
 */
export default function RevealText({
  text,
  as: TagName = 'p',
  className = '',
  style,
  stagger = 0.06,
  delay = 0,
  start = 'top 82%',
  highlight = [],
  rise = 1.15,
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null);

  const norm = (w: string) => w.toLowerCase().replace(/[.,—’'"?:;]/g, '');
  const hi = new Set(highlight.map(norm));
  const words = text.split(' ');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const inner = el.querySelectorAll<HTMLElement>('[data-word-inner]');

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(inner, { yPercent: 0, opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        inner,
        { yPercent: rise * 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power4.out',
          stagger,
          delay,
          scrollTrigger: { trigger: el, start, toggleActions: 'play none none reverse' },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [text, stagger, delay, start, rise]);

  // Polymorphic tag — cast to any so a single child + ref typecheck cleanly.
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const Tag = TagName as any;

  return (
    <Tag ref={ref} className={className} style={style}>
      {/* A real space between words, not a right margin. Margins look identical
          but leave no whitespace in the DOM, so selecting the line and copying
          it — or a crawler, or a screen reader — got "WEAREHERE". The space sits
          outside the clip-masked span, so it never animates. */}
      {words.map((w, i) => (
        <Fragment key={i}>
          {i > 0 && ' '}
          <span
            style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', paddingBottom: '0.08em' }}
          >
            <span
              data-word-inner
              className={hi.has(norm(w)) ? 'text-gold-grad' : undefined}
              style={{ display: 'inline-block', opacity: 0, willChange: 'transform, opacity' }}
            >
              {w}
            </span>
          </span>
        </Fragment>
      ))}
    </Tag>
  );
}
