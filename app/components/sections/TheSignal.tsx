'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useReveal } from '../useReveal';
import SignalConvergence from './SignalConvergence';

/**
 * The single orientation beat after the cinematic. The homepage previously
 * split this explanation across eight competing cards. A newcomer now gets
 * one continuous premise, one memorable signal, and two clear next actions.
 */
export default function TheSignal() {
  const ref = useReveal<HTMLElement>();

  return (
    <>
    <section ref={ref} id="story-premise" tabIndex={-1} className="premise-section relative overflow-hidden">
      <Image
        src="/images/scene-mars.jpg"
        alt="Explorer 233 personnel inside the Mars settlement"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="premise-scrim" aria-hidden />

      <div className="chapter-shell relative z-10">
        <div className="premise-copy">
          <h2 data-reveal className="premise-title" style={{ opacity: 0 }}>
            In this universe, space is no longer silent.
          </h2>

          <div data-reveal data-reveal-delay="0.05" className="premise-body" style={{ opacity: 0 }}>
            <p>
              Explorer 233 is an African science-fiction saga about a Ghanaian-led space
              exploration company responding to signals from star systems near and far —
              messages calling directly to humanity.
            </p>
            <p>
              For generations, humanity faced a haunting question: in a universe this vast,
              why had we never heard from anyone else? Scientists called this mystery the Fermi
              paradox.
            </p>
          </div>
        </div>
      </div>
    </section>

    <SignalConvergence />

    <section className="signal-resolution-section">
      <div className="chapter-shell">
        <p className="premise-close">
          That message changes humanity’s future. Explorer 233 is created to find its senders —
          and must survive those determined to keep humanity home.
        </p>
        <div className="premise-actions">
          <Link href="/story" className="btn-join">Read Dispatch One</Link>
          <Link href="/world" className="btn-ghost">Explore the World</Link>
        </div>
      </div>
    </section>
    </>
  );
}
