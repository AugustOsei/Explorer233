'use client';

import { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

gsap.registerPlugin(ScrollTrigger);

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const smooth = (value: number) => {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
};

/** A short, restrained illumination—no canvas, particles, morphing or pin wrapper. */
export default function SignalConvergence() {
  const root = useRef<HTMLElement>(null);
  const sentenceRef = useRef<HTMLParagraphElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = root.current;
    const sentence = sentenceRef.current;
    const message = messageRef.current;
    if (!section || !sentence || !message) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      sentence.style.opacity = '0';
      message.style.opacity = '1';
      message.style.transform = 'none';
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const p = self.progress;
        const sentenceOut = smooth((p - 0.04) / 0.4);
        const messageIn = smooth((p - 0.18) / 0.48);
        sentence.style.opacity = String(1 - sentenceOut);
        message.style.opacity = String(messageIn);
        message.style.transform = `scale(${0.985 + messageIn * 0.015})`;
      },
    });

    sentence.style.opacity = '1';
    message.style.opacity = '0';
    message.style.transform = 'scale(0.985)';

    return () => trigger.kill();
  }, []);

  return (
    <section ref={root} className="signal-illumination" aria-label="Signals illuminate a shared message">
      <div className="signal-display">
        <div className="signal-ambient" aria-hidden />
        <div className="signal-vignette" aria-hidden />

        <div className="signal-copy-shell chapter-shell">
          <p ref={sentenceRef} className="signal-source">
            The silence ended after humanity established a permanent settlement on Mars. Signals
            began arriving from worlds near and far. Most carried the same message.
          </p>
        </div>

        <div ref={messageRef} className="signal-message" aria-hidden>
          <span>WE ARE</span>
          <span>HERE</span>
        </div>

        <p className="sr-only">The shared message reads: We are here.</p>
      </div>
    </section>
  );
}
