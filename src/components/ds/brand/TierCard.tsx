import type { CSSProperties, ReactNode } from 'react';
import { Badge } from '../core/Badge';
import { Button } from '../core/Button';
import { Icon } from '../core/Icon';

export interface TierCardProps {
  /** Tier name, e.g. "Koppel". */
  name: string;
  /** Formatted price, e.g. "R375". */
  price: string;
  period?: string;
  /** Secondary price line, e.g. "R4 500 per jaar". */
  annual?: string;
  summary?: ReactNode;
  features?: ReactNode[];
  /** Navy inverse treatment for the recommended tier. */
  featured?: boolean;
  badge?: string;
  cta?: string;
  onCta?: () => void;
  style?: CSSProperties;
}

/** Membership tier card; `featured` flips to navy. */
export function TierCard({ name, price, period = '/maand', annual, summary, features = [], featured = false, badge, cta = "Word 'n lid", onCta, style }: TierCardProps) {
  const dark = featured;
  const muted = dark ? 'var(--text-on-inverse-muted)' : 'var(--text-muted)';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: 32, background: dark ? 'var(--navy-900)' : '#fff', color: dark ? '#fff' : 'var(--text-body)', border: '1px solid ' + (dark ? 'var(--navy-900)' : 'var(--border-subtle)'), borderTop: '3px solid var(--gold-500)', borderRadius: 'var(--radius-card)', ...style }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, minHeight: 22 }}>
        <span style={{ font: 'var(--type-eyebrow)', letterSpacing: 'var(--ls-eyebrow)', textTransform: 'uppercase', color: dark ? 'var(--gold-500)' : 'var(--gold-700)' }}>{name}</span>
        {badge && <Badge tone={dark ? 'gold' : 'navy'}>{badge}</Badge>}
      </div>
      <div>
        <span style={{ font: '500 52px/1 var(--font-display)', color: dark ? '#fff' : 'var(--navy-900)' }}>{price}</span>
        <span style={{ font: '600 15px var(--font-sans)', color: muted, marginLeft: 6 }}>{period}</span>
        {annual && <div style={{ font: '400 14px/1.4 var(--font-sans)', color: muted, marginTop: 6 }}>{annual}</div>}
      </div>
      {summary && <p style={{ margin: 0, font: 'var(--type-small)', color: dark ? 'var(--text-on-inverse-muted)' : 'var(--text-body)' }}>{summary}</p>}
      <ul style={{ listStyle: 'none', margin: 0, padding: '20px 0 0', borderTop: '1px solid ' + (dark ? 'var(--border-inverse)' : 'var(--border-subtle)'), display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
        {features.map((f, i) => <li key={i} style={{ display: 'flex', gap: 10, font: '400 15px/1.45 var(--font-sans)' }}><Icon name="check" size={18} color="var(--gold-500)" style={{ marginTop: 2 }} />{f}</li>)}
      </ul>
      <Button variant={dark ? 'primary' : 'secondary'} fullWidth onClick={onCta}>{cta}</Button>
    </div>
  );
}
