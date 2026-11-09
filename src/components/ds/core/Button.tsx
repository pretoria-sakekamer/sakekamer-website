import type { AnchorHTMLAttributes, ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';
import { cx } from '../../../lib/cx';
import { Icon, type IconName } from './Icon';

const ICON_SIZE = { sm: 17, md: 18, lg: 19 } as const;

export interface ButtonProps {
  /** primary = gold (main CTA, e.g. "Word 'n lid"); navy = solid Black Rock; secondary = outline; ghost = text link with arrow. */
  variant?: 'primary' | 'navy' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  /** Lucide icon names. */
  iconLeft?: IconName;
  iconRight?: IconName;
  /** Set when placed on a navy/photo background (affects secondary + ghost). */
  onDark?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  /** Renders an <a> when set. */
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  /** Associates a submit button with a form elsewhere in the DOM (e.g. a Dialog footer). */
  form?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Extra attributes (data-*, aria-*) passed to the underlying element. */
  [attr: `data-${string}`]: string | undefined;
  'aria-label'?: string;
}

/** Uppercase action button; gold `primary` is reserved for the one main CTA per view. */
export function Button({
  variant = 'primary', size = 'md', iconLeft, iconRight, onDark = false, disabled = false, fullWidth = false,
  href, type = 'button', children, className, style, ...rest
}: ButtonProps) {
  const cls = cx('ds-btn', `ds-btn--${variant}`, `ds-btn--${size}`, onDark && 'ds-btn--on-dark', fullWidth && 'ds-btn--full', className);
  const inner = (
    <>
      {iconLeft && <Icon name={iconLeft} size={ICON_SIZE[size]} />}
      {children}
      {iconRight && <Icon name={iconRight} size={ICON_SIZE[size]} className="ds-btn__icon-r" />}
    </>
  );
  if (href) {
    return (
      <a href={disabled ? undefined : href} aria-disabled={disabled || undefined} className={cls} style={style}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>{inner}</a>
    );
  }
  return (
    <button type={type} disabled={disabled} className={cls} style={style}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>{inner}</button>
  );
}
