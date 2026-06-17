'use client';

import Image from 'next/image';

/**
 * A wordless interlude: the crew at Earthrise, full-bleed, no copy.
 * A breath of wonder between the thesis and the call — lets people guess rather
 * than explaining. Fades into the void at both edges so it reads as one continuous
 * scroll, not a separate "section".
 */
export default function Interlude() {
  return (
    <section className="relative overflow-hidden" style={{ background: 'transparent', height: 'clamp(60vh, 80vh, 90vh)' }} aria-label="Mission crew">
      {/* Crew image fades into transparency at both edges (via mask) so the
          shared star sky shows through above and below — the scroll reads as one
          continuous sky with the crew floating in it, not a boxed-in section. */}
      <Image
        src="/images/crew-wide.png"
        alt="Explorer 233 crew"
        fill
        sizes="100vw"
        className="object-cover"
        style={{
          objectPosition: 'center 35%',
          opacity: 0.85,
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 25%, black 72%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 25%, black 72%, transparent 100%)',
        }}
      />

      {/* Classified-document corner caption — rewards close reading, invites curiosity */}
      <div
        className="absolute bottom-[28%] right-6 md:right-12 z-10 flex flex-col items-end gap-1 pointer-events-none"
        style={{ opacity: 0.45 }}
      >
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 500, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--gold-accent)' }}>
          Mission: EX-233
        </p>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 500, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(244,241,234,0.6)' }}>
          Crew: Classified
        </p>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 500, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(244,241,234,0.6)' }}>
          Est. Departure: 2026
        </p>
      </div>
    </section>
  );
}
