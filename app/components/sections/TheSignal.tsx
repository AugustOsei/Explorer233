'use client';

import Image from 'next/image';
import { useReveal } from '../useReveal';

/**
 * The single orientation beat after the cinematic. The homepage previously
 * split this explanation across eight competing cards. A newcomer now gets
 * one continuous premise, one memorable signal, and two clear next actions.
 */
export default function TheSignal() {
  const ref = useReveal<HTMLElement>();

  return (
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
          <p data-reveal className="eyebrow" style={{ opacity: 0 }}>
            The most asked question
          </p>
          <h2 data-reveal className="premise-title" style={{ opacity: 0 }}>
            What is Explorer 233?
          </h2>

          <div data-reveal data-reveal-delay="0.05" className="premise-body" style={{ opacity: 0 }}>
            <p>
              Explorer 233 is a science-fiction story released monthly right here on this
              site. It follows a Ghanaian space exploration company preparing to venture into
              the cosmos after signals from unknown worlds begin reaching Earth mostly
              carrying the same message: we are here.
            </p>
            <p>Beyond the story, the Explorer 233 universe includes games, art and gear inspired by it.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
