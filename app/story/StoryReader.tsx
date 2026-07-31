'use client';

import { useEffect, useRef, useState } from 'react';
import type { Scene } from '../../content/dispatch-se1-01';

/**
 * A reading surface, not a marketing page.
 *
 * The previous version rendered the dispatch as one undifferentiated column of
 * marketing-weight type. Long fiction needs different affordances, so this adds
 * the ones that actually help: a reading-progress bar, a scene rail that tracks
 * where you are, serif-scale measure and leading tuned for prose, a drop cap to
 * mark the start, and dialogue that hangs slightly so exchanges read as
 * exchanges. Everything else gets out of the way.
 */
export default function StoryReader({ scenes }: { scenes: Scene[] }) {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = body.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const done = Math.min(1, Math.max(0, -rect.top / Math.max(total, 1)));
        setProgress(done);

        // Whichever scene heading is closest above the middle of the viewport.
        const marks = body.querySelectorAll<HTMLElement>('[data-scene]');
        let current = 0;
        marks.forEach((m, i) => {
          if (m.getBoundingClientRect().top < window.innerHeight * 0.4) current = i;
        });
        setActive(current);
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const isDialogue = (p: string) => p.startsWith('“') || p.startsWith('"');

  return (
    <>
      {/* Reading progress — sits under the nav, only meaningful on this page */}
      <div
        aria-hidden
        style={{ position: 'fixed', top: 68, left: 0, right: 0, height: '2px', zIndex: 40, background: 'rgba(174,183,194,0.10)' }}
      >
        <div
          style={{
            height: '100%',
            width: `${progress * 100}%`,
            background: 'linear-gradient(90deg, var(--orbit-teal), var(--mission-gold))',
            transition: 'width 0.1s linear',
          }}
        />
      </div>

      <div className="story-layout chapter-shell">
        {/* Scene rail */}
        <nav aria-label="Scenes" className="story-rail">
          <ol className="flex flex-col gap-3">
            {scenes.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="story-rail-link" data-active={i === active || undefined}>
                  {s.heading ?? `Scene ${i + 1}`}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Prose */}
        <div ref={bodyRef} className="story-prose">
          {scenes.map((scene, si) => (
            <section key={scene.id} id={scene.id} data-scene>
              {scene.heading && (
                <header style={{ marginTop: si === 0 ? 0 : 'clamp(3.5rem, 9vh, 6rem)', marginBottom: '2.5rem' }}>
                  {si > 0 && (
                    <div
                      aria-hidden
                      style={{
                        width: '48px',
                        height: '1px',
                        background: 'var(--mission-gold)',
                        opacity: 0.45,
                        marginBottom: '2.5rem',
                      }}
                    />
                  )}
                  <h2 className="eyebrow" style={{ color: 'var(--mission-gold)' }}>
                    {scene.heading}
                  </h2>
                  {scene.sub && (
                    <p
                      className="font-display mt-2 tabnum"
                      style={{ fontSize: '13px', letterSpacing: '0.18em', color: 'var(--lunar-silver)' }}
                    >
                      {scene.sub}
                    </p>
                  )}
                </header>
              )}

              {scene.paragraphs.map((p, pi) => (
                <p
                  key={pi}
                  className={`story-p${si === 0 && pi === 0 ? ' story-open' : ''}${isDialogue(p) ? ' story-dialogue' : ''}`}
                >
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
