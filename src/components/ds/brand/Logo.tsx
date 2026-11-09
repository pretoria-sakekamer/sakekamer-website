import type { CSSProperties } from 'react';

export interface LogoProps {
  /** navy = navy wordmark on light; gold = gold wordmark on light; reverse = white S + gold wordmark on navy; reverse-white; black; white. */
  variant?: 'navy' | 'gold' | 'reverse' | 'reverse-white' | 'black' | 'white';
  /** horizontal lock-up (symbol + wordmark), symbol only, or wordmark only. None include the retired tagline. */
  layout?: 'horizontal' | 'symbol' | 'wordmark';
  height?: number;
  /** URL prefix to the logo folder (copied to /public/logo/). */
  basePath?: string;
  className?: string;
  style?: CSSProperties;
}

const PREFIX = { horizontal: 'logo-horizontal-', symbol: 'logo-symbol-', wordmark: 'wordmark-' } as const;

/**
 * Official Pretoria Sakekamer mark — never redraw or retype it.
 * Minimum height 28px horizontal / 24px symbol.
 * Never add "Die kampvegter vir 'n selfstandige sakegemeenskap" (retired tagline).
 */
export function Logo({ variant = 'navy', layout = 'horizontal', height = 40, basePath = '/logo/', className, style }: LogoProps) {
  return <img src={basePath + PREFIX[layout] + variant + '.svg'} alt="Pretoria Sakekamer" className={className}
    style={{ height, width: 'auto', display: 'block', ...style }} />;
}
