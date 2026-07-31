import SignalHero from './components/hero/SignalHero';
import StarSky from './components/sections/StarSky';
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

      <SignalHero />

      <CinematicPlate
        src="/images/nipa-nsa.jpg"
        alt="The Nipa Nsa suspended in the Baobab's assembly chamber"
        eyebrow="Nipa Nsa · EX-233-001"
        title="One hand cannot lift a load."
        body="The first vessel built in Africa for travel beyond the Solar System. It will never land on a planet. It was assembled in orbit, tested there, and brought home in sections to be shown to the people who paid for it in belief."
        meta="Assembled in orbit · Commissioned Accra, 2048"
        href="/world"
        cta="Enter the world"
        priority
      />

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
