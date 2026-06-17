import HeroWrapper from './components/hero/HeroWrapper';
import StarSky from './components/sections/StarSky';
import TheCall from './components/sections/TheCall';
import Interlude from './components/sections/Interlude';
import Subscribe from './components/sections/Subscribe';
import Footer from './components/sections/Footer';

export default function Home() {
  return (
    <main>
      <a href="#join" className="skip-link">
        Skip to content
      </a>

      {/* One continuous starry sky fixed behind the ENTIRE page — the same stars
          the rocket vanished into. The hero's opaque canvas covers it during the
          launch; the moment the hero unpins, this sky is already there, so there
          is no dark gap before the next section. Stars flow as one long sky. */}
      <StarSky />

      {/* Scroll-scrubbed hero — rocket pad → liftoff → stars */}
      <HeroWrapper />

      {/* The thesis — one bold line, with the crew standing in the void */}
      <TheCall />

      {/* Wordless interlude — the crew at Earthrise. Pure image, no copy. */}
      <Interlude />

      {/* The Call — recruitment CTA + live countdown, over dawn-over-Earth */}
      <Subscribe />

      <Footer />
    </main>
  );
}
