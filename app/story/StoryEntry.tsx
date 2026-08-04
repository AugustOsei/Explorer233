'use client';

import { useEffect, useRef, useState } from 'react';
import {
  DEFAULT_READER_PREFERENCES,
  READER_ENTER_EVENT,
  READER_PREFERENCES_EVENT,
  READER_SIZES,
  READER_STORE_KEY,
  READER_THEMES,
  type ReaderPreferences,
  type SavedReader,
} from './readerPreferences';

export default function StoryEntry({ firstSceneId }: { firstSceneId: string }) {
  const [saved, setSaved] = useState<SavedReader | null>(null);
  const [preferences, setPreferences] = useState<ReaderPreferences>(DEFAULT_READER_PREFERENCES);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const entryPreviewTimer = useRef<number | null>(null);

  useEffect(() => {
    const id = window.setTimeout(() => {
      try {
        const raw = localStorage.getItem(READER_STORE_KEY);
        if (!raw) return;
        const parsed = JSON.parse(raw) as SavedReader;
        setPreferences({
          theme: parsed.theme ?? DEFAULT_READER_PREFERENCES.theme,
          size: parsed.size ?? DEFAULT_READER_PREFERENCES.size,
          illustrations: parsed.illustrations ?? DEFAULT_READER_PREFERENCES.illustrations,
        });
        if ((parsed.progress ?? 0) > 0.02) setSaved(parsed);
      } catch {
        /* Reading still works when storage is unavailable. */
      }
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => () => {
    if (entryPreviewTimer.current) window.clearTimeout(entryPreviewTimer.current);
    document.body.classList.remove('dispatch-entry-preview');
  }, []);

  useEffect(() => {
    if (!preferencesOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPreferencesOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [preferencesOpen]);

  useEffect(() => {
    const onPreferences = (event: Event) => {
      setPreferences((event as CustomEvent<ReaderPreferences>).detail);
    };
    window.addEventListener(READER_PREFERENCES_EVENT, onPreferences);
    return () => window.removeEventListener(READER_PREFERENCES_EVENT, onPreferences);
  }, []);

  const updatePreferences = (next: Partial<ReaderPreferences>) => {
    const updated = { ...preferences, ...next };
    setPreferences(updated);
    try {
      const raw = localStorage.getItem(READER_STORE_KEY);
      const current = raw ? (JSON.parse(raw) as SavedReader) : {};
      localStorage.setItem(READER_STORE_KEY, JSON.stringify({ ...current, ...updated }));
    } catch {
      /* Preferences still apply for this session through the event below. */
    }
    window.dispatchEvent(new CustomEvent<ReaderPreferences>(READER_PREFERENCES_EVENT, { detail: updated }));
  };

  const enterDispatch = () => {
    document.body.classList.add('dispatch-entry-preview');
    if (entryPreviewTimer.current) window.clearTimeout(entryPreviewTimer.current);
    entryPreviewTimer.current = window.setTimeout(() => {
      document.body.classList.remove('dispatch-entry-preview');
    }, 3200);
    window.dispatchEvent(new Event(READER_ENTER_EVENT));
    const targetId = saved?.paragraphId || saved?.sceneId || firstSceneId;
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const percentage = Math.max(1, Math.min(99, Math.round((saved?.progress ?? 0) * 100)));

  return (
    <div className="story-entry">
      <div className="story-entry-actions">
        <button type="button" className="story-entry-button" onClick={enterDispatch}>
          <span>{saved ? 'Continue reading' : 'Begin dispatch'}</span>
          <span aria-hidden>↓</span>
        </button>
        <button
          type="button"
          className="story-preferences-button"
          aria-haspopup="dialog"
          aria-expanded={preferencesOpen}
          onClick={() => setPreferencesOpen(true)}
        >
          <span aria-hidden>Aa</span>
          Reading preferences
        </button>
      </div>

      {saved && (
        <p className="story-entry-progress" aria-live="polite">
          {saved.sceneLabel ? `${saved.sceneLabel} · ` : ''}{percentage}% complete
        </p>
      )}

      {preferencesOpen && (
        <div className="story-preferences-backdrop" role="presentation" onClick={() => setPreferencesOpen(false)}>
          <div
            className="story-preferences-dialog dispatch-settings"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cover-reading-preferences-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="dispatch-panel-head">
              <div>
                <p className="story-preferences-kicker">Before you begin</p>
                <h2 id="cover-reading-preferences-title">Reading preferences</h2>
              </div>
              <button type="button" onClick={() => setPreferencesOpen(false)} aria-label="Close reading preferences">Close</button>
            </div>
            <p className="story-preferences-intro">Choose how Dispatch One appears. You can change this again while reading.</p>

            <fieldset>
              <legend>Text size</legend>
              <div className="dispatch-choice-row">
                {READER_SIZES.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    data-active={preferences.size === option.id || undefined}
                    onClick={() => updatePreferences({ size: option.id })}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend>Reading theme</legend>
              <div className="dispatch-choice-row">
                {READER_THEMES.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    data-active={preferences.theme === option.id || undefined}
                    onClick={() => updatePreferences({ theme: option.id })}
                  >
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
              <input
                type="checkbox"
                checked={preferences.illustrations}
                onChange={(event) => updatePreferences({ illustrations: event.target.checked })}
              />
            </label>
            <button type="button" className="story-preferences-done" onClick={() => setPreferencesOpen(false)}>
              Save preferences
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
