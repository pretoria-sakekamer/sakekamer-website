import type { CSSProperties, ReactNode } from 'react';

export interface PullQuoteProps {
  quote: ReactNode;
  name?: string;
  role?: string;
  onDark?: boolean;
  style?: CSSProperties;
}

/** Large italic serif quote with gold opening mark. Only use real, attributed quotes. */
export function PullQuote({ quote, name, role, onDark = false, style }: PullQuoteProps) {
  return (
    <figure style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: 20, ...style }}>
      <span aria-hidden="true" style={{ font: '500 72px/0.6 var(--font-display)', color: 'var(--gold-500)', height: 28 }}>“</span>
      <blockquote style={{ margin: 0, font: 'italic 500 clamp(24px,2.6vw,34px)/1.3 var(--font-display)', color: onDark ? '#fff' : 'var(--navy-900)', textWrap: 'pretty' }}>{quote}</blockquote>
      {name && (
        <figcaption style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 28, height: 2, background: 'var(--gold-500)' }} />
          <span style={{ font: '700 15px/1.3 var(--font-sans)', color: onDark ? '#fff' : 'var(--navy-900)' }}>
            {name}{role && <span style={{ fontWeight: 400, color: onDark ? 'var(--text-on-inverse-muted)' : 'var(--text-muted)' }}>{', ' + role}</span>}
          </span>
        </figcaption>
      )}
    </figure>
  );
}
