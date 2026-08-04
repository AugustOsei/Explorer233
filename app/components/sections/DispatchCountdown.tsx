'use client';

import { useEffect, useState } from 'react';
import { nextDispatch } from '../../../content/dispatch-se1-01';

/**
 * Counts down to the next dispatch.
 *
 * Lives at the end of /story, not on the homepage. A clock in the homepage's
 * conversion block asked a stranger to care about the arrival date of a
 * dispatch they had not read; at the end of the story it answers the question
 * the last page actually leaves you with — when does the next one land.
 */

/**
 * Takes the ISO string, not a Date — a Date built during render is a new object
 * every pass, which would make the effect re-subscribe forever.
 */
function useCountdown(iso: string) {
  const [left, setLeft] = useState<{ d: number; h: number; m: number; s: number } | null>(null);

  useEffect(() => {
    const targetMs = new Date(iso).getTime();
    const tick = () => {
      const diff = Math.max(0, targetMs - Date.now());
      setLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [iso]);

  return left;
}

const pad = (n: number) => String(n).padStart(2, '0');

export default function DispatchCountdown() {
  const left = useCountdown(nextDispatch.releasesAt);
  const releaseDate = new Intl.DateTimeFormat('en', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(nextDispatch.releasesAt));

  return (
    <div className="text-center">
      <p
        className="font-body"
        style={{
          fontSize: '13px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--lunar-silver)',
        }}
      >
        Next dispatch in
      </p>
      {!left ? (
        <p className="font-display mt-5" style={{ fontSize: 'var(--step-1)', color: 'var(--star-white)' }}>
          Arriving {releaseDate}
        </p>
      ) : (
      <div className="mt-5 flex items-start justify-center gap-3 md:gap-5">
        {[
          [left?.d ?? 0, 'Days'],
          [left?.h ?? 0, 'Hours'],
          [left?.m ?? 0, 'Minutes'],
          [left?.s ?? 0, 'Seconds'],
        ].map(([v, label]) => (
          <div key={label as string} className="flex flex-col items-center gap-2" style={{ minWidth: '4.5rem' }}>
            <span
              className="tabnum font-display"
              style={{
                fontSize: 'clamp(1.9rem, 5vw, 3.2rem)',
                fontWeight: 300,
                lineHeight: 1,
                color: 'var(--star-white)',
                letterSpacing: '-0.03em',
              }}
            >
              {pad(v as number)}
            </span>
            <span className="eyebrow" style={{ color: 'var(--lunar-silver)', opacity: 0.6, fontSize: '10px' }}>
              {label as string}
            </span>
          </div>
        ))}
      </div>
      )}
    </div>
  );
}
