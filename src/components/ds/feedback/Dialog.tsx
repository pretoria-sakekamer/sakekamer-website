import { useEffect, useId, useRef, type ReactNode } from 'react';
import { IconButton } from '../core/IconButton';

export interface DialogProps {
  open: boolean;
  onClose?: () => void;
  title?: ReactNode;
  /** Small gold uppercase line above the title. */
  eyebrow?: ReactNode;
  children?: ReactNode;
  /** Action row (usually Buttons). */
  footer?: ReactNode;
  width?: number;
}

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]):not([type="hidden"]),select,textarea,[tabindex]:not([tabindex="-1"])';

/**
 * Modal on a navy scrim with a gold top rule; Esc and backdrop click close it.
 * Production additions: focus moves into the dialog, Tab is trapped inside, focus returns
 * to the opener on close, and page scroll is locked while open.
 */
export function Dialog({ open, onClose, title, eyebrow, children, footer, width = 560 }: DialogProps) {
  const ref = useRef<HTMLDivElement>(null);
  const tid = useId();

  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const node = ref.current;
    const first = node?.querySelector<HTMLElement>('input,textarea,select') ?? node;
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose?.(); return; }
      if (e.key !== 'Tab' || !node) return;
      const items = Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!items.length) return;
      const a = items[0], z = items[items.length - 1];
      if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
      else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      opener?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="ds-dialog__scrim" onClick={onClose}>
      <div ref={ref} role="dialog" aria-modal="true" aria-labelledby={title ? tid : undefined} tabIndex={-1}
        className="ds-dialog" style={{ maxWidth: width }} onClick={e => e.stopPropagation()}>
        <div className="ds-dialog__head">
          <div style={{ flex: 1 }}>
            {eyebrow && <div className="ds-dialog__eyebrow">{eyebrow}</div>}
            {title && <h2 id={tid} className="ds-dialog__title">{title}</h2>}
          </div>
          <IconButton icon="x" label="Maak toe" variant="plain" size={40} onClick={onClose} />
        </div>
        <div className="ds-dialog__body">{children}</div>
        {footer && <div className="ds-dialog__foot">{footer}</div>}
      </div>
    </div>
  );
}
