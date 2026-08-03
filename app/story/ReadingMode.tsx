'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { Scene } from '../../content/dispatch-se1-01';

/**
 * Reading mode — the dispatch as a book rather than a web page.
 *
 * Real pagination, not chapter-jumping: the prose flows into CSS columns the
 * width of the viewport and we translate sideways one column at a time, so
 * pages reflow correctly when the reader changes type size. Text only in here
 * by design — images inside a multi-column flow break across pages, and this
 * mode exists for sustained reading, not for looking at plates.
 *
 * Type size, theme and position are persisted, so closing the overlay and
 * coming back tomorrow lands you where you stopped.
 */

const THEMES = [
  { id: 'void', label: 'Void' },
  { id: 'sepia', label: 'Sepia' },
  { id: 'paper', label: 'Paper' },
] as const;

const SIZES = [
  { id: 's', label: 'A', px: 16 },
  { id: 'm', label: 'A', px: 18.5 },
  { id: 'l', label: 'A', px: 21 },
] as const;

type ThemeId = (typeof THEMES)[number]['id'];
type SizeId = (typeof SIZES)[number]['id'];

const STORE_KEY = 'e233.reader.v1';

export default function ReadingMode({
  scenes,
  title,
  code,
  onClose,
}: {
  scenes: Scene[];
  title: string;
  code: string;
  onClose: () => void;
}) {
  const viewport = useRef<HTMLDivElement>(null);
  const flow = useRef<HTMLDivElement>(null);

  const [theme, setTheme] = useState<ThemeId>('void');
  const [size, setSize] = useState<SizeId>('m');
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);
  const [ready, setReady] = useState(false);

  // Restore saved preferences + position.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as { theme?: ThemeId; size?: SizeId; page?: number };
      if (saved.theme) setTheme(saved.theme);
      if (saved.size) setSize(saved.size);
      if (typeof saved.page === 'number') setPage(saved.page);
    } catch {
      /* corrupt or unavailable storage is not worth breaking the reader over */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify({ theme, size, page }));
    } catch {
      /* private mode — fine, just don't persist */
    }
  }, [theme, size, page]);

  // Measure how many columns the prose actually occupies. Runs after layout so
  // the first paint is never a wrong page count.
  const measure = useCallback(() => {
    const vp = viewport.current;
    const fl = flow.current;
    if (!vp || !fl) return;
    const colWidth = vp.clientWidth;
    const gap = Math.round(colWidth * 0.08);
    fl.style.columnWidth = `${colWidth}px`;
    fl.style.columnGap = `${gap}px`;
    fl.style.height = `${vp.clientHeight}px`;
    const total = Math.max(1, Math.round((fl.scrollWidth + gap) / (colWidth + gap)));
    setPages(total);
    setPage((p) => Math.min(p, total - 1));
    setReady(true);
  }, []);

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (viewport.current) ro.observe(viewport.current);
    return () => ro.disconnect();
  }, [measure, size]);

  const go = useCallback(
    (delta: number) => setPage((p) => Math.min(Math.max(p + delta, 0), pages - 1)),
    [pages],
  );

  // Keyboard: arrows/space page, Escape leaves.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return onClose();
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        go(1);
      }
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        go(-1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, onClose]);

  // Lock the page behind the overlay.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Swipe.
  const touch = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touch.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touch.current === null) return;
    const dx = e.changedTouches[0].clientX - touch.current;
    if (Math.abs(dx) > 45) go(dx < 0 ? 1 : -1);
    touch.current = null;
  };

  const px = SIZES.find((s) => s.id === size)!.px;
  const progress = pages > 1 ? page / (pages - 1) : 1;

  return (
    <div className="reader" data-theme={theme} role="dialog" aria-modal="true" aria-label={`${title}, reading mode`}>
      {/* Chrome */}
      <header className="reader-bar">
        <div className="reader-bar-left">
          <span className="reader-code tabnum">{code}</span>
          <span className="reader-title">{title}</span>
        </div>

        <div className="reader-tools">
          <div className="reader-group" role="group" aria-label="Text size">
            {SIZES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSize(s.id)}
                data-active={size === s.id || undefined}
                aria-label={`Text size ${i + 1} of 3`}
                style={{ fontSize: `${11 + i * 3}px` }}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="reader-group" role="group" aria-label="Theme">
            {THEMES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTheme(t.id)}
                data-active={theme === t.id || undefined}
              >
                {t.label}
              </button>
            ))}
          </div>

          <button type="button" className="reader-close" onClick={onClose} aria-label="Close reading mode">
            Close
          </button>
        </div>
      </header>

      {/* Page surface */}
      <div className="reader-stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <button type="button" className="reader-edge reader-edge--prev" onClick={() => go(-1)} aria-label="Previous page" />
        <button type="button" className="reader-edge reader-edge--next" onClick={() => go(1)} aria-label="Next page" />

        <div ref={viewport} className="reader-viewport">
          <div
            ref={flow}
            className="reader-flow"
            style={{
              fontSize: `${px}px`,
              transform: `translateX(calc(-${page} * (100% + ${Math.round(100 * 0.08)}%)))`,
              opacity: ready ? 1 : 0,
            }}
          >
            {scenes.map((scene) => (
              <section key={scene.id}>
                {scene.heading && (
                  <h2 className="reader-scene">
                    {scene.heading}
                    {scene.sub && <span className="reader-scene-sub tabnum">{scene.sub}</span>}
                  </h2>
                )}
                {scene.paragraphs.map((p, i) => (
                  <p key={i} className={p.startsWith('“') ? 'reader-p reader-p--dialogue' : 'reader-p'}>
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="reader-foot">
        <div className="reader-progress" aria-hidden>
          <div style={{ width: `${progress * 100}%` }} />
        </div>
        <p className="reader-count tabnum">
          {page + 1} / {pages}
        </p>
      </footer>
    </div>
  );
}
