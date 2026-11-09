import type { ReactNode } from 'react';

export interface KickerProps {
  /** Section number shown as "§n" in gold italic. */
  n?: string;
  children: ReactNode;
  dark?: boolean;
}

/** Newspaper section label: hairline rule, "§n" and tracked uppercase title. */
export function Kicker({ n, children, dark = false }: KickerProps) {
  return (
    <div className={dark ? 'kicker kicker--dark' : 'kicker'}>
      {n && <span className="kicker__n">§{n}</span>}
      <span className="kicker__t">{children}</span>
    </div>
  );
}
