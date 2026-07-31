# Explorer 233 — Coming Soon Site

Ghana's national space agency pre-launch site. Scroll-scrubbed 3D hero sequence with React Three Fiber + GSAP, launching August 3, 2026.

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. 3D model files

The three GLB files must be present in `public/models/` before running:

| File | Source URL |
|------|-----------|
| `public/models/astronaut-male.glb` | `https://d3u0tzju9qaucj.cloudfront.net/7d051b5a-7bfe-49fe-a484-24e7b3a9458a/07b7c37c-4613-4223-814f-2f893a3cd5cd.glb` |
| `public/models/astronaut-female.glb` | `https://d3u0tzju9qaucj.cloudfront.net/7d051b5a-7bfe-49fe-a484-24e7b3a9458a/df1dda5b-668d-445f-976d-91a0be61c9b8.glb` |
| `public/models/rocket-pad.glb` | `https://d3u0tzju9qaucj.cloudfront.net/7d051b5a-7bfe-49fe-a484-24e7b3a9458a/9030341f-9799-43f3-9a1c-771e28707422.glb` |

Download them manually with curl if needed:

```bash
mkdir -p public/models
curl -L "https://d3u0tzju9qaucj.cloudfront.net/..." -o public/models/astronaut-male.glb
# (repeat for each URL above)
```

If the CDN is unavailable, place placeholder GLBs at those paths and the page will render without models — the rest of the site is fully functional.

### 3. Supabase environment variables

Copy `.env.local` and fill in your project credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

Create the subscribers table in Supabase SQL editor:

```sql
create table subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);
```

`.env.local` is gitignored — do not commit credentials.

### 4. Run dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Before going live

- [ ] Replace `#` social link placeholders in `app/components/sections/Subscribe.tsx` with real handles (marked `// TODO`)
- [ ] Replace `/logo-master.png` OG image in `app/layout.tsx` with a proper 1200×630 social card (marked `// TODO`)
- [ ] Set `metadataBase` in `app/layout.tsx` to the production domain
- [ ] Point Supabase row-level security policy as needed for the `subscribers` table

## Architecture

```
app/
  page.tsx                        — Root page, composes all chapters
  components/
    hero/
      HeroWrapper.tsx             — Client: detects mobile/reduced-motion, dynamic imports HeroScene
      HeroScene.tsx               — Full 3D scroll sequence (desktop/tablet only)
      SceneCamera.tsx             — R3F camera driven by scroll progress keyframes
      AstronautModel.tsx          — GLB loader + walk-cycle scrub via AnimationMixer
      RocketPad.tsx               — Static mesh + engine glow + Y-ascent animation
      StarField.tsx               — Particle points field
    sections/
      TheCall.tsx                 — Chapter 2: founding statement, line-by-line scroll reveal
      TheAgency.tsx               — Chapter 3: agency description
      LunarMission.tsx            — Chapter 4: Lunar Mission One reveal
      Countdown.tsx               — Chapter 5: live mission clock to Aug 3 2026
      Subscribe.tsx               — Chapter 6: email CTA + Supabase insert
      Footer.tsx                  — Logo + copyright
lib/
  supabase.ts                     — Lazy Supabase client + subscribeEmail helper
public/
  logo-master.png                 — Brand logo (white on transparent, used as-is)
  models/                         — GLB files (not committed, see setup above)
```

## Tech stack

- Next.js 16 (App Router, Turbopack) + TypeScript
- React Three Fiber + drei — 3D scene
- GSAP + ScrollTrigger — scroll-scrubbed timeline (scrub: 1)
- Lenis — smooth scroll, synced to ScrollTrigger
- Supabase JS client — email subscribers
- Tailwind CSS v4
- Google Fonts: Space Grotesk (display) + Inter (body)
