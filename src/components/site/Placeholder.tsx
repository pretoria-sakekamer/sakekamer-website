import type { ReactNode } from 'react';
import { SHOW_PLACEHOLDERS } from '../../lib/flags';

export interface PlaceholderProps {
  /** What is missing, shown after "Plekhouer ·". */
  children?: ReactNode;
  /** Lighter colours for navy backgrounds. */
  dark?: boolean;
}

/**
 * PLEKHOUER label for content the client still has to supply (prototype `Ph` in Bits.jsx).
 * Dashed gold border, Nunito 800 10px uppercase. Every use is listed in CONTENT_TODO.md.
 * Hidden everywhere when PUBLIC_SHOW_PLACEHOLDERS=false.
 */
export function Placeholder({ children, dark = false }: PlaceholderProps) {
  if (!SHOW_PLACEHOLDERS) return null;
  return (
    <span className={dark ? 'ph ph--dark' : 'ph'} title="Plekhouer — inligting nodig" data-todo="content">
      Plekhouer{children ? <span> · {children}</span> : null}
    </span>
  );
}

/** Short alias matching the prototype. */
export const Ph = Placeholder;
