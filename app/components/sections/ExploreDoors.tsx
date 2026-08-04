import Image from 'next/image';
import Link from 'next/link';

const PREVIEW_CARDS = [
  { name: 'Laura Osei Baako', type: 'Founder', image: '/images/cast/laura-01-bust.jpg' },
  { name: 'Menaye Ama Mensah', type: 'Science', image: '/images/cast/mam-01-portrait.jpg' },
  { name: 'Maximus Boateng', type: 'Flight', image: '/images/cast/maximus-01-bust.jpg' },
];

export default function ExploreDoors() {
  return (
    <section className="world-preview" aria-labelledby="world-preview-title">
      <div className="chapter-shell world-preview-grid">
        <div className="world-preview-copy">
          <p className="eyebrow">The World Gallery</p>
          <h2 id="world-preview-title">Enter the world.</h2>
          <p>Meet the characters and discover the ships, places and artwork of Explorer 233.</p>
          <Link href="/world" className="btn-ghost world-preview-link">
            Explore the gallery <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="world-card-fan" aria-label="Selected character cards from the World Gallery">
          {PREVIEW_CARDS.map((card, index) => (
            <article key={card.name} className="world-preview-card" style={{ '--card-index': index } as React.CSSProperties}>
              <div className="world-preview-card-image">
                <Image src={card.image} alt="" fill sizes="(max-width: 700px) 42vw, 18vw" className="object-cover" />
              </div>
              <div className="world-preview-card-copy">
                <span>{card.type}</span>
                <h3>{card.name}</h3>
                <small>Explorer 233</small>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
