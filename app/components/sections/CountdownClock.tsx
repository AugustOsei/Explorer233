'use client';

import { useEffect, useState } from 'react';

const LAUNCH_DATE = new Date('2026-08-01T00:00:00Z');

function getTimeLeft() {
  const diff = Math.max(0, LAUNCH_DATE.getTime() - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}
const pad = (n: number) => String(n).padStart(2, '0');

function Unit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-3 flex-1">
      <div
        className="tabnum font-display font-bold leading-none w-full text-center rounded-xl py-4 md:py-5"
        style={{
          fontSize: 'clamp(2rem, 6vw, 4rem)',
          color: 'var(--white-warm)',
          letterSpacing: '-0.03em',
          border: '1px solid rgba(244,241,234,0.10)',
          background: 'linear-gradient(180deg, rgba(244,241,234,0.05) 0%, rgba(244,241,234,0.01) 100%)',
        }}
      >
        {value}
      </div>
      <p className="eyebrow" style={{ color: 'rgba(244,241,234,0.45)' }}>{label}</p>
    </div>
  );
}

/**
 * The live mission clock. Lifted out of the old standalone Countdown section so it
 * can sit directly above the email form in the CTA — urgency + action in one beat.
 */
export default function CountdownClock() {
  const [t, setT] = useState(getTimeLeft());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setT(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!mounted) return <div style={{ height: '7rem' }} aria-label="Loading mission clock…" />;

  return (
    <div className="w-full">
      <div className="flex items-start justify-center gap-2 md:gap-4">
        <Unit value={pad(t.days)} label="Days" />
        <Unit value={pad(t.hours)} label="Hours" />
        <Unit value={pad(t.minutes)} label="Minutes" />
        <Unit value={pad(t.seconds)} label="Seconds" />
      </div>
      <p className="text-center mt-5 font-body" style={{ fontSize: '12px', letterSpacing: '0.18em', color: 'rgba(244,241,234,0.4)', textTransform: 'uppercase' }}>
        August 1, 2026 — 00:00 GMT
      </p>
    </div>
  );
}
