import type { CSSProperties, ReactNode } from 'react';
import { Eyebrow } from './Eyebrow';

export interface SectionHeadingProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  align?: 'left' | 'center';
  onDark?: boolean;
  size?: 'display' | 'h1' | 'h2';
  style?: CSSProperties;
}

const FS = { display: 'var(--fs-display-l)', h1: 'var(--fs-h1)', h2: 'var(--fs-h2)' } as const;

/** Eyebrow + serif title + lead paragraph — opens a page section. */
export function SectionHeading({ eyebrow, title, lead, align = 'left', onDark = false, size = 'h2', style }: SectionHeadingProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: align === 'center' ? 'center' : 'flex-start', textAlign: align, maxWidth: align === 'center' ? 760 : 680, marginInline: align === 'center' ? 'auto' : undefined, ...style }}>
      {eyebrow && <Eyebrow onDark={onDark} rule={align !== 'center'}>{eyebrow}</Eyebrow>}
      <h2 style={{ margin: 0, font: '500 ' + FS[size] + '/1.1 var(--font-display)', letterSpacing: 'var(--ls-display)', color: onDark ? '#fff' : 'var(--navy-900)', textWrap: 'balance' }}>{title}</h2>
      {lead && <p style={{ margin: 0, font: 'var(--type-lead)', color: onDark ? 'var(--text-on-inverse-muted)' : 'var(--text-muted)', textWrap: 'pretty' }}>{lead}</p>}
    </div>
  );
}
