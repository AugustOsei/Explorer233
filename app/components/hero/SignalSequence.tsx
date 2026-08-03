'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * The signal sequence — the site's scrollytelling centrepiece.
 *
 * Pinned for four screens and scrubbed by scroll position, so the reader is
 * driving playback rather than watching a loop. It dramatises the exact moment
 * Dispatch One opens on, in the story's own words: "points of light began
 * appearing one after the other, until the map of nearby space looked less like
 * a sky and more like a city waking at night."
 *
 * Beats, by scroll progress:
 *   0.00–0.20  one pulse, repeating on an eleven-count
 *   0.18–0.36  WE ARE HERE resolves out of the noise
 *   0.34–0.76  stars ignite one after another; lines draw between them
 *   0.72–1.00  the field pulls back into a map, and the agency answers
 *
 * Canvas rather than video or an image sequence: a few hundred points cost
 * almost nothing, scrub instantly, stay sharp on any display, and — unlike the
 * old 242-frame JPEG hero — behave identically on iOS.
 */

const STAR_COUNT = 150;

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
/** Progress within [from,to], eased so beats settle rather than snap. */
const phase = (p: number, from: number, to: number) => {
  const t = clamp01((p - from) / (to - from));
  return t * t * (3 - 2 * t);
};

/** Deterministic PRNG so the star field is identical on every render/reload. */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

type Star = { x: number; y: number; r: number; igniteAt: number; hue: 'teal' | 'gold' | 'white' };

function buildStars(): Star[] {
  const rand = seeded(233233);
  return Array.from({ length: STAR_COUNT }, () => {
    const angle = rand() * Math.PI * 2;
    // Bias outward so the centre stays clear for the first pulse and the type.
    const radius = 0.12 + Math.pow(rand(), 0.62) * 0.62;
    const roll = rand();
    return {
      x: Math.cos(angle) * radius * 1.55,
      y: Math.sin(angle) * radius,
      r: 0.7 + rand() * 1.9,
      igniteAt: 0.36 + rand() * 0.33,
      hue: roll > 0.9 ? 'gold' : roll > 0.72 ? 'teal' : 'white',
    };
  });
}

const COLOURS = {
  white: [245, 247, 250],
  teal: [31, 166, 168],
  gold: [214, 168, 79],
} as const;

export default function SignalSequence() {
  const section = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progress = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const sectionEl = section.current;
    if (!canvas || !sectionEl) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const stars = buildStars();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w = 0;
    let h = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    // Text layers are written directly rather than through React state — this
    // runs every frame during a scrub and must not trigger re-renders.
    const layers = {
      signal: sectionEl.querySelector<HTMLElement>('[data-layer="signal"]'),
      caption: sectionEl.querySelector<HTMLElement>('[data-layer="caption"]'),
      answer: sectionEl.querySelector<HTMLElement>('[data-layer="answer"]'),
      hint: sectionEl.querySelector<HTMLElement>('[data-layer="hint"]'),
    };

    const draw = (time: number) => {
      const p = progress.current;
      const cx = w / 2;
      const cy = h / 2;
      const scale = Math.min(w, h);

      ctx.clearRect(0, 0, w, h);

      // ── Beat 1: the pulse, repeating on an eleven-count ──────────────
      const pulseLife = phase(p, 0, 0.2) * (1 - phase(p, 0.3, 0.45));
      if (pulseLife > 0.002) {
        const beat = reduced ? 0.5 : (time / 1100) % 1;
        for (let i = 0; i < 3; i++) {
          const ringT = (beat + i / 3) % 1;
          const radius = ringT * scale * 0.36;
          const alpha = (1 - ringT) * 0.5 * pulseLife;
          if (alpha <= 0.001) continue;
          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(31,166,168,${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        const core = 2.6 + Math.sin(time / 340) * 0.7;
        ctx.beginPath();
        ctx.arc(cx, cy, core * pulseLife, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245,247,250,${0.9 * pulseLife})`;
        ctx.fill();
      }

      // ── Beats 3–4: the sky wakes, then pulls back into a map ─────────
      const wake = phase(p, 0.34, 0.78);
      const pullback = phase(p, 0.72, 1);
      const spread = lerp(0.78, 1.16, pullback) * scale;
      const drift = reduced ? 0 : Math.sin(time / 6000) * 0.004;

      const placed: { x: number; y: number; lit: number }[] = [];

      stars.forEach((s) => {
        // Each star has its own ignition point inside the wake window.
        const lit = clamp01((wake - (s.igniteAt - 0.34) / 0.44) * 6);
        if (lit <= 0.001) {
          placed.push({ x: 0, y: 0, lit: 0 });
          return;
        }

        const x = cx + (s.x + drift) * spread;
        const y = cy + (s.y - drift) * spread;
        placed.push({ x, y, lit });

        const [r, g, b] = COLOURS[s.hue];
        const radius = s.r * lit * lerp(1.25, 0.85, pullback);

        // Soft halo, then the point itself.
        const halo = ctx.createRadialGradient(x, y, 0, x, y, radius * 6);
        halo.addColorStop(0, `rgba(${r},${g},${b},${0.32 * lit})`);
        halo.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(x, y, radius * 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${lit})`;
        ctx.fill();
      });

      // Constellation lines — only once the field is largely awake, so the
      // "city" reads as connections forming rather than a mesh appearing.
      const web = phase(p, 0.58, 0.92);
      if (web > 0.01) {
        ctx.lineWidth = 0.6;
        for (let i = 0; i < stars.length; i += 2) {
          const a = placed[i];
          if (!a || a.lit < 0.5) continue;
          for (let j = i + 1; j < Math.min(i + 7, stars.length); j++) {
            const b2 = placed[j];
            if (!b2 || b2.lit < 0.5) continue;
            const dx = a.x - b2.x;
            const dy = a.y - b2.y;
            const dist = Math.hypot(dx, dy);
            if (dist > scale * 0.17) continue;
            const alpha = (1 - dist / (scale * 0.17)) * 0.2 * web * a.lit * b2.lit;
            ctx.strokeStyle = `rgba(174,183,194,${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b2.x, b2.y);
            ctx.stroke();
          }
        }
      }

      // ── Text layers ──────────────────────────────────────────────────
      // Beats hand off rather than cross-fade: each layer is fully out before
      // the next comes in, since all three sit on the same centred stack.
      const signalIn = phase(p, 0.14, 0.3);
      const signalOut = phase(p, 0.34, 0.44);
      if (layers.signal) {
        layers.signal.style.opacity = String(signalIn * (1 - signalOut));
        layers.signal.style.letterSpacing = `${lerp(0.85, 0.3, signalIn)}em`;
        layers.signal.style.filter = `blur(${lerp(16, 0, signalIn)}px)`;
      }
      if (layers.caption) {
        const capIn = phase(p, 0.46, 0.58);
        layers.caption.style.opacity = String(capIn * (1 - phase(p, 0.66, 0.74)));
        layers.caption.style.transform = `translateY(${lerp(16, 0, capIn)}px)`;
      }
      if (layers.answer) {
        const ansIn = phase(p, 0.8, 0.94);
        layers.answer.style.opacity = String(ansIn);
        layers.answer.style.transform = `translateY(${lerp(24, 0, ansIn)}px)`;
        layers.answer.style.pointerEvents = ansIn > 0.6 ? 'auto' : 'none';
      }
      if (layers.hint) {
        layers.hint.style.opacity = String((1 - phase(p, 0.04, 0.16)) * 0.55);
      }
    };

    let raf = 0;
    const loop = (t: number) => {
      draw(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Reduced motion: no pin, no scrub — show the finished frame and let the
    // page scroll normally past it.
    if (reduced) {
      progress.current = 1;
      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener('resize', resize);
      };
    }

    // Pin the section itself and let ScrollTrigger create the scroll runway via
    // `end`. Sizing the section in CSS and using pinSpacing:false instead makes
    // progress run ahead of the visuals and leaves a dead gap under the pin.
    const st = ScrollTrigger.create({
      trigger: sectionEl,
      start: 'top top',
      end: '+=340%',
      pin: true,
      anticipatePin: 1,
      scrub: true,
      onUpdate: (self) => {
        progress.current = self.progress;
      },
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      st.kill();
    };
  }, []);

  return (
    <section ref={section} className="signal-seq relative" style={{ background: 'var(--deep-space-black)' }}>
      <div className="relative h-[100svh] w-full overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />

        {/* Accessible summary of what the canvas is depicting */}
        <p className="sr-only">
          In 2047, dozens of nearby stars sent the same three words — we are here. Ghana answered
          with Explorer 233.
        </p>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <h1
            data-layer="signal"
            className="font-display"
            style={{
              opacity: 0,
              fontSize: 'clamp(1.6rem, 6.5vw, 4.6rem)',
              fontWeight: 500,
              lineHeight: 1,
              color: 'var(--star-white)',
              textTransform: 'uppercase',
            }}
          >
            We are here
          </h1>

          <p
            data-layer="caption"
            className="font-body"
            style={{
              opacity: 0,
              position: 'absolute',
              maxWidth: '34ch',
              fontSize: 'var(--step-1)',
              lineHeight: 1.6,
              color: 'var(--lunar-silver)',
            }}
          >
            Not one star. Dozens — one after another, until the map of nearby space looked less
            like a sky than a city waking at night.
          </p>

          <div data-layer="answer" style={{ opacity: 0, position: 'absolute' }}>
            <p className="eyebrow" style={{ color: 'var(--lunar-silver)', opacity: 0.75 }}>
              Ghana answered
            </p>
            <p
              className="font-display mt-3"
              style={{
                fontSize: 'clamp(1.7rem, 5vw, 3.4rem)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                lineHeight: 1,
                color: 'var(--star-white)',
              }}
            >
              EXPLORER 233
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/story" className="btn-join">
                Read Dispatch One
              </Link>
              <Link href="#join" className="btn-ghost">
                Join the mission
              </Link>
            </div>
          </div>
        </div>

        <span
          data-layer="hint"
          className="eyebrow absolute inset-x-0 bottom-8 text-center"
          style={{ color: 'var(--lunar-silver)', fontSize: '10px' }}
        >
          Scroll
        </span>
      </div>
    </section>
  );
}
