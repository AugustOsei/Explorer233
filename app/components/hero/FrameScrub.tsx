'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-scrubbed image sequence on a canvas.
 *
 * This is the technique the live site already proved on iPhone: decoded JPEGs
 * drawn to a 2D canvas, indexed by scroll position. Video scrubbing is what
 * iOS throttles — a frame sequence sidesteps it entirely, stays sharp at any
 * DPR, and lets the reader control playback speed, so a returning visitor can
 * flick past in under a second.
 *
 * Recovered and generalised from the original HeroScene: the frame source and
 * runway are now props, so a new sequence is a data change rather than a
 * rewrite. Overlay content is positioned by the caller and driven through
 * `onProgress`, which is called on every scrub tick — write to the DOM there,
 * never to React state, or you will re-render a few hundred times a second.
 */
export default function FrameScrub({
  count,
  src,
  runway = '+=320%',
  className,
  children,
  onProgress,
}: {
  count: number;
  src: (i: number) => string;
  runway?: string;
  className?: string;
  children?: React.ReactNode;
  onProgress?: (p: number) => void;
}) {
  const container = useRef<HTMLDivElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !container.current) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const frames: HTMLImageElement[] = new Array(count);
    let current = -1;
    let firstLoaded = false;

    const clamp = (n: number, a: number, b: number) => Math.min(Math.max(n, a), b);

    // object-fit: cover, done by hand so the canvas matches the CSS box.
    const draw = (index: number, force = false) => {
      const i = clamp(Math.round(index), 0, count - 1);
      if (i === current && !force) return;
      const img = frames[i];
      if (!img || !img.complete || img.naturalWidth === 0) return;
      current = i;

      const cw = canvas.width;
      const ch = canvas.height;
      const ir = img.naturalWidth / img.naturalHeight;
      const cr = cw / ch;
      let dw: number, dh: number, dx: number, dy: number;
      if (ir > cr) {
        dh = ch;
        dw = ch * ir;
        dx = (cw - dw) / 2;
        dy = 0;
      } else {
        dw = cw;
        dh = cw / ir;
        dx = 0;
        dy = (ch - dh) / 2;
      }
      ctx.drawImage(img, dx, dy, dw, dh);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      draw(current < 0 ? 0 : current, true);
    };

    for (let i = 0; i < count; i++) {
      const img = new window.Image();
      img.src = src(i + 1);
      if (i === 0) {
        img.onload = () => {
          if (!firstLoaded) {
            firstLoaded = true;
            resize();
          }
        };
      }
      frames[i] = img;
    }

    resize();
    window.addEventListener('resize', resize);

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      draw(count - 1, true);
      onProgress?.(1);
      return () => window.removeEventListener('resize', resize);
    }

    const trigger = ScrollTrigger.create({
      trigger: container.current,
      pin: pin.current,
      start: 'top top',
      end: runway,
      // Numeric scrub eases the playhead toward the scroll position rather than
      // snapping, so the sequence glides between frames instead of stepping.
      scrub: 0.8,
      onUpdate(self) {
        draw(self.progress * (count - 1));
        onProgress?.(self.progress);
      },
    });

    return () => {
      window.removeEventListener('resize', resize);
      trigger.kill();
    };
  }, [count, src, runway, onProgress]);

  return (
    <section ref={container} className={className}>
      <div ref={pin} className="relative h-[100svh] w-full overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />
        {children}
      </div>
    </section>
  );
}
