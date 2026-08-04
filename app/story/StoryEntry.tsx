'use client';

import { useEffect, useState } from 'react';

const STORE_KEY = 'e233.dispatch.se1-01.v2';

type SavedProgress = {
  sceneId?: string;
  sceneLabel?: string;
  paragraphId?: string;
  progress?: number;
};

export default function StoryEntry({ firstSceneId }: { firstSceneId: string }) {
  const [saved, setSaved] = useState<SavedProgress | null>(null);

  useEffect(() => {
    const id = window.setTimeout(() => {
      try {
        const raw = localStorage.getItem(STORE_KEY);
        if (!raw) return;
        const parsed = JSON.parse(raw) as SavedProgress;
        if ((parsed.progress ?? 0) > 0.02) setSaved(parsed);
      } catch {
        /* Reading still works when storage is unavailable. */
      }
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  const enterDispatch = () => {
    const targetId = saved?.paragraphId || saved?.sceneId || firstSceneId;
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const percentage = Math.max(1, Math.min(99, Math.round((saved?.progress ?? 0) * 100)));

  return (
    <div className="story-entry">
      <button type="button" className="story-entry-button" onClick={enterDispatch}>
        <span>{saved ? 'Continue reading' : 'Begin dispatch'}</span>
        <span aria-hidden>↓</span>
      </button>
      {saved && (
        <p className="story-entry-progress" aria-live="polite">
          {saved.sceneLabel ? `${saved.sceneLabel} · ` : ''}{percentage}% complete
        </p>
      )}
    </div>
  );
}
