import Image from 'next/image';
import Link from 'next/link';

export default function ExploreDoors() {
  return (
    <section className="home-doors" aria-label="Continue exploring">
      <Link href="/world" className="home-door group">
        <Image
          src="/images/crew-wide.png"
          alt="The people at the heart of Explorer 233"
          fill
          sizes="100vw"
          className="object-cover home-door-image"
        />
        <span className="home-door-scrim" aria-hidden />
        <span className="home-door-content">
          <span className="home-door-title">Enter the World</span>
          <span className="home-door-text">Meet the people, ships and places behind the mission.</span>
          <span className="home-door-arrow" aria-hidden>→</span>
        </span>
      </Link>
    </section>
  );
}
