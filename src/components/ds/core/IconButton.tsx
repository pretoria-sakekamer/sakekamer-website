import type { CSSProperties } from 'react';
import { cx } from '../../../lib/cx';
import { Icon, type IconName } from './Icon';

export interface IconButtonProps {
  /** Lucide icon name. */
  icon: IconName;
  /** Required accessible label (also used as tooltip title). */
  label: string;
  variant?: 'outline' | 'solid' | 'plain';
  /** Square size in px. Default 44 (minimum touch target). */
  size?: number;
  onDark?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  style?: CSSProperties;
  'aria-expanded'?: boolean;
  'aria-controls'?: string;
}

/** Square icon-only button for menus, carousels, close and social actions. Always pass `label`. */
export function IconButton({ icon, label, variant = 'outline', size = 44, onDark = false, className, style, ...rest }: IconButtonProps) {
  return (
    <button type="button" aria-label={label} title={label}
      className={cx('ds-iconbtn', `ds-iconbtn--${variant}`, onDark && 'ds-iconbtn--on-dark', className)}
      style={{ ['--ib-size' as string]: size + 'px', ...style }} {...rest}>
      <Icon name={icon} size={Math.round(size * 0.42)} />
    </button>
  );
}
