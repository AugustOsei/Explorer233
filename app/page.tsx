import SignalSequence from './components/hero/SignalSequence';
import StarSky from './components/sections/StarSky';
import ShipReveal from './components/sections/ShipReveal';
import Ignition from './components/hero/Ignition';
import CinematicPlate from './components/sections/CinematicPlate';
import StoryTeaser from './components/sections/StoryTeaser';
import CharacterRow from './components/sections/CharacterRow';
import JoinPartner from './components/sections/JoinPartner';
import Footer from './components/sections/Footer';

/**
 * The landing page is the first act of the story, told in held shots.
 *
 * signal → the answer (Nipa Nsa) → where it goes (the Current) → the dispatch →
 * the people → the two doors. No launch countdown: the site is already live,
 * and the only clock that matters now is the next dispatch.
 */
export default function Home() {
  return (
    <main>
      <a href="#join" className="skip-link">
        Skip to content
      </a>

      {/* One continuous sky behind the non-plate sections */}
      <StarSky />

      <SignalSequence />

      <ShipReveal />

      <Ignition />

      <CinematicPlate
        src="/images/the-current.jpg"
        alt="The Nipa Nsa entering the Current"
        eyebrow="The Current"
        title="We will not pretend we understand what waits at the other end."
        body="Beyond Earth orbit the vessel activates the Mellanium Field and enters what the engineers call the Current. Exploration has never required certainty. It requires preparation, courage, and the humility to know that discovery changes the discoverer."
        align="center"
      />

      <StoryTeaser />

      <CharacterRow />

      <JoinPartner />

      <Footer />
    </main>
  );
}
