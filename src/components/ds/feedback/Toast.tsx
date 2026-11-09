import type { CSSProperties, ReactNode } from 'react';
import { Icon, type IconName } from '../core/Icon';

const TONES: Record<'success' | 'error' | 'info', { icon: IconName; c: string }> = {
  success: { icon: 'circle-check', c: 'var(--success)' },
  error: { icon: 'circle-alert', c: 'var(--danger)' },
  info: { icon: 'info', c: 'var(--gold-500)' },
};

export interface ToastProps {
  tone?: 'success' | 'error' | 'info';
  title?: ReactNode;
  children?: ReactNode;
  onClose?: () => void;
  style?: CSSProperties;
}

/** Navy confirmation/notice bar; position it yourself (bottom-right fixed is typical). */
export function Toast({ tone = 'success', title, children, onClose, style }: ToastProps) {
  const t = TONES[tone] ?? TONES.info;
  return (
    <div role="status" className="ds-toast" style={style}>
      <Icon name={t.icon} size={20} color={t.c} style={{ marginTop: 1 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && <div className="ds-toast__title">{title}</div>}
        {children && <div className="ds-toast__body" style={{ marginTop: title ? 2 : 0 }}>{children}</div>}
      </div>
      {onClose && <button type="button" aria-label="Maak toe" onClick={onClose} className="ds-toast__close"><Icon name="x" size={16} /></button>}
    </div>
  );
}
