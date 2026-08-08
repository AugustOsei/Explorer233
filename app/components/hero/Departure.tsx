'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * The homepage. Not a stack of sections — one continuous shot, one pin.
 *
 *   0.00–0.16  closed chamber doors; the agency states itself
 *   0.16–0.30  doors withdraw, light seam blooms, the vessel is revealed ONCE
 *   0.30–0.94  472 frames: ignition, ascent through the roof, the vessel banks
 *              and turns until the camera is behind its four fusion nozzles,
 *              then launches away into hyperspeed and is gone
 *   0.94–1.00  held starlight, then the pin releases
 *
 * The shot ends on the departure. A crew grid used to fade up over the last
 * 12% — it has moved to its own section (TheWorld), because the ending of this
 * sequence is the ship leaving, not a cast list appearing in the exhaust.
 *
 * Everything lives on a single canvas plus DOM layers driven from one scrub
 * callback, so the ship is never re-introduced and the reader never restarts.
 * Writes go straight to the DOM: this fires on every scroll tick and React
 * state here would re-render the tree hundreds of times a second.
 */

const FRAMES = 472;
const framePath = (i: number) => `/hero-frames/f${String(i).padStart(3, '0')}.jpg`;

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
/** Eased progress across [a,b] so beats settle instead of snapping. */
const span = (p: number, a: number, b: number) => {
  const t = clamp01((p - a) / (b - a));
  return t * t * (3 - 2 * t);
};

export default function Departure() {
  const root = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = root.current;
    const canvas = canvasRef.current;
    if (!el || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const q = <T extends HTMLElement>(sel: string) => el.querySelector<T>(sel);
    const layers = {
      titles: q('[data-l="titles"]'),
      seam: q('[data-l="seam"]'),
      left: q('[data-l="left"]'),
      right: q('[data-l="right"]'),
      bloom: q('[data-l="bloom"]'),
      line: q('[data-l="line"]'),
      linescrim: q('[data-l="linescrim"]'),
    };

    const frames: Array<HTMLImageElement | undefined> = new Array(FRAMES);
    const frameLoads: Array<Promise<void> | undefined> = new Array(FRAMES);
    // A frame counts as ready only once it is *decoded*, not merely loaded.
    // `complete && naturalWidth > 0` is true the instant the bytes land, and
    // drawing then makes the first drawImage of every frame decode a 1280x720
    // JPEG synchronously inside a scroll tick.
    const ready = new Set<number>();
    let current = -1;
    let desired = 0;
    let disposed = false;
    let pumpTimer: number | undefined;

    const draw = (index: number, force = false) => {
      const target = Math.min(Math.max(Math.round(index), 0), FRAMES - 1);
      desired = target;
      let i = target;
      if (!ready.has(i)) {
        for (let distance = 1; distance < FRAMES; distance++) {
          const before = target - distance;
          const after = target + distance;
          if (before >= 0 && ready.has(before)) {
            i = before;
            break;
          }
          if (after < FRAMES && ready.has(after)) {
            i = after;
            break;
          }
        }
      }
      if (i === current && !force) return;
      const img = frames[i];
      if (!img || !ready.has(i) || img.naturalWidth === 0) return;
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

    const loadFrame = (index: number) => {
      const i = Math.min(Math.max(index, 0), FRAMES - 1);
      if (ready.has(i)) return Promise.resolve();
      if (frameLoads[i]) return frameLoads[i];

      const request = new Promise<void>((resolve) => {
        const image = new window.Image();
        image.decoding = 'async';

        const settle = () => {
          ready.add(i);
          // Repaint only if the reader is near this frame — otherwise a late
          // arrival from the prefetch queue would yank the canvas backwards.
          if (!disposed && Math.abs(i - desired) <= 8) draw(desired, true);
          resolve();
        };

        image.onload = () => {
          // Decode off the main thread so the scrub never stalls on it. Engines
          // that reject decode() still paint correctly — the bytes are there,
          // they just decode lazily on first draw as before.
          const decoded = image.decode?.();
          if (decoded) decoded.then(settle, settle);
          else settle();
        };
        image.onerror = () => resolve();
        frames[i] = image;
        image.src = framePath(i + 1);
      });
      frameLoads[i] = request;
      return request;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      draw(current < 0 ? 0 : current, true);
    };

    resize();
    window.addEventListener('resize', resize);

    const apply = (p: number) => {
      // Doors hold shut, then withdraw. Frame 0 (the vessel in its chamber) is
      // already painted behind them, so parting them IS the reveal.
      const open = span(p, 0.16, 0.3);
      if (layers.left) layers.left.style.transform = `translateX(${-100 * open}%)`;
      if (layers.right) layers.right.style.transform = `translateX(${100 * open}%)`;
      if (layers.seam) {
        // Burns off well before the doors finish, so no light bar is left lying
        // across the revealed vessel.
        const seam = Math.sin(Math.min(open / 0.55, 1) * Math.PI);
        layers.seam.style.opacity = String(seam * 0.85);
        layers.seam.style.transform = `translateX(-50%) scaleX(${0.2 + open * 0.8})`;
      }

      // Opening titles sit on the closed doors and clear as they part. Fully
      // legible at p=0 — they used to ramp in from 0.02, so the page loaded on a
      // blank dark screen and you had to scroll before anything said what this
      // was. The first frame is the title card now.
      if (layers.titles) {
        const out = span(p, 0.14, 0.24);
        layers.titles.style.opacity = String(1 - out);
        layers.titles.style.transform = `translateY(${-out * 30}px)`;
        // The card holds a real link now, and it covers the whole viewport.
        // Opacity 0 does not stop clicks, so once it has cleared it must stop
        // accepting them or an invisible CTA sits over the entire sequence.
        layers.titles.style.pointerEvents = out > 0.5 ? 'none' : 'auto';
      }

      // The sequence itself: ignition → ascent → turn to stern → departure. Runs
      // almost to the pin release. The former held beat of empty starlight made
      // the next section feel late, so the premise now follows the launch
      // without a waiting room.
      const targetFrame = Math.round(span(p, 0.3, 0.985) * (FRAMES - 1));
      void loadFrame(targetFrame);
      if (p > 0.01) {
        for (let offset = 1; offset <= 4; offset++) {
          void loadFrame(targetFrame - offset);
          void loadFrame(targetFrame + offset);
        }
      }
      draw(targetFrame);

      if (layers.bloom) {
        layers.bloom.style.opacity = String(Math.sin(span(p, 0.3, 0.46) * Math.PI) * 0.5);
      }

      // One caption, over the ascent, gone before the stars. The scrim rides
      // the same curve: at this point in the sequence the frame is a white hull
      // against daylit sky, and the caption was illegible over it.
      if (layers.line) {
        const inn = span(p, 0.46, 0.56);
        const out = span(p, 0.68, 0.78);
        const vis = inn * (1 - out);
        layers.line.style.opacity = String(vis);
        layers.line.style.transform = `translateY(${(1 - inn) * 22 - out * 30}px)`;
        if (layers.linescrim) layers.linescrim.style.opacity = String(vis);
      }

      // Hold the final frame until the pin releases. Fading the canvas before
      // the next section arrived created an empty starfield waiting room.
      canvas.style.opacity = '1';
      canvas.style.transform = 'none';

    };

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      void loadFrame(0).then(() => resize());
      return () => {
        disposed = true;
        window.removeEventListener('resize', resize);
      };
    }

    // Prefetch in two passes.
    //
    // Pass 1 — sparse anchors, started before the visitor scrolls. `draw` falls
    // back to the nearest ready frame, so once these land every scroll position
    // already has *something* within `frameStep` to show. ~60 frames, ~2.5 MB.
    //
    // Pass 2 — every remaining frame, in playback order, refining that coarse
    // pass to the full 472. This is the part that costs real bandwidth (~21 MB
    // all told), so it only starts once the visitor actually scrolls into the
    // sequence. Someone who lands and leaves never pays for it.
    //
    // Previously both were one sparse pass gated on first scroll, which meant a
    // first-time visitor began scrolling with an empty buffer and then watched
    // what is really a 60-frame version of a 472-frame shot. Returning visitors
    // saw it play smoothly off disk cache, which is why it only ever looked
    // broken to new arrivals.
    const frameStep = window.innerWidth <= 640 ? 10 : 8;
    const anchors: number[] = [];
    for (let i = 0; i < FRAMES; i += frameStep) anchors.push(i);
    if (anchors[anchors.length - 1] !== FRAMES - 1) anchors.push(FRAMES - 1);

    const queued = new Set<number>(anchors);
    const queue = [...anchors];
    let queueCursor = 0;
    let pumping = false;
    let refineQueued = false;

    const pumpFrames = () => {
      pumpTimer = undefined;
      if (disposed || queueCursor >= queue.length) {
        pumping = false;
        return;
      }
      pumping = true;
      const batch = queue.slice(queueCursor, queueCursor + 6);
      queueCursor += batch.length;
      void Promise.all(batch.map(loadFrame)).then(() => {
        // Yield between batches so prefetching never competes with a scroll
        // tick, but without the old 120ms stall that made the fill slower than
        // an average visitor scrolls.
        if (disposed) pumping = false;
        else pumpTimer = window.setTimeout(pumpFrames, 16);
      });
    };

    // Guarded so the refinement pass and the initial idle callback can both ask
    // to start without ever running two pumps against the same cursor.
    const startPump = () => {
      if (!disposed && !pumping) pumpFrames();
    };

    const queueRefinement = () => {
      if (refineQueued) return;
      refineQueued = true;
      for (let i = 0; i < FRAMES; i++) {
        if (!queued.has(i)) {
          queued.add(i);
          queue.push(i);
        }
      }
      // The pump stops when it drains the queue, so if pass 1 already finished
      // it needs restarting.
      startPump();
    };

    void loadFrame(0).then(() => {
      if (disposed) return;
      resize();
      // Frame 0 and the fonts get the network to themselves first; the anchor
      // pass fills in while the visitor is still reading the title card.
      if (typeof window.requestIdleCallback === 'function') {
        window.requestIdleCallback(startPump, { timeout: 1500 });
      } else {
        pumpTimer = window.setTimeout(startPump, 300);
      }
    });

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: '+=215%',
      pin: true,
      anticipatePin: 1,
      scrub: 0.8,
      onUpdate: (self) => {
        if (self.progress > 0.01) queueRefinement();
        apply(self.progress);
      },
    });

    apply(0);

    return () => {
      disposed = true;
      if (pumpTimer !== undefined) window.clearTimeout(pumpTimer);
      window.removeEventListener('resize', resize);
      st.kill();
    };
  }, []);

  // Transparent, not deep-space-black: the canvas covers the viewport for the
  // whole shot, and once it dissolves at the end the shared StarSky behind the
  // page has to show through. An opaque background here would fade the streaks
  // into a black rectangle instead.
  return (
    <section ref={root} className="relative" style={{ background: 'var(--deep-space-black)' }}>
      {/* Frame 0 is the vessel sitting in its chamber, already painted behind
          the closed doors before anyone scrolls — so it is above the fold and
          wants a preload. React hoists this into <head>. */}
      <link rel="preload" as="image" href={framePath(1)} fetchPriority="high" />

      <div className="relative h-[100svh] w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          style={{ willChange: 'opacity, transform' }}
          aria-hidden
        />

        <p className="sr-only">
          Chamber doors open on the Nipa Nsa, Explorer 233’s first ship. It ignites, climbs
          out of the agency’s headquarters in Accra, turns away until only its four engines
          face the viewer, then accelerates until nothing is left but streaking starlight.
        </p>

        {/* Engine bloom */}
        <div
          data-l="bloom"
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{
            opacity: 0,
            background: 'radial-gradient(ellipse 55% 30% at 50% 68%, rgba(120,190,255,0.55), transparent 70%)',
            mixBlendMode: 'screen',
          }}
        />

        {/* Seam of light between the doors */}
        <div
          data-l="seam"
          aria-hidden
          className="absolute inset-y-0 left-1/2 z-[3]"
          style={{
            width: 'clamp(6rem, 16vw, 16rem)',
            opacity: 0,
            transform: 'translateX(-50%) scaleX(0.2)',
            background:
              'linear-gradient(90deg, transparent, rgba(245,247,250,0.5) 42%, rgba(255,255,255,0.92) 50%, rgba(245,247,250,0.5) 58%, transparent)',
            filter: 'blur(10px)',
          }}
        />

        {/* The chamber doors */}
        <div data-l="left" className="wall-panel absolute inset-y-0 left-0 w-1/2 z-[4]" aria-hidden />
        <div data-l="right" className="wall-panel wall-panel--right absolute inset-y-0 right-0 w-1/2 z-[4]" aria-hidden />

        {/* Opening titles, on the closed doors. Opaque in the markup, not just
            once GSAP runs: this is the first thing painted, and it has to be
            readable before hydration. */}
        <div
          data-l="titles"
          className="absolute inset-0 z-[5] flex flex-col items-center justify-center px-6 text-center"
          style={{ opacity: 1 }}
        >
          {/* Say the premise. Plainly.

              Several earlier passes here were atmosphere — "an original
              science-fiction universe from Ghana", "for all of history we
              listened to a silent sky", "the sky is no longer silent". They
              were written under the old brief's rule that canon must stay
              hidden because "the mystery IS the product". That rule suits a
              pre-launch teaser and actively harms a live front door: a stranger
              cannot be intrigued by a thing they cannot identify.

              The bar for this block: someone who reads only this should be able
              to describe Explorer 233 to a friend. Company, signals, the three
              words, and the fact that it is opposed. Keep it concrete. */}
          <h1
            className="font-display balance"
            style={{
              fontSize: 'clamp(2.4rem, 7vw, 5.8rem)',
              fontWeight: 450,
              letterSpacing: '-0.03em',
              lineHeight: 1.02,
              color: 'var(--star-white)',
              maxWidth: '18ch',
            }}
          >
            Welcome to Explorer 233
          </h1>
          <p
            className="font-body mt-5"
            style={{
              fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
              lineHeight: 1.5,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'rgba(245,247,250,0.7)',
            }}
          >
            An African science-fiction saga
          </p>
          <p className="hero-enter mt-10">Scroll to enter</p>
        </div>

        {/* Legibility scrim for the caption below. Full-bleed, so it cannot be
            constrained by the content column. */}
        <div
          data-l="linescrim"
          aria-hidden
          className="absolute inset-x-0 bottom-0 z-[4] pointer-events-none"
          style={{
            height: '52%',
            opacity: 0,
            background:
              'linear-gradient(to top, rgba(5,7,11,0.94) 0%, rgba(5,7,11,0.72) 32%, rgba(5,7,11,0.3) 62%, transparent 100%)',
          }}
        />

        {/* The caption, over the ascent */}
        <div className="absolute inset-x-0 bottom-0 z-[5] pb-12 md:pb-16">
          <div className="chapter-shell">
            <div data-l="line" style={{ opacity: 0, maxWidth: '34rem' }}>
              {/* This captions what is on screen. It used to be a line of
                  Laura's commissioning speech — "if we keep waiting for
                  permission…" — which is a fine line but captioned nothing: the
                  reader is watching a ship leave a building and being handed an
                  abstract rhetorical question by someone they have not met.
                  Name the ship, say what it is, translate the name. The proverb
                  also sets up the collaborate card's headline further down. */}
              <h2
                className="font-display font-medium balance"
                style={{
                  fontSize: 'var(--step-3)',
                  lineHeight: 1.12,
                  letterSpacing: '-0.02em',
                  color: 'var(--star-white)',
                }}
              >
                Buckle up.
              </h2>
              <p
                className="font-body mt-4"
                style={{ fontSize: 'var(--step-0)', lineHeight: 1.65, color: 'var(--star-white)', maxWidth: '44ch' }}
              >
                We’re venturing into a world of adventure — one episode at a time.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
