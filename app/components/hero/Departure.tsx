'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * The homepage. Not a stack of sections — one continuous shot, one pin.
 *
 *   0.00–0.16  closed chamber doors; the agency states itself
 *   0.16–0.30  doors withdraw, light seam blooms, the vessel is revealed ONCE
 *   0.30–0.88  455 frames: ignition, ascent through the roof, the vessel banks
 *              and turns until the camera is behind its four fusion nozzles,
 *              then it boosts away into orbit
 *   0.88–1.00  Laura, Maximus and Mam resolve out of the frame it leaves behind
 *
 * Everything lives on a single canvas plus DOM layers driven from one scrub
 * callback, so the ship is never re-introduced and the reader never restarts.
 * Writes go straight to the DOM: this fires on every scroll tick and React
 * state here would re-render the tree hundreds of times a second.
 */

const FRAMES = 455;
const framePath = (i: number) => `/hero-frames/f${String(i).padStart(3, '0')}.jpg`;

const CREW = [
  { src: '/images/char-laura-full.jpg', name: 'Laura Osei Baako', role: 'Founder', pos: '50% 14%' },
  { src: '/images/char-maximus.jpg', name: 'Maximus Boateng', role: 'Mission Director', pos: '50% 18%' },
  { src: '/images/char-mam.jpg', name: 'Menaye Ama Mensah', role: 'Physics student', pos: '50% 20%' },
];

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
      crew: q('[data-l="crew"]'),
      cue: q('[data-l="cue"]'),
    };

    const frames: HTMLImageElement[] = new Array(FRAMES);
    let current = -1;
    let ready = false;

    const draw = (index: number, force = false) => {
      const i = Math.min(Math.max(Math.round(index), 0), FRAMES - 1);
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

    for (let i = 0; i < FRAMES; i++) {
      const img = new window.Image();
      img.src = framePath(i + 1);
      if (i === 0) {
        img.onload = () => {
          if (!ready) {
            ready = true;
            resize();
          }
        };
      }
      frames[i] = img;
    }
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

      // Opening titles sit on the closed doors and clear as they part.
      if (layers.titles) {
        const inn = span(p, 0.02, 0.1);
        const out = span(p, 0.14, 0.24);
        layers.titles.style.opacity = String(inn * (1 - out));
        layers.titles.style.transform = `translateY(${-out * 30}px)`;
      }

      // The sequence itself: ignition → ascent → turn to stern → departure.
      draw(span(p, 0.3, 0.88) * (FRAMES - 1));

      if (layers.bloom) {
        layers.bloom.style.opacity = String(Math.sin(span(p, 0.3, 0.46) * Math.PI) * 0.5);
      }

      // One line, over the ascent, gone before the stars.
      if (layers.line) {
        const inn = span(p, 0.46, 0.56);
        const out = span(p, 0.68, 0.78);
        layers.line.style.opacity = String(inn * (1 - out));
        layers.line.style.transform = `translateY(${(1 - inn) * 22 - out * 30}px)`;
      }

      // The payoff: the crew resolve out of the starfield the ship vanished into.
      if (layers.crew) {
        const inn = span(p, 0.89, 0.98);
        layers.crew.style.opacity = String(inn);
        layers.crew.style.transform = `translateY(${(1 - inn) * 26}px)`;
        layers.crew.style.pointerEvents = inn > 0.6 ? 'auto' : 'none';
      }

      if (layers.cue) layers.cue.style.opacity = String((1 - span(p, 0.02, 0.12)) * 0.5);
    };

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      draw(FRAMES - 1, true);
      apply(1);
      return () => window.removeEventListener('resize', resize);
    }

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: '+=420%',
      pin: true,
      anticipatePin: 1,
      scrub: 0.8,
      onUpdate: (self) => apply(self.progress),
    });

    apply(0);

    return () => {
      window.removeEventListener('resize', resize);
      st.kill();
    };
  }, []);

  return (
    <section ref={root} className="relative" style={{ background: 'var(--deep-space-black)' }}>
      <div className="relative h-[100svh] w-full overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />

        <p className="sr-only">
          The chamber doors open on the Nipa Nsa. It ignites, climbs out of the Baobab, turns
          away until only its four fusion engines face the viewer, and boosts into orbit above
          Earth — then Explorer 233&rsquo;s crew appear: Laura Osei Baako, Maximus Boateng and
          Menaye Ama Mensah.
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

        {/* Opening titles, on the closed doors */}
        <div
          data-l="titles"
          className="absolute inset-0 z-[5] flex flex-col items-center justify-center px-6 text-center"
          style={{ opacity: 0 }}
        >
          <p className="eyebrow" style={{ color: 'var(--mission-gold)' }}>
            An African science-fiction universe
          </p>
          <h1
            className="font-display mt-4"
            style={{
              fontSize: 'clamp(1.9rem, 6vw, 4.2rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1,
              color: 'var(--star-white)',
            }}
          >
            EXPLORER 233
          </h1>
          <p
            className="font-body mt-5"
            style={{ fontSize: 'var(--step-1)', color: 'var(--lunar-silver)', maxWidth: '30ch' }}
          >
            Africa belongs in humanity’s future as a builder, not a passenger.
          </p>
        </div>

        {/* The line, over the ascent */}
        <div className="absolute inset-x-0 bottom-0 z-[5] pb-12 md:pb-16">
          <div className="chapter-shell">
            <div data-l="line" style={{ opacity: 0, maxWidth: '34rem' }}>
              <p className="eyebrow" style={{ color: 'var(--mission-gold)' }}>
                Nipa Nsa · EX-233-001
              </p>
              <h2
                className="font-display font-light mt-3 balance"
                style={{
                  fontSize: 'var(--step-3)',
                  lineHeight: 1.12,
                  letterSpacing: '-0.02em',
                  color: 'var(--star-white)',
                }}
              >
                If we keep waiting for permission, who will write the future while we wait?
              </h2>
            </div>
          </div>
        </div>

        {/* The payoff — crew out of the starfield */}
        <div
          data-l="crew"
          className="absolute inset-0 z-[6] flex flex-col items-center justify-center px-6"
          style={{ opacity: 0, pointerEvents: 'none' }}
        >
          <p className="eyebrow" style={{ color: 'var(--mission-gold)' }}>
            The World
          </p>
          <ul className="mt-8 flex flex-wrap items-end justify-center gap-5 md:gap-8">
            {CREW.map((c) => (
              <li key={c.name} className="text-center">
                {/* Sizing is inline, not left to a stylesheet class: these hold
                    `fill` images, so if the class ever fails to load the images
                    escape to the pinned container and cover the screen. */}
                <div
                  className="crew-orb"
                  style={{
                    position: 'relative',
                    width: 'clamp(5.5rem, 22vw, 11rem)',
                    aspectRatio: '1 / 1',
                    overflow: 'hidden',
                    borderRadius: '999px',
                  }}
                >
                  <Image
                    src={c.src}
                    alt={c.name}
                    fill
                    sizes="(max-width: 640px) 28vw, 190px"
                    className="object-cover"
                    style={{ objectPosition: c.pos }}
                  />
                </div>
                <p
                  className="font-display mt-3"
                  style={{ fontSize: '14px', color: 'var(--star-white)', letterSpacing: '-0.01em' }}
                >
                  {c.name}
                </p>
                <p className="eyebrow mt-1" style={{ color: 'var(--lunar-silver)', fontSize: '9.5px' }}>
                  {c.role}
                </p>
              </li>
            ))}
          </ul>
          <Link href="/world" className="link-arrow mt-10 inline-flex">
            Enter the world
          </Link>
        </div>

        <div
          data-l="cue"
          aria-hidden
          className="eyebrow absolute inset-x-0 bottom-8 z-[5] text-center"
          style={{ color: 'var(--lunar-silver)', fontSize: '10px' }}
        >
          Scroll
        </div>
      </div>
    </section>
  );
}
