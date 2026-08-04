import Image from 'next/image';
import Link from 'next/link';

const EXPERIENCES = [
  {
    label: 'Play',
    title: 'Games & Events',
    text: 'Play Chop First and find the online and in-person experiences coming next.',
    href: '/games-events',
    image: '/images/games/chop-first/cover-orbital.jpg',
    alt: 'Chop First racing game artwork',
    className: 'experience-card--play',
  },
  {
    label: 'Wear',
    title: 'Official Store',
    text: 'Explore the first collection of apparel from the Explorer 233 universe.',
    href: '/store',
    image: '/images/store/classic-tee-black.jpg',
    alt: 'Black Explorer 233 classic T-shirt',
    className: 'experience-card--store',
  },
  {
    label: 'Behind the story',
    title: 'About & Journal',
    text: 'Meet August Peekay and follow the work of building the story franchise.',
    href: '/about',
    image: null,
    alt: '',
    className: 'experience-card--about',
  },
];

export default function BeyondDispatches() {
  return (
    <section className="home-experiences" aria-labelledby="home-experiences-title">
      <div className="chapter-shell">
        <div className="home-experiences-heading">
          <p className="eyebrow">Beyond the dispatches</p>
          <h2 id="home-experiences-title">Explore more of Explorer 233.</h2>
        </div>

        <div className="experience-grid">
          {EXPERIENCES.map((experience) => (
            <Link key={experience.title} href={experience.href} className={`experience-card ${experience.className}`}>
              {experience.image ? (
                <Image src={experience.image} alt={experience.alt} fill sizes="(max-width: 800px) 100vw, 34vw" className="experience-card-image object-cover" />
              ) : (
                <span className="experience-monogram" aria-hidden="true">AP</span>
              )}
              <span className="experience-card-scrim" aria-hidden="true" />
              <span className="experience-card-content">
                <span className="experience-card-label">{experience.label}</span>
                <strong>{experience.title}</strong>
                <span>{experience.text}</span>
                <span className="experience-card-arrow" aria-hidden="true">↗</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
