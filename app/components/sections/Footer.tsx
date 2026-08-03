import Image from 'next/image';

const NAV = {
  Explore: [
    { label: 'The World', href: '/world' },
    { label: 'The Story', href: '/story' },
    { label: 'Games & Events', href: '/games-events' },
    { label: 'Store', href: '/store' },
    { label: 'Journal', href: '/about/journal' },
  ],
  Connect: [
    { label: 'Instagram', href: 'https://www.instagram.com/explorer.233/' },
    { label: 'TikTok', href: 'https://www.tiktok.com/explorer233' },
    { label: 'LinkedIn', href: 'https://linkedin.com/company/explorer-233' },
    { label: 'Facebook', href: 'https://www.facebook.com/explorer233/' },
  ],
  Legal: [
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
    { label: 'Contact', href: 'mailto:hello@explorer233.com' },
  ],
};

export default function Footer() {
  return (
    <footer
      className="relative"
      style={{ background: 'var(--bg-void)', borderTop: '1px solid rgba(244,241,234,0.08)' }}
    >
      <div className="mx-auto max-w-[78rem] px-6 md:px-10 lg:px-16">
        {/* Top: brand block + link columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 pt-16 pb-12">
          {/* Brand */}
          <div className="md:col-span-5 flex flex-col gap-5 items-center md:items-start text-center md:text-left">
            <Image
              src="/logo-master.png"
              alt="Explorer 233"
              width={140}
              height={50}
              className="object-contain opacity-80"
            />
            <p
              className="font-display"
              style={{ fontSize: '14px', color: 'rgba(244,241,234,0.55)', letterSpacing: '0.04em', lineHeight: 1.6, maxWidth: '30ch' }}
            >
              An original African science-fiction universe. Dispatches, characters, and a story still arriving.
            </p>
            <span className="eyebrow text-gold-grad">Reach and breathe among the stars</span>
          </div>

          {/* Spacer on desktop */}
          <div className="hidden md:block md:col-span-1" />

          {/* Link columns */}
          {Object.entries(NAV).map(([heading, links]) => (
            <div key={heading} className="md:col-span-2 flex flex-col gap-4 items-center md:items-start text-center md:text-left">
              <p className="eyebrow" style={{ color: 'rgba(244,241,234,0.4)' }}>{heading}</p>
              <ul className="flex flex-col gap-3">
                {links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="footer-link font-body"
                      style={{ fontSize: '14px', color: 'rgba(244,241,234,0.6)', textDecoration: 'none' }}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 py-7"
          style={{ borderTop: '1px solid rgba(244,241,234,0.06)' }}
        >
          <p className="font-body" style={{ fontSize: '12px', color: 'rgba(244,241,234,0.3)', letterSpacing: '0.05em' }}>
            © 2026 Explorer 233 · Accra, Ghana
          </p>
        </div>
      </div>
    </footer>
  );
}
