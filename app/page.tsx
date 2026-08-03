import Departure from './components/hero/Departure';
import StarSky from './components/sections/StarSky';
import StoryTeaser from './components/sections/StoryTeaser';
import JoinPartner from './components/sections/JoinPartner';
import Footer from './components/sections/Footer';

/**
 * The homepage is one shot, then two blocks.
 *
 * Departure carries the whole narrative — doors, reveal, lift-off, stars, crew
 * — in a single pin, so the vessel is introduced once instead of being restaged
 * by every new section. Everything that used to sit around it (a separate
 * reveal, a separate ignition, a third ship plate, a character grid that
 * duplicated /world) is gone; the deeper material lives on the pages built for
 * it, and the landing page's job is to get you there.
 */
export default function Home() {
  return (
    <main>
      <a href="#join" className="skip-link">
        Skip to content
      </a>

      {/* Fixed starfield for the closing blocks. It must render BEFORE the
          sequence: it is position:fixed, so later siblings would paint over
          the pinned canvas and hide the whole shot. */}
      <StarSky />

      <Departure />

      <StoryTeaser />

      <JoinPartner />

      <Footer />
    </main>
  );
}
