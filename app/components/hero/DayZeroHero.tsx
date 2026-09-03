'use client';

import { useEffect, useRef, useSyncExternalStore } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * The homepage hero — an intercepted Day Zero transmission.
 *
 * This replaces the Departure rocket sequence at the top of the page. It
 * deliberately breaks the house style: everything below it is Explorer 233's
 * voice — ceremonial, gold-on-void — and this is the signal cutting in over
 * that, so it carries no gold and no eyebrow-over-headline.
 *
 * Because it sits at the top of the document there is nothing to scroll *into*,
 * so the copy sequence fires on mount rather than from a ScrollTrigger. The
 * scroll integration is still here, but it does the opposite job: a scrubbed
 * fade that hands the page over to the premise section as the hero leaves.
 *
 * The figure stays masked and unnamed — Day Zero's prelaunch visual rule is
 * that the mask is the public identity — and the loop is ambient only, so
 * nothing here spoils the episode it announces.
 *
 * Copy order is deliberately label → title → date: "Dispatch Two" sits in the
 * small slug so a first-time visitor learns this is an episode before they are
 * asked to care what it is called, while "Day Zero" keeps the display line
 * because it is the distinctive half. Inverting those buries the memorable
 * name under a sequence number that means nothing on its own.
 */

const POSTER = '/images/dispatch-two-poster.jpg';
const LOOP = '/videos/day-zero-loop.mp4';

const REDUCED_QUERY = '(prefers-reduced-motion: reduce)';

// Module scope keeps these referentially stable — useSyncExternalStore
// resubscribes whenever `subscribe` changes identity.
const subscribeToReducedMotion = (onChange: () => void) => {
  const mq = window.matchMedia(REDUCED_QUERY);
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
};
const getReducedMotion = () => window.matchMedia(REDUCED_QUERY).matches;
// The server cannot know the preference. It renders the motion variant and the
// first client pass corrects it; the poster underneath means the corrected
// frame is never empty.
const getReducedMotionOnServer = () => false;

export default function DayZeroHero() {
  const root = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotion,
    getReducedMotionOnServer
  );

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const lines = gsap.utils.toArray<HTMLElement>('[data-dzh-line]', el);
    const burst = el.querySelector<HTMLElement>('[data-dzh-burst]');
    const cue = el.querySelector<HTMLElement>('[data-dzh-cue]');

    // Reduced motion: everything is simply present. No flicker, no cuts, no
    // scrubbed exit, and the video never mounts — nothing on screen moves.
    if (reduced) {
      gsap.set([...lines, cue].filter(Boolean), { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' });
      if (burst) gsap.set(burst, { opacity: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(lines, { opacity: 0, y: 14, clipPath: 'inset(0% 100% 0% 0%)' });
      if (cue) gsap.set(cue, { opacity: 0 });

      // Entry plays on mount, not on scroll: this is the first screen, so there
      // is no "enters the viewport" moment to wait for. The short delay lets
      // the webfonts settle so the cut lands on final glyphs rather than on a
      // fallback that reflows a frame later.
      const tl = gsap.timeline({ delay: 0.4 });

      // The interrupt: coarse static that decays over ~0.5s into the resting
      // scanline haze. Hand-written keyframes rather than RoughEase, which
      // lives in gsap/EasePack and is not registered by the core `gsap`
      // import — `ease: 'rough(...)'` would quietly fall back to the default
      // and read as a smooth fade, the one thing it must not be.
      if (burst) {
        tl.to(
          burst,
          {
            keyframes: {
              opacity: [0.92, 0.34, 0.88, 0.2, 0.62, 0.12, 0.3, 0],
              easeEach: 'steps(1)',
            },
            duration: 0.5,
          },
          0
        );
      }

      // Cuts, not fades. Each line snaps to full opacity in a single frame and
      // the clip-path wipe does the work, so nothing eases itself politely in.
      lines.forEach((line, i) => {
        const at = 0.18 + i * 0.26;
        tl.to(line, { opacity: 1, duration: 0.001 }, at)
          .to(line, { y: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.26, ease: 'steps(4)' }, at)
          // A single dropped frame just after the cut — the channel not holding.
          .to(line, { opacity: 0.25, duration: 0.001 }, at + 0.07)
          .to(line, { opacity: 1, duration: 0.001 }, at + 0.1);
      });

      // The scroll cue arrives last and softly — it is the only element here
      // speaking to the visitor rather than at them.
      if (cue) tl.to(cue, { opacity: 1, duration: 0.6, ease: 'power2.out' }, 1.7);

      // Handing over: the copy clears as the hero scrolls away so it never
      // collides with the premise section underneath. Scrubbed, so it tracks
      // the reader's own pace through Lenis rather than running on its own.
      gsap.to('[data-dzh-copy]', {
        opacity: 0,
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      });

      // The cue clears much faster than the copy: it has done its job the
      // instant the reader starts scrolling, and left at full opacity it rides
      // the seam and lands on top of the premise section below.
      // immediateRender:false so the start value is read on first scroll rather
      // than at creation — at creation the entry timeline has not yet faded the
      // cue in, and this would otherwise capture opacity 0 and fight it.
      if (cue) {
        gsap.to(cue, {
          opacity: 0,
          ease: 'none',
          immediateRender: false,
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: '18% top',
            scrub: 0.4,
          },
        });
      }
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  // Autoplay can still be refused (iOS Low Power Mode, data saver). The poster
  // sits underneath as a real element rather than only in the video's `poster`
  // attribute, so a refused play leaves a composed frame, not a black box.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const play = () => void video.play().catch(() => {});
    play();
    video.addEventListener('loadeddata', play);
    return () => video.removeEventListener('loadeddata', play);
  }, [reduced]);

  return (
    <section ref={root} className="dzh" aria-label="Dispatch Two — Day Zero">
      <div className="dzh-stage">
        <Image
          src={POSTER}
          alt="A masked Day Zero figure lit by firelight, seen through drifting smoke"
          fill
          sizes="100vw"
          priority
          className="dzh-poster object-cover"
        />

        {!reduced && (
          <video
            ref={videoRef}
            className="dzh-video"
            src={LOOP}
            poster={POSTER}
            muted
            autoPlay
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            tabIndex={-1}
          />
        )}

        <div className="dzh-grade" aria-hidden="true" />
        <div className="dzh-scanlines" aria-hidden="true" />
        <div data-dzh-burst className="dzh-burst" aria-hidden="true" />

        <div className="chapter-shell dzh-shell">
          <div data-dzh-copy className="dzh-copy">
            <p data-dzh-line className="dzh-interrupt">
              Dispatch Two
            </p>

            {/* The page's h1. Departure's title card used to carry this role
                and said "Welcome to Explorer 233"; the premise section
                immediately below now does that introducing work visually.
                The hidden prefix keeps the document's one h1 naming the site
                and the episode, so the homepage does not present itself to a
                crawler or a screen reader as a page called only "Day Zero" —
                the visible word stays the single display line the design
                wants. */}
            <h1 data-dzh-line className="dzh-title">
              <span className="sr-only">Explorer 233 — </span>
              Day Zero
            </h1>

            {/* Says the thing plainly. This was a bare "09.11", which looked
                good and told a newcomer nothing — not what lands, not that it
                is the next episode of anything. The transmission conceit is
                carried by the slug and the voice line below; this line is
                allowed to just be information. */}
            <p data-dzh-line className="dzh-date">
              Out <span className="tabnum dzh-when">09.11</span>
            </p>

            {/* Day Zero's register, not Explorer 233's: clipped, ideological,
                cold. Drawn from the sect's own lines in SE1-02 — "the old world
                is already dead" / "there will be no pretending". */}
            <p data-dzh-line className="dzh-voice">
              The old world is already dead. Only the pretending remains.
            </p>

            {/* "Continue watching" was deliberately undersold to the point of
                being useless: it named no destination, and someone who has
                never read a word of this would not know it leads to the first
                episode. It still gets the quiet treatment — a rule and a line,
                no button — but it now says where it goes. */}
            <p data-dzh-line className="dzh-cta-row">
              <Link href="/story" className="dzh-cta">
                New here? Catch up on Dispatch One
              </Link>
            </p>
          </div>

          <p data-dzh-cue className="hero-enter dzh-cue">
            Scroll to enter
          </p>
        </div>
      </div>
    </section>
  );
}
