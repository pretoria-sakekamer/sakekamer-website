import { useId, type ReactNode } from 'react';

export interface TooltipProps {
  content: ReactNode;
  placement?: 'top' | 'bottom';
  children: ReactNode;
}

/** Navy hover/focus hint for icon buttons and abbreviations. */
export function Tooltip({ content, placement = 'top', children }: TooltipProps) {
  const id = useId();
  return (
    <span className="ds-tooltip" aria-describedby={id}>
      {children}
      <span id={id} role="tooltip" className={`ds-tooltip__bubble ds-tooltip__bubble--${placement}`}>{content}</span>
    </span>
  );
}
