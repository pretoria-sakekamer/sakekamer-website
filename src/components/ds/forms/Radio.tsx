import { useState, type ChangeEvent, type CSSProperties, type ReactNode } from 'react';
import { cx } from '../../../lib/cx';

export interface RadioProps {
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

/** Round radio with a gold dot; group by shared `name`. */
export function Radio({ label, description, checked, defaultChecked, onChange, disabled, name, value, style }: RadioProps) {
  const [inner, setInner] = useState(!!defaultChecked);
  const on = checked !== undefined ? checked : inner;
  const toggle = (e: ChangeEvent<HTMLInputElement>) => { if (disabled) return; if (checked === undefined) setInner(true); onChange?.(e); };
  return (
    <label className={cx('ds-check', disabled && 'ds-check--disabled')} style={style}>
      <input type="radio" className="ds-check__input" name={name} value={value} checked={on} onChange={toggle} disabled={disabled} />
      <span aria-hidden="true" className="ds-check__box ds-check__box--radio">{on && <span className="ds-check__dot" />}</span>
      <span>
        <span className="ds-check__label">{label}</span>
        {description && <span className="ds-check__desc">{description}</span>}
      </span>
    </label>
  );
}
