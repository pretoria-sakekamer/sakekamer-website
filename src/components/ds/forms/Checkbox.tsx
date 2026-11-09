import { useState, type ChangeEvent, type CSSProperties, type ReactNode } from 'react';
import { cx } from '../../../lib/cx';

export interface CheckboxProps {
  label: ReactNode;
  description?: ReactNode;
  /** Controlled state; omit to let the component manage it. */
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  name?: string;
  value?: string;
  style?: CSSProperties;
}

/** Square navy checkbox with a gold tick, label + optional description. */
export function Checkbox({ label, description, checked, defaultChecked, onChange, disabled, name, value, style }: CheckboxProps) {
  const [inner, setInner] = useState(!!defaultChecked);
  const on = checked !== undefined ? checked : inner;
  const toggle = (e: ChangeEvent<HTMLInputElement>) => { if (disabled) return; if (checked === undefined) setInner(!on); onChange?.(e); };
  return (
    <label className={cx('ds-check', disabled && 'ds-check--disabled')} style={style}>
      <input type="checkbox" className="ds-check__input" name={name} value={value} checked={on} onChange={toggle} disabled={disabled} />
      <span aria-hidden="true" className="ds-check__box ds-check__box--checkbox">
        {on && <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2.5 6.2l2.3 2.3 4.7-5" fill="none" stroke="var(--gold-500)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
      </span>
      <span>
        <span className="ds-check__label">{label}</span>
        {description && <span className="ds-check__desc">{description}</span>}
      </span>
    </label>
  );
}
