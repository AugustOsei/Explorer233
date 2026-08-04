'use client';

import { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

gsap.registerPlugin(ScrollTrigger);

type SignalPoint = {
  x: number;
  y: number;
  hash: number;
  order: number;
};

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const smooth = (value: number) => {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
};
const hashPoint = (x: number, y: number) => {
  const value = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return value - Math.floor(value);
};

/**
 * A fixed signal field. Nothing flies into typographic positions: the same
 * points that make up the field simply receive enough energy to reveal what
 * was already hidden inside it.
 */
export default function SignalConvergence() {
  const root = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sentenceRef = useRef<HTMLParagraphElement>(null);
  const carrierRef = useRef<HTMLDivElement>(null);
  const carrierLineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = root.current;
    const canvas = canvasRef.current;
    const sentence = sentenceRef.current;
    const carrier = carrierRef.current;
    const carrierLine = carrierLineRef.current;
    const context = canvas?.getContext('2d');
    if (!section || !canvas || !sentence || !carrier || !carrierLine || !context) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let progress = reduced ? 0.72 : 0;
    let frame = 0;
    let active = false;
    let disposed = false;
    let ambientPoints: SignalPoint[] = [];
    let messagePoints: SignalPoint[] = [];

    const buildField = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const mask = document.createElement('canvas');
      mask.width = width;
      mask.height = height;
      const maskContext = mask.getContext('2d');
      if (!maskContext) return;

      const horizontalPadding = width < 600 ? 0.13 : 0.16;
      const maxTextWidth = width * (1 - horizontalPadding * 2);
      let fontSize = Math.min(width * (width < 600 ? 0.22 : 0.15), height * 0.2, 176);
      maskContext.font = `650 ${fontSize}px "Space Grotesk", sans-serif`;
      while (maskContext.measureText('WE ARE').width > maxTextWidth && fontSize > 48) {
        fontSize -= 2;
        maskContext.font = `650 ${fontSize}px "Space Grotesk", sans-serif`;
      }

      maskContext.fillStyle = '#fff';
      maskContext.textAlign = 'center';
      maskContext.textBaseline = 'middle';
      const lineHeight = fontSize * 0.83;
      const centerY = height * 0.51;
      maskContext.fillText('WE ARE', width / 2, centerY - lineHeight / 2);
      maskContext.fillText('HERE', width / 2, centerY + lineHeight / 2);

      const pixels = maskContext.getImageData(0, 0, width, height).data;
      const gap = width < 600 ? 7 : width < 1100 ? 8 : 9;
      const nextAmbient: SignalPoint[] = [];
      const nextMessage: SignalPoint[] = [];

      for (let y = gap / 2; y < height; y += gap) {
        for (let x = gap / 2; x < width; x += gap) {
          const hash = hashPoint(x, y);
          const alpha = pixels[(Math.floor(y) * width + Math.floor(x)) * 4 + 3];
          const point = {
            x,
            y,
            hash,
            order: clamp(0.08 + (x / width) * 0.56 + hash * 0.2),
          };

          if (hash < 0.19) nextAmbient.push(point);
          if (alpha > 96 && hash < 0.82) nextMessage.push(point);
        }
      }

      ambientPoints = nextAmbient;
      messagePoints = nextMessage;
    };

    const draw = (time = 0) => {
      context.clearRect(0, 0, width, height);

      const fieldIn = smooth((progress - 0.08) / 0.16);
      const pulseIn = smooth((progress - 0.16) / 0.2);
      const pulseOut = 1 - smooth((progress - 0.56) / 0.18);
      const pulseStrength = pulseIn * pulseOut;
      const reveal = smooth((progress - 0.27) / 0.3);
      const messageOut = 1 - smooth((progress - 0.8) / 0.13);
      const t = time * 0.001;

      context.fillStyle = 'rgba(174, 183, 194, 0.22)';
      for (const point of ambientPoints) {
        const breathe = 0.55 + Math.sin(t * 0.58 + point.hash * 12) * 0.16;
        context.globalAlpha = (0.1 + breathe * 0.11) * (0.55 + fieldIn * 0.45);
        const size = point.hash < 0.025 ? 1.8 : 1.15;
        context.fillRect(point.x - size / 2, point.y - size / 2, size, size);
      }

      if (pulseStrength > 0.01) {
        const origins = [
          { x: -width * 0.16, y: height * 0.28, offset: 0 },
          { x: width * 1.14, y: height * 0.62, offset: 0.13 },
          { x: width * 0.62, y: -height * 0.2, offset: 0.25 },
        ];
        const diagonal = Math.hypot(width, height);
        context.fillStyle = 'rgba(214, 168, 79, 0.72)';

        for (const point of ambientPoints) {
          let energy = 0;
          for (const origin of origins) {
            const radius = clamp((progress - 0.15 - origin.offset) / 0.34) * diagonal * 1.1;
            const distance = Math.hypot(point.x - origin.x, point.y - origin.y);
            energy = Math.max(energy, 1 - Math.min(1, Math.abs(distance - radius) / 22));
          }
          if (energy > 0.12) {
            context.globalAlpha = energy * pulseStrength * 0.62;
            context.fillRect(point.x - 1.35, point.y - 1.35, 2.7, 2.7);
          }
        }
      }

      context.fillStyle = 'rgb(245, 247, 250)';
      for (const point of messagePoints) {
        const localReveal = smooth((reveal - point.order) / 0.17);
        if (localReveal <= 0) continue;
        const shimmer = 0.91 + Math.sin(t * 0.72 + point.hash * 18) * 0.09;
        context.globalAlpha = localReveal * messageOut * shimmer;
        const size = width < 600 ? 2.35 : 2.65;
        context.fillRect(point.x - size / 2, point.y - size / 2, size, size);
      }

      context.globalAlpha = 1;
    };

    const applyProgress = (value: number) => {
      progress = value;
      if (reduced) {
        sentence.style.opacity = '1';
        sentence.style.transform = 'none';
        carrier.style.opacity = '1';
        carrier.style.transform = 'none';
        carrierLine.style.transform = 'scaleX(1)';
        draw(performance.now());
        return;
      }
      const sentenceOut = smooth((progress - 0.07) / 0.2);
      const carrierIn = smooth((progress - 0.79) / 0.13);
      sentence.style.opacity = String(1 - sentenceOut);
      sentence.style.transform = `translateY(${-sentenceOut * 10}px)`;
      carrier.style.opacity = String(carrierIn);
      carrier.style.transform = `translateY(${(1 - carrierIn) * 14}px)`;
      carrierLine.style.transform = `scaleX(${carrierIn})`;
      draw(performance.now());
    };

    const animate = (time: number) => {
      draw(time);
      if (active && !reduced) frame = window.requestAnimationFrame(animate);
    };
    const start = () => {
      if (active || reduced) return;
      active = true;
      frame = window.requestAnimationFrame(animate);
    };
    const stop = () => {
      active = false;
      window.cancelAnimationFrame(frame);
    };

    const rebuild = () => {
      buildField();
      applyProgress(progress);
      ScrollTrigger.refresh();
    };

    void document.fonts.ready.then(() => {
      if (!disposed) rebuild();
    });
    buildField();
    applyProgress(progress);

    let trigger: ScrollTrigger | undefined;
    if (!reduced) {
      trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => applyProgress(self.progress),
        onEnter: start,
        onEnterBack: start,
        onLeave: stop,
        onLeaveBack: stop,
      });
      frame = window.requestAnimationFrame(animate);
    }

    window.addEventListener('resize', rebuild);
    return () => {
      disposed = true;
      stop();
      trigger?.kill();
      window.removeEventListener('resize', rebuild);
    };
  }, []);

  return (
    <section ref={root} className="signal-illumination" aria-label="Signals illuminate a shared message">
      <div className="signal-display">
        <canvas ref={canvasRef} className="signal-canvas" aria-hidden="true" />
        <div className="signal-vignette" aria-hidden="true" />

        <div className="signal-copy-shell chapter-shell">
          <p ref={sentenceRef} className="signal-source">
            The silence ended after humanity established a permanent settlement on Mars. Signals
            began arriving from worlds near and far. Most carried the same message.
          </p>
        </div>

        <div ref={carrierRef} className="signal-carrier chapter-shell">
          <span ref={carrierLineRef} className="signal-carrier-line" aria-hidden="true" />
          <p>Explorer 233 is created to find the senders. Not everyone wants humanity to answer.</p>
        </div>

        <p className="sr-only">The shared message reads: We are here.</p>
      </div>
    </section>
  );
}
