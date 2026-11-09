import type { CSSProperties, ReactNode } from 'react';
import { cx } from '../../../lib/cx';
import { Icon, type IconName } from '../core/Icon';

export interface PillarCardProps {
  /** Lucide icon name. */
  icon: IconName;
  /** Pillar name, e.g. "SakeKoppel". */
  name: string;
  title?: ReactNode;
  description?: ReactNode;
  /** Optional ordinal, e.g. "01". */
  number?: string;
  onDark?: boolean;
  style?: CSSProperties;
}

/** Value-pillar tile (SAKEPULS) — top rule turns gold on hover. */
export function PillarCard({ icon, name, title, description, number, onDark = false, style }: PillarCardProps) {
  return (
    <div className={cx('ds-pillar', onDark && 'ds-pillar--on-dark')} style={style}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Icon name={icon} size={28} color="var(--gold-500)" />
        {number && <span style={{ font: '500 20px/1 var(--font-display)', color: onDark ? 'var(--navy-600)' : 'var(--navy-400)' }}>{number}</span>}
      </div>
      <div style={{ font: '800 12px/1 var(--font-sans)', letterSpacing: '.16em', textTransform: 'uppercase', color: onDark ? 'var(--gold-500)' : 'var(--gold-700)' }}>{name}</div>
      {title && <h3 style={{ margin: 0, font: '600 24px/1.2 var(--font-display)', color: onDark ? '#fff' : 'var(--navy-900)' }}>{title}</h3>}
      {description && <p style={{ margin: 0, font: 'var(--type-small)', color: onDark ? 'var(--text-on-inverse-muted)' : 'var(--text-body)' }}>{description}</p>}
    </div>
  );
}
