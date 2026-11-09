import type { CSSProperties, ReactNode } from 'react';

export interface BadgeProps {
  /** gold = default label (e.g. "Net vir lede"); navy = emphasis; success/danger = status. */
  tone?: 'gold' | 'navy' | 'neutral' | 'success' | 'danger' | 'outline';
  children?: ReactNode;
  style?: CSSProperties;
}

/** Small uppercase status label — membership exclusivity, event status, tier markers. */
export function Badge({ tone = 'gold', children, style }: BadgeProps) {
  return <span className={`ds-badge ds-badge--${tone}`} style={style}>{children}</span>;
}
