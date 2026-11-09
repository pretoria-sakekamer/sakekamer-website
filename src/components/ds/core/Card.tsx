import type { CSSProperties, ReactNode } from 'react';
import { cx } from '../../../lib/cx';

export interface CardProps {
  /** outline = white with stone hairline (default); paper = warm fill, no border; elevated = soft shadow; navy = inverse. */
  variant?: 'outline' | 'paper' | 'elevated' | 'navy';
  /** Lifts with deeper shadow on hover. */
  interactive?: boolean;
  /** 2px gold rule along the top edge. */
  accent?: boolean;
  padding?: number | string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/** Generic container surface with 4px radius; use `accent` for the brand's gold top rule. */
export function Card({ variant = 'outline', interactive = false, padding = 28, accent = false, children, className, style, ...rest }: CardProps) {
  return (
    <div className={cx('ds-card', `ds-card--${variant}`, accent && 'ds-card--accent', interactive && 'ds-card--interactive', className)}
      style={{ padding, ...style }} {...rest}>{children}</div>
  );
}
