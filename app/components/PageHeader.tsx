import type { ReactNode } from 'react';

/**
 * Shared masthead for inner routes — keeps every destination sitting at the
 * same rhythm below the fixed nav so the site reads as one publication.
 */
export default function PageHeader({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  children?: ReactNode;
}) {
  return (
    <header className="chapter-shell page-top relative z-10">
      <p className="eyebrow" style={{ color: 'var(--mission-gold)' }}>
        {eyebrow}
      </p>
      <h1
        className="font-display font-light mt-4 balance"
        style={{
          fontSize: 'var(--step-4)',
          lineHeight: 1.06,
          letterSpacing: '-0.03em',
          color: 'var(--star-white)',
          maxWidth: '18ch',
        }}
      >
        {title}
      </h1>
      {lede && (
        <p
          className="font-body mt-6"
          style={{ fontSize: 'var(--step-1)', lineHeight: 1.6, color: 'var(--lunar-silver)', maxWidth: '54ch' }}
        >
          {lede}
        </p>
      )}
      {children}
    </header>
  );
}
