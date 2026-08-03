'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { Scene } from '../../content/dispatch-se1-01';
import ReadingMode from './ReadingMode';

/**
 * The dispatch as an illustrated article, with a door into Reading Mode.
 *
 * Article mode is the default because it is linkable, scrollable and shows the
 * scene plates. Reading Mode is the opt-in: paginated, text-only, controls for
 * size and theme, and it remembers where you stopped.
 */
export default function StoryBody({
  scenes,
  title,
  code,
}: {
  scenes: Scene[];
  title: string;
  code: string;
}) {
  const [reading, setReading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resumable, setResumable] = useState(false);
  const body = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      setResumable(Boolean(localStorage.getItem('e233.reader.v1')));
    } catch {
      /* no storage, no resume affordance */
    }
  }, []);

  useEffect(() => {
    const el = body.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const total = r.height - window.innerHeight;
        setProgress(Math.min(1, Math.max(0, -r.top / Math.max(total, 1))));
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Scroll progress for article mode */}
      <div className="story-progress" aria-hidden>
        <div style={{ width: `${progress * 100}%` }} />
      </div>

      <div className="chapter-shell" style={{ paddingTop: 'clamp(2.5rem, 6vh, 4rem)' }}>
        <div className="story-open-bar">
          <button type="button" className="btn-join" onClick={() => setReading(true)}>
            {resumable ? 'Resume reading' : 'Reading mode'}
          </button>
          <p className="story-open-hint font-body">
            Paginated, distraction-free, remembers your place.
          </p>
        </div>
      </div>

      <div ref={body} className="story-article">
        {scenes.map((scene) => (
          <section key={scene.id} id={scene.id} className="story-scene">
            {scene.art && (
              <figure className="story-plate">
                <Image
                  src={scene.art.src}
                  alt={scene.art.alt}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
                <div className="story-plate-scrim" aria-hidden />
              </figure>
            )}

            <div className="chapter-shell">
              <div className="story-column">
                {scene.heading && (
                  <header className="story-scene-head">
                    <h2 className="eyebrow" style={{ color: 'var(--mission-gold)' }}>
                      {scene.heading}
                    </h2>
                    {scene.sub && <p className="story-scene-sub tabnum font-display">{scene.sub}</p>}
                  </header>
                )}
                {scene.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className={`story-p${p.startsWith('“') ? ' story-dialogue' : ''}`}
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      {reading && (
        <ReadingMode scenes={scenes} title={title} code={code} onClose={() => setReading(false)} />
      )}
    </>
  );
}
