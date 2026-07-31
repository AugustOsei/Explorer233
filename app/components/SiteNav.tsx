'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

/**
 * Primary site navigation.
 *
 * Supersedes the old ScrollNav: it keeps that component's gold scroll-progress
 * line (the one design element worth carrying over) and adds the real IA —
 * seven destinations plus Join, which is deliberately a button and NOT a
 * dropdown item, because enlisting is the site's one conversion.
 *
 * Transparent over the hero, then gains a blurred plate once scrolled so links
 * stay legible over imagery.
 */

type NavItem = { label: string; href: string; children?: { label: string; href: string }[] };

const NAV: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'The World', href: '/world' },
  { label: 'The Story', href: '/story' },
  { label: 'Games & Events', href: '/games-events' },
  { label: 'Store', href: '/store' },
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'Creator(s)', href: '/about' },
      { label: 'Journal', href: '/about/journal' },
    ],
  },
];

export default function SiteNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLLIElement>(null);

  // Scroll progress + plate state, rAF-throttled (same approach as the old ScrollNav).
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const scrolledPx = window.scrollY;
        const total = document.body.scrollHeight - window.innerHeight;
        setScrolled(scrolledPx > 40);
        if (total > 0 && barRef.current) {
          barRef.current.style.transform = `scaleX(${scrolledPx / total})`;
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Route change closes everything.
  useEffect(() => {
    setMenuOpen(false);
    setAboutOpen(false);
  }, [pathname]);

  // Escape closes; outside-click closes the About dropdown.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setAboutOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (aboutRef.current && !aboutRef.current.contains(e.target as Node)) setAboutOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, []);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Scroll-progress hairline */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden" style={{ height: '1px' }}>
        <div
          ref={barRef}
          className="absolute inset-0 origin-left"
          style={{
            background: 'linear-gradient(90deg, var(--mission-gold), var(--gold-bright))',
            transform: 'scaleX(0)',
          }}
        />
      </div>

      {/* Blurred plate, fades in on scroll */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: scrolled || menuOpen ? 1 : 0,
          background: 'rgba(5,7,11,0.72)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderBottom: '1px solid rgba(174,183,194,0.10)',
        }}
      />

      <nav
        aria-label="Primary"
        className="relative mx-auto flex items-center justify-between gap-6 px-5 md:px-8 lg:px-12"
        style={{ maxWidth: '90rem', height: '68px' }}
      >
        <Link href="/" aria-label="Explorer 233 — home" className="shrink-0">
          <Image
            src="/logo-master.png"
            alt="Explorer 233"
            width={124}
            height={44}
            className="object-contain"
            /* The master logo is a PNG with a baked-in black plate. Screen
               blending drops that plate out against the dark page — a stopgap
               until we have a real transparent SVG wordmark. */
            style={{ mixBlendMode: 'screen' }}
            priority
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-1">
          {NAV.map((item) =>
            item.children ? (
              <li key={item.label} ref={aboutRef} className="relative">
                <button
                  type="button"
                  className="nav-link"
                  aria-expanded={aboutOpen}
                  aria-haspopup="true"
                  data-active={isActive(item.href) || undefined}
                  onClick={() => setAboutOpen((v) => !v)}
                >
                  {item.label}
                  <span aria-hidden style={{ fontSize: '9px', marginLeft: '6px', opacity: 0.7 }}>
                    ▾
                  </span>
                </button>
                {aboutOpen && (
                  <ul
                    className="absolute right-0 top-full mt-2 min-w-[190px] overflow-hidden rounded-lg py-1.5"
                    style={{
                      background: 'rgba(7,10,18,0.97)',
                      border: '1px solid rgba(174,183,194,0.14)',
                      backdropFilter: 'blur(14px)',
                      WebkitBackdropFilter: 'blur(14px)',
                    }}
                  >
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link href={child.href} className="nav-dropdown-link">
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ) : (
              <li key={item.href}>
                <Link href={item.href} className="nav-link" data-active={isActive(item.href) || undefined}>
                  {item.label}
                </Link>
              </li>
            ),
          )}
        </ul>

        <div className="flex items-center gap-3">
          <Link href="/#join" className="btn-join hidden sm:inline-flex">
            Join
          </Link>

          {/* Mobile toggle */}
          <button
            type="button"
            className="lg:hidden flex flex-col items-center justify-center gap-[5px]"
            style={{ width: 44, height: 44 }}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span
              className="block transition-transform duration-200"
              style={{
                width: 22,
                height: 1.5,
                background: 'var(--star-white)',
                transform: menuOpen ? 'translateY(3.25px) rotate(45deg)' : 'none',
              }}
            />
            <span
              className="block transition-transform duration-200"
              style={{
                width: 22,
                height: 1.5,
                background: 'var(--star-white)',
                transform: menuOpen ? 'translateY(-3.25px) rotate(-45deg)' : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          className="lg:hidden absolute left-0 right-0 top-[68px] px-5 pb-8 pt-2"
          style={{
            background: 'rgba(5,7,11,0.97)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderBottom: '1px solid rgba(174,183,194,0.10)',
            maxHeight: 'calc(100dvh - 68px)',
            overflowY: 'auto',
          }}
        >
          <ul className="flex flex-col">
            {NAV.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="nav-mobile-link" data-active={isActive(item.href) || undefined}>
                  {item.label}
                </Link>
                {item.children && (
                  <ul className="pl-4 pb-1">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link href={child.href} className="nav-mobile-sublink">
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <Link href="/#join" className="btn-join mt-5 w-full justify-center">
            Join
          </Link>
        </div>
      )}
    </header>
  );
}
