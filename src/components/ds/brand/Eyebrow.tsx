import type { CSSProperties, ReactNode } from 'react';

export interface EyebrowProps {
  children: ReactNode;
  onDark?: boolean;
  /** Short gold rule before the text. Default true. */
  rule?: boolean;
  style?: CSSProperties;
}

/** Small tracked gold label with a leading rule; sits above section titles. */
export function Eyebrow({ children, onDark = false, rule = true, style }: EyebrowProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, font: 'var(--type-eyebrow)', letterSpacing: 'var(--ls-eyebrow)', textTransform: 'uppercase', color: onDark ? 'var(--gold-500)' : 'var(--gold-700)', ...style }}>
      {rule && <span style={{ width: 28, height: 2, background: 'var(--gold-500)', flex: 'none' }} />}{children}
    </div>
  );
}
