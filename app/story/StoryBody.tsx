'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { Scene } from '../../content/dispatch-se1-01';
import {
  READER_ENTER_EVENT,
  READER_PREFERENCES_EVENT,
  READER_SIZES,
  READER_STORE_KEY,
  READER_THEMES,
  type ReaderPreferences,
  type ReaderSize,
  type ReaderTheme,
  type SavedReader,
} from './readerPreferences';

function isSignalMoment(paragraph: string) {
  return paragraph.trim().toUpperCase() === 'WE ARE HERE.';
}

export default function StoryBody({
  scenes,
  title,
  code,
}: {
  scenes: Scene[];
  title: string;
  code: string;
}) {
  const articleRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const saveTimer = useRef<number | null>(null);
  const chromePreviewTimer = useRef<number | null>(null);
  const restored = useRef(false);

  const [theme, setTheme] = useState<ReaderTheme>('void');
  const [size, setSize] = useState<ReaderSize>('standard');
  const [illustrations, setIllustrations] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activeScene, setActiveScene] = useState(scenes[0]?.id ?? '');
  const [readerActive, setReaderActive] = useState(false);
  const [chromeVisible, setChromeVisible] = useState(true);
  const [chromePreview, setChromePreview] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [contentsOpen, setContentsOpen] = useState(false);

  const activeSceneLabel = scenes.find((scene) => scene.id === activeScene)?.heading ?? title;

  useEffect(() => {
    const id = window.setTimeout(() => {
      try {
        const raw = localStorage.getItem(READER_STORE_KEY);
        if (raw) {
          const saved = JSON.parse(raw) as SavedReader;
          if (saved.theme) setTheme(saved.theme);
          if (saved.size) setSize(saved.size);
          if (typeof saved.illustrations === 'boolean') setIllustrations(saved.illustrations);
        }
      } catch {
        /* Reader preferences are optional. */
      } finally {
        restored.current = true;
      }
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!restored.current) return;
    try {
      const raw = localStorage.getItem(READER_STORE_KEY);
      const saved = raw ? (JSON.parse(raw) as SavedReader) : {};
      localStorage.setItem(READER_STORE_KEY, JSON.stringify({ ...saved, theme, size, illustrations }));
    } catch {
      /* Reader preferences are optional. */
    }
    window.dispatchEvent(
      new CustomEvent<ReaderPreferences>(READER_PREFERENCES_EVENT, {
        detail: { theme, size, illustrations },
      }),
    );
  }, [theme, size, illustrations]);

  useEffect(() => {
    const onPreferences = (event: Event) => {
      const preferences = (event as CustomEvent<ReaderPreferences>).detail;
      setTheme(preferences.theme);
      setSize(preferences.size);
      setIllustrations(preferences.illustrations);
    };
    const onEnter = () => {
      setChromePreview(true);
      setChromeVisible(true);
      if (chromePreviewTimer.current) window.clearTimeout(chromePreviewTimer.current);
      chromePreviewTimer.current = window.setTimeout(() => setChromePreview(false), 3200);
    };

    window.addEventListener(READER_PREFERENCES_EVENT, onPreferences);
    window.addEventListener(READER_ENTER_EVENT, onEnter);
    return () => {
      window.removeEventListener(READER_PREFERENCES_EVENT, onPreferences);
      window.removeEventListener(READER_ENTER_EVENT, onEnter);
      if (chromePreviewTimer.current) window.clearTimeout(chromePreviewTimer.current);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dispatch-reading', readerActive);
    return () => document.body.classList.remove('dispatch-reading');
  }, [readerActive]);

  useEffect(() => {
    const article = articleRef.current;
    if (!article) return;

    let frame = 0;
    const update = () => {
      const articleRect = article.getBoundingClientRect();
      const total = Math.max(1, articleRect.height - window.innerHeight);
      const nextProgress = Math.min(1, Math.max(0, -articleRect.top / total));
      const active = articleRect.top < window.innerHeight * 0.2 && articleRect.bottom > window.innerHeight * 0.5;
      const delta = window.scrollY - lastScrollY.current;

      setProgress(nextProgress);
      setReaderActive(active);
      if (!active || delta < -5) setChromeVisible(true);
      else if (delta > 7 && window.scrollY > article.offsetTop + 80) setChromeVisible(false);
      lastScrollY.current = window.scrollY;

      if (active) {
        const paragraphs = article.querySelectorAll<HTMLElement>('[data-reader-paragraph]');
        const readingLine = window.innerHeight * 0.38;
        let current = paragraphs[0];
        for (const paragraph of paragraphs) {
          if (paragraph.getBoundingClientRect().top <= readingLine) current = paragraph;
          else break;
        }

        if (current) {
          const section = current.closest<HTMLElement>('[data-reader-scene]');
          const sceneId = section?.dataset.readerScene ?? scenes[0]?.id ?? '';
          const sceneLabel = scenes.find((scene) => scene.id === sceneId)?.heading ?? title;
          setActiveScene(sceneId);

          if (saveTimer.current) window.clearTimeout(saveTimer.current);
          saveTimer.current = window.setTimeout(() => {
            try {
              localStorage.setItem(
                READER_STORE_KEY,
                JSON.stringify({
                  theme,
                  size,
                  illustrations,
                  sceneId,
                  sceneLabel,
                  paragraphId: current.id,
                  progress: nextProgress,
                }),
              );
            } catch {
              /* Progress persistence is a convenience, never a requirement. */
            }
          }, 180);
        }
      }
    };

    const onScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.cancelAnimationFrame(frame);
      if (saveTimer.current) window.clearTimeout(saveTimer.current);
    };
  }, [illustrations, scenes, size, theme, title]);

  const goToScene = (id: string) => {
    setContentsOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      className="dispatch-reader"
      data-theme={theme}
      data-size={size}
      data-illustrations={illustrations ? 'on' : 'off'}
      aria-label={`${title}, Dispatch ${code}`}
    >
      <div
        className="dispatch-reader-chrome"
        data-active={readerActive || undefined}
        data-visible={chromeVisible || chromePreview || settingsOpen || contentsOpen || undefined}
      >
        <div className="dispatch-progress" aria-hidden>
          <div style={{ width: `${progress * 100}%` }} />
        </div>
        <div className="dispatch-chrome-inner">
          <div className="dispatch-chrome-location">
            <span className="dispatch-chrome-code tabnum">{code}</span>
            <span className="dispatch-chrome-scene">{activeSceneLabel}</span>
          </div>
          <div className="dispatch-chrome-actions">
            <span className="dispatch-percentage tabnum">{Math.round(progress * 100)}%</span>
            <button type="button" onClick={() => { setContentsOpen(true); setSettingsOpen(false); }}>
              Contents
            </button>
            <button
              type="button"
              className="dispatch-aa"
              aria-label="Reading settings"
              aria-expanded={settingsOpen}
              onClick={() => { setSettingsOpen((open) => !open); setContentsOpen(false); }}
            >
              Aa
            </button>
          </div>
        </div>
      </div>

      {settingsOpen && (
        <div className="dispatch-panel dispatch-settings" role="dialog" aria-label="Reading settings">
          <div className="dispatch-panel-head">
            <h2>Reading settings</h2>
            <button type="button" onClick={() => setSettingsOpen(false)} aria-label="Close reading settings">Close</button>
          </div>
          <fieldset>
            <legend>Text size</legend>
            <div className="dispatch-choice-row">
              {READER_SIZES.map((option) => (
                <button key={option.id} type="button" data-active={size === option.id || undefined} onClick={() => setSize(option.id)}>
                  {option.label}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend>Reading theme</legend>
            <div className="dispatch-choice-row">
              {READER_THEMES.map((option) => (
                <button key={option.id} type="button" data-active={theme === option.id || undefined} onClick={() => setTheme(option.id)}>
                  {option.label}
                </button>
              ))}
            </div>
          </fieldset>
          <label className="dispatch-illustration-toggle">
            <span>
              <strong>Illustrations</strong>
              <small>Keep cinematic scene artwork in the story</small>
            </span>
            <input type="checkbox" checked={illustrations} onChange={(event) => setIllustrations(event.target.checked)} />
          </label>
        </div>
      )}

      {contentsOpen && (
        <div className="dispatch-drawer-backdrop" role="presentation" onClick={() => setContentsOpen(false)}>
          <aside className="dispatch-contents" role="dialog" aria-modal="true" aria-label="Dispatch contents" onClick={(event) => event.stopPropagation()}>
            <div className="dispatch-panel-head">
              <div>
                <p className="dispatch-drawer-kicker">Dispatch {code}</p>
                <h2>{title}</h2>
              </div>
              <button type="button" onClick={() => setContentsOpen(false)} aria-label="Close contents">Close</button>
            </div>
            <ol>
              {scenes.map((scene, index) => (
                <li key={scene.id}>
                  <button type="button" data-active={activeScene === scene.id || undefined} onClick={() => goToScene(scene.id)}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <strong>{scene.heading ?? `Scene ${index + 1}`}</strong>
                    {scene.sub && <small>{scene.sub}</small>}
                  </button>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      )}

      <div id="read-dispatch" ref={articleRef} className="dispatch-article">
        {scenes.map((scene, sceneIndex) => {
          const sceneNumber = String(sceneIndex + 1).padStart(2, '0');
          const visualStyle = sceneIndex === 0 || sceneIndex >= scenes.length - 2 ? 'cinematic' : sceneIndex % 2 ? 'inset' : 'wide';

          return (
            <section key={scene.id} id={scene.id} className="dispatch-scene" data-reader-scene={scene.id}>
              {scene.art && illustrations && (
                <figure className="dispatch-plate" data-layout={visualStyle}>
                  <div className="dispatch-plate-image">
                    <Image
                      src={scene.art.src}
                      alt={scene.art.alt}
                      fill
                      sizes="100vw"
                      loading={sceneIndex === 0 ? 'eager' : 'lazy'}
                      className="object-cover"
                    />
                    <div className="dispatch-plate-scrim" aria-hidden />
                  </div>
                  <figcaption className="dispatch-scene-title">
                    <span className="dispatch-scene-number tabnum">Scene {sceneNumber}</span>
                    <h2>{scene.heading}</h2>
                    {scene.sub && <p>{scene.sub}</p>}
                  </figcaption>
                </figure>
              )}

              {!scene.art || !illustrations ? (
                <header className="dispatch-scene-title dispatch-scene-title--text">
                  <span className="dispatch-scene-number tabnum">Scene {sceneNumber}</span>
                  <h2>{scene.heading}</h2>
                  {scene.sub && <p>{scene.sub}</p>}
                </header>
              ) : null}

              <div className="dispatch-prose">
                {scene.paragraphs.map((paragraph, paragraphIndex) => {
                  const paragraphId = `${scene.id}-p-${paragraphIndex + 1}`;
                  if (isSignalMoment(paragraph)) {
                    return (
                      <p key={paragraphId} id={paragraphId} className="dispatch-signal-moment" data-reader-paragraph>
                        <span>We are here.</span>
                      </p>
                    );
                  }

                  return (
                    <p
                      key={paragraphId}
                      id={paragraphId}
                      data-reader-paragraph
                      className={`dispatch-paragraph${paragraphIndex === 0 ? ' dispatch-lede' : ''}${paragraph.startsWith('“') ? ' dispatch-dialogue' : ''}`}
                    >
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
}
