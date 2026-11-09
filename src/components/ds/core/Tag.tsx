import type { CSSProperties, ReactNode } from 'react';
import { cx } from '../../../lib/cx';

export interface TagProps {
  /** Filter state; pass onClick to make interactive. */
  selected?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onDark?: boolean;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/** Pill chip for topics and filters (e.g. SAKEPULS pillars, sectors). */
export function Tag({ selected = false, onClick, onDark = false, children, className, style }: TagProps) {
  const cls = cx('ds-tag', onDark && 'ds-tag--on-dark', className);
  if (onClick) {
    return <button type="button" onClick={onClick} aria-pressed={selected} className={cls} style={style}>{children}</button>;
  }
  return <span className={cls} aria-pressed={selected || undefined} style={style}>{children}</span>;
}
