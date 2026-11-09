import type { CSSProperties, ReactNode } from 'react';
import { Badge } from '../core/Badge';
import { Button } from '../core/Button';
import { Icon } from '../core/Icon';

export interface EventCardProps {
  day: string | number;
  /** Short Afrikaans month, e.g. "Nov". */
  month: string;
  title: ReactNode;
  time?: string;
  venue?: string;
  description?: ReactNode;
  badge?: string;
  /** Optional photo; date block overlays its corner. */
  image?: string;
  cta?: string;
  onCta?: () => void;
  style?: CSSProperties;
}

/** Event listing with navy date block. */
export function EventCard({ day, month, title, time, venue, description, badge, image, cta = 'Bespreek', onCta, style }: EventCardProps) {
  const date = (big: boolean) => (
    <>
      <div style={{ font: `500 ${big ? 44 : 34}px/1 var(--font-display)`, color: 'var(--gold-500)' }}>{day}</div>
      <div style={{ font: '800 11px/1 var(--font-sans)', letterSpacing: '.16em', textTransform: 'uppercase', marginTop: big ? 6 : 4 }}>{month}</div>
    </>
  );
  return (
    <article style={{ display: 'grid', gridTemplateColumns: image ? '200px 1fr' : '96px 1fr', background: '#fff', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-card)', overflow: 'hidden', ...style }}>
      {image
        ? <div style={{ position: 'relative', background: `url(${image}) center/cover`, minHeight: 200 }}>
            <div style={{ position: 'absolute', left: 0, top: 0, background: 'var(--navy-900)', color: '#fff', padding: '10px 14px', textAlign: 'center' }}>{date(false)}</div>
          </div>
        : <div style={{ background: 'var(--navy-900)', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 16 }}>{date(true)}</div>}
      <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}>
        {badge && <div><Badge>{badge}</Badge></div>}
        <h3 style={{ margin: 0, font: '600 26px/1.15 var(--font-display)', color: 'var(--navy-900)' }}>{title}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 20px', font: '600 14px/1.3 var(--font-sans)', color: 'var(--text-muted)' }}>
          {time && <span style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}><Icon name="clock" size={16} color="var(--gold-600)" />{time}</span>}
          {venue && <span style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}><Icon name="map-pin" size={16} color="var(--gold-600)" />{venue}</span>}
        </div>
        {description && <p style={{ margin: 0, font: 'var(--type-small)', color: 'var(--text-body)' }}>{description}</p>}
        {cta && <div style={{ marginTop: 4 }}><Button variant="ghost" iconRight="arrow-right" size="sm" onClick={onCta}>{cta}</Button></div>}
      </div>
    </article>
  );
}
