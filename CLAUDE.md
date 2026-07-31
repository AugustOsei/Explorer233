@AGENTS.md

# Explorer 233 — Project Brief

A coming-soon / recruitment teaser for **Explorer 233**, a fictional Ghanaian space agency. The site is designed to leave visitors in awe, curious, and compelled to subscribe. It is NOT a real rocket launch — it is a fictional universe (could be a game, a community, a blend — deliberately mysterious).

**Live date:** August 3, 2026
**Repo:** https://github.com/AugustOsei/Explorer233
**Local path:** `/Users/aosei/Documents/explorer233`

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js (App Router, Turbopack) + TypeScript |
| Styling | Tailwind v4 — uses `@utility` not `@layer components` |
| Animation | GSAP + ScrollTrigger, Lenis smooth scroll |
| Hero | 242-frame JPEG image sequence scrubbed on `<canvas>` (avoids iOS video-seek throttle) |
| Fonts | Space Grotesk (display) + Inter (body) via Google Fonts |
| Database | Supabase — table: `subscribers(id uuid pk, email text unique, created_at timestamptz)` |
| Email | Resend — sends welcome email via `/app/api/subscribe/route.ts` |
| Deployment | Vercel |

---

## Env Vars Required

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=       # used server-side in the API route
RESEND_API_KEY=                  # from resend.com
```

The API route uses `SUPABASE_SERVICE_ROLE_KEY` (not the anon key) so no RLS policy is needed on the subscribers table.

---

## File Map

```
app/
  layout.tsx                  # fonts, metadata, OG tags, ScrollNav
  page.tsx                    # section order: HeroWrapper → TheCall → Interlude → Subscribe → Footer
  globals.css                 # design tokens, Tailwind @utility helpers
  api/subscribe/route.ts      # POST: inserts email + sends Resend welcome email
  components/
    ScrollNav.tsx             # sticky scroll-progress bar (gold line + 72px track), no logo
    RevealText.tsx            # word-by-word clip-mask reveal (GSAP)
    SmoothScroll.tsx          # Lenis initialiser
    useReveal.ts              # intersection observer for data-reveal elements
    hero/
      HeroWrapper.tsx         # client wrapper: detects mobile + reduced-motion
      HeroScene.tsx           # 242-frame canvas scrub, GSAP ScrollTrigger pin 520vh desktop / 380vh mobile
    sections/
      StarSky.tsx             # fixed starfield behind entire page
      TheCall.tsx             # "Humanity will reach the stars." + bold challenge line + crew image
      Interlude.tsx           # full-bleed crew-wide.png + classified-doc corner caption
      Subscribe.tsx           # CTA headline, body copy, countdown, email form
      CountdownClock.tsx      # live countdown to 2026-08-04T01:00:00Z (9pm ET Mon Aug 3)
      Footer.tsx              # logo, mystery tagline, nav columns, copyright
lib/
  supabase.ts                 # client-side fetch wrapper → calls /api/subscribe
public/
  hero-frames/f001–f242.jpg   # image sequence for canvas scrub
  images/
    crew-pair.png             # two astronauts (TheCall section, desktop only)
    crew-wide.png             # crew panoramic (Interlude)
    dawn-earth.png            # Earth from orbit (Subscribe background)
  logo-master.png             # brand logo
  explorer.png                # 1200×630 OG image
```

---

## Design System

**Palette** (CSS vars in globals.css):
- `--bg-void: #05070D` — page background
- `--gold-accent: #E8B339` / `--gold-bright: #F5CC6A` — primary accent
- `--white-warm: #F4F1EA` — body text

**Type scale:** fluid `clamp()` steps `--step--1` through `--step-4` defined in `:root`.

**Key utilities:** `chapter-shell` (content column), `eyebrow` (11px tracked caps), `font-display` (Space Grotesk), `text-gold-grad` (gradient gold text), `noise-overlay`, `seam-scrim`, `bleed-media`.

**Tone:** Cinematic, editorial restraint. Afrofuturist but dignified — never playful, never cheesy. Copy should inspire wonder and curiosity, no negativity.

---

## Copy / Content Rules

- **Hero subtitle:** "Ghana. Space. Now."
- **TheCall:** Setup line at 82% opacity; bold challenge line highlights "Africa" and "builder" in gold
- **Interlude caption:** `MISSION: EX-233 / CREW: CLASSIFIED / EST. DEPARTURE: 2026`
- **Subscribe CTA:** "Are you curious? Are you ready to be an Explorer?" — one question, not two
- **CTA body:** "Some people look up at the stars and feel small. Others feel called…"
- **Button:** "Join the Mission"
- **Countdown label:** "Going live in"
- **Footer tagline:** "A fictional space agency? A game? A community? A blend of all? Find out soon."
- **Do NOT** reveal canon lore. The mystery IS the product.
- **Do NOT** add chapter labels or section numbers to any section.

---

## Pre-Launch TODOs

- [ ] Replace `#` social hrefs with real handles (Instagram, TikTok, LinkedIn, Facebook, X) in `Subscribe.tsx` and `Footer.tsx`
- [ ] Verify Resend domain `explorer233.com` DNS records
- [ ] Add all 4 env vars to Vercel before first deploy
- [ ] Create Supabase `subscribers` table (SQL below)
- [ ] Remove dead "About" link from Footer nav or add a real destination

### Supabase table SQL
```sql
create table subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz default now()
);
```
