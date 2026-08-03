'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

/**
 * The figure that notices you.
 *
 * The Day Zero mask reference ships as three panels — front, three-quarter, and
 * an extreme close-up on the eyes. That is already a turn, so no generation is
 * needed: we crossfade between them based on how close the pointer is to the
 * frame.
 *
 *   pointer far    -> three-quarter, looking away
 *   pointer near   -> front, looking straight at you
 *   pointer on it  -> the eyes
 *
 * It is pointer-driven rather than scroll-driven because being watched should
 * respond to *you*, not to the page. Touch devices have no hover, so there it
 * turns once on entering view and holds the front angle.
 */

const FRAMES = [
  { src: '/images/dayzero-1.jpg', alt: 'A masked figure turned away' }, // 0: three-quarter
  { src: '/images/dayzero-0.jpg', alt: 'A masked figure facing you' }, // 1: front
  { src: '/images/dayzero-2.jpg', alt: 'The eyes behind the mask' }, // 2: close
];

export default function DayZeroWatch() {
  const ref = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    // No hover: turn to face the reader when the section comes into view.
    if (!finePointer) {
      const io = new IntersectionObserver(
        ([entry]) => setFrame(entry.isIntersecting ? 1 : 0),
        { threshold: 0.45 },
      );
      io.observe(el);
      return () => io.disconnect();
    }

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        // Normalised distance from the figure, in units of half the frame.
        const dx = (e.clientX - cx) / (r.width / 2);
        const dy = (e.clientY - cy) / (r.height / 2);
        const d = Math.hypot(dx, dy);
        setFrame(d < 0.55 ? 2 : d < 1.35 ? 1 : 0);
      });
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className="dz-watch">
      {FRAMES.map((f, i) => (
        <Image
          key={f.src}
          src={f.src}
          alt={i === frame ? f.alt : ''}
          aria-hidden={i !== frame}
          fill
          sizes="(max-width: 900px) 92vw, 46vw"
          className="dz-frame object-cover"
          style={{ opacity: i === frame ? 1 : 0 }}
          priority={i === 0}
        />
      ))}

      {/* Interference — sits over the plate so the record never reads as clean */}
      <div className="dz-scan" aria-hidden />
      <div className="dz-vignette" aria-hidden />
    </div>
  );
}
