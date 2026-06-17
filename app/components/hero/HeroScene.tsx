'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

interface HeroSceneProps {
  isMobile: boolean;
  prefersReducedMotion: boolean;
}

const FRAME_COUNT = 242;
const framePath = (i: number) => `/hero-frames/f${String(i).padStart(3, '0')}.jpg`;

function clamp(v: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, v));
}
function mapRange(v: number, inMin: number, inMax: number) {
  return clamp((v - inMin) / (inMax - inMin), 0, 1);
}

/**
 * The hero is ONE continuous shot scrubbed by scroll: the branded EXPLORER 233
 * rocket lifts off the pad, climbs, and recedes into a starfield — so the page
 * opens on stars and the next section continues in the same black void.
 *
 * It scrubs an IMAGE SEQUENCE on a <canvas>, not a <video>. Drawing frames works
 * identically on desktop and iOS, where per-frame video seeking is throttled —
 * so the scroll-driven launch now works on mobile too.
 */
export default function HeroScene({ isMobile, prefersReducedMotion }: HeroSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Overlay refs — mutated directly to avoid React re-render on every scroll tick
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const frames: HTMLImageElement[] = [];
    let loadedFirst = false;
    let currentIndex = -1;

    // Size the canvas to cover the viewport at device pixel ratio.
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      drawFrame(currentIndex < 0 ? 0 : currentIndex, true);
    };

    // Draw a frame with object-fit: cover math.
    const drawFrame = (index: number, force = false) => {
      const i = clamp(Math.round(index), 0, FRAME_COUNT - 1);
      if (i === currentIndex && !force) return;
      const img = frames[i];
      if (!img || !img.complete || img.naturalWidth === 0) return;
      currentIndex = i;
      const cw = canvas.width, ch = canvas.height;
      const ir = img.naturalWidth / img.naturalHeight;
      const cr = cw / ch;
      let dw, dh, dx, dy;
      if (ir > cr) { dh = ch; dw = ch * ir; dx = (cw - dw) / 2; dy = 0; }
      else { dw = cw; dh = cw / ir; dx = 0; dy = (ch - dh) / 2; }
      ctx.drawImage(img, dx, dy, dw, dh);
    };

    // Preload all frames; draw the first as soon as it arrives.
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new window.Image();
      img.src = framePath(i + 1);
      if (i === 0) {
        img.onload = () => { if (!loadedFirst) { loadedFirst = true; resize(); } };
      }
      frames[i] = img;
    }

    resize();
    window.addEventListener('resize', resize);

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      pin: pinRef.current,
      start: 'top top',
      end: '+=420%',
      // A numeric scrub eases the playhead toward the scroll position instead of
      // snapping to it, so the frame index glides between frames — smooth, not
      // stepped. Paired with the full 242-frame sequence for fine motion.
      scrub: 0.8,
      onUpdate(self) {
        const p = self.progress;
        drawFrame(p * (FRAME_COUNT - 1));

        // Ignition flash bloom around liftoff (early in the climb)
        if (flashRef.current) {
          const bloom = Math.sin(clamp(mapRange(p, 0.04, 0.2), 0, 1) * Math.PI);
          flashRef.current.style.opacity = String(bloom * 0.4);
        }

        // Wordmark finale: fades in mid-ascent, then as the rocket recedes into
        // the stars it rises, scales up grandly and brightens into a luminous
        // title card — so the final stretch of scroll is a payoff, not empty sky.
        //
        // On mobile the pin is shorter and the next section follows immediately,
        // so the title MUST fade back out before the pin ends or it collides with
        // TheCall's text. Desktop has room to hold the grand title to the end.
        if (wordmarkRef.current) {
          const fadeIn = mapRange(p, 0.42, 0.6);
          const grow = mapRange(p, 0.55, 1);
          if (isMobile) {
            // Mobile: the title travels UP and off the top of the screen as it
            // fades, so it physically clears the frame before TheCall rises from
            // below — they never share the screen, no clash.
            const exit = mapRange(p, 0.78, 0.95);      // 0→1 exit progress
            const fadeOut = 1 - mapRange(p, 0.82, 0.95);
            const scale = 1 + grow * 0.12;
            const lift = (1 - fadeIn) * 24 - exit * window.innerHeight * 0.85; // slide off the top
            wordmarkRef.current.style.opacity = String(clamp(Math.min(fadeIn, fadeOut), 0, 1));
            wordmarkRef.current.style.transform = `translate(-50%, ${lift}px) scale(${scale})`;
            wordmarkRef.current.style.filter = 'none';
          } else {
            // Desktop: grand luminous build, then in the very last stretch it
            // sweeps UP and off the top so it clears before TheCall enters from
            // below — same no-clash principle, with room for a bigger climax.
            const exit = mapRange(p, 0.88, 1);          // 0→1 exit at the very end
            const fadeOut = 1 - mapRange(p, 0.9, 1);
            const scale = 1 + grow * 0.35;
            const lift = (1 - fadeIn) * 28 - grow * 40 - exit * window.innerHeight * 0.8;
            wordmarkRef.current.style.opacity = String(clamp(Math.min(fadeIn, fadeOut), 0, 1));
            wordmarkRef.current.style.transform = `translate(-50%, ${lift}px) scale(${scale})`;
            wordmarkRef.current.style.filter = `drop-shadow(0 0 ${grow * 30}px rgba(232,179,57,${grow * 0.45}))`;
          }
        }

        if (scrollCueRef.current) {
          scrollCueRef.current.style.opacity = String(clamp(1 - p / 0.05, 0, 1));
        }
      },
    });

    return () => {
      trigger.kill();
      window.removeEventListener('resize', resize);
    };
  }, [prefersReducedMotion, isMobile]);

  // ── Reduced motion ──────────────────────────────────────────────────
  if (prefersReducedMotion) {
    return (
      <div
        className="relative w-full h-screen flex flex-col items-center justify-center gap-8 starfield"
        style={{ background: 'var(--bg-void)' }}
      >
        <Image src="/logo-master.png" alt="Explorer 233" width={300} height={108} className="object-contain" priority />
        <p className="eyebrow text-gold-grad">Launching August 1, 2026</p>
        <a href="#join" className="skip-link">Skip to content</a>
      </div>
    );
  }

  // ── Scroll-scrubbed cinematic hero (canvas image-sequence — desktop & mobile) ──
  const pinHeight = isMobile ? '380vh' : '520vh';
  return (
    <div ref={containerRef} style={{ height: pinHeight }}>
      <div
        ref={pinRef}
        style={{ position: 'sticky', top: 0, height: '100vh', width: '100%', overflow: 'hidden', background: '#05070D' }}
      >
        {/* The single continuous rocket shot, drawn frame-by-frame */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ display: 'block' }} />

        {/* Subtle base vignette to seat the type */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 120% 70% at 50% 100%, rgba(5,7,13,0.55) 0%, transparent 55%)' }} />

        {/* Ignition flash bloom */}
        <div ref={flashRef} className="absolute inset-0 pointer-events-none z-20" style={{ opacity: 0, background: 'radial-gradient(ellipse 55% 45% at 50% 78%, rgba(255,176,80,0.6) 0%, rgba(232,140,40,0.22) 35%, transparent 65%)' }} />

        {/* Top fade + corner wordmark */}
        <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-20" style={{ background: 'linear-gradient(to bottom, rgba(5,7,13,0.7) 0%, transparent 100%)' }} />
        <div className="absolute top-7 left-6 md:left-8 z-30 pointer-events-none flex items-center gap-3">
          <span className="eyebrow" style={{ color: 'rgba(244,241,234,0.5)' }}>Explorer 233</span>
          <span style={{ width: 4, height: 4, borderRadius: 9999, background: 'var(--gold-accent)' }} />
          <span className="eyebrow" style={{ color: 'rgba(244,241,234,0.28)' }}>Accra · Ghana</span>
        </div>

        {/* Center wordmark — rises mid-ascent and grows into a luminous title
            card as the rocket recedes into the stars (driven from onUpdate). */}
        <div ref={wordmarkRef} className="absolute left-1/2 z-30 pointer-events-none text-center px-6 w-full" style={{ top: '42%', transform: 'translate(-50%, 28px)', opacity: 0, willChange: 'transform, opacity, filter' }}>
          <p className="font-display font-bold text-gold-grad" style={{ fontSize: 'clamp(2.25rem, 7vw, 5rem)', letterSpacing: '0.04em', lineHeight: 1 }}>
            EXPLORER 233
          </p>
          <p className="font-display mt-4" style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.05rem)', letterSpacing: '0.12em', color: 'rgba(244,241,234,0.72)' }}>
            Ghana. Space. Now.
          </p>
        </div>

        {/* Scroll cue */}
        <div ref={scrollCueRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30 pointer-events-none">
          <span className="eyebrow" style={{ color: 'rgba(244,241,234,0.45)' }}>Scroll to Begin</span>
          <div className="w-px h-9 animate-pulse" style={{ background: 'linear-gradient(to bottom, rgba(232,179,57,0.7), transparent)' }} />
        </div>
      </div>
    </div>
  );
}
