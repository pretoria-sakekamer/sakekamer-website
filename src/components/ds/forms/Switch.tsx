import { useId, useState, type CSSProperties, type ReactNode } from 'react';
import { cx } from '../../../lib/cx';

export interface SwitchProps {
  label?: ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  /** Receives the new boolean value. */
  onChange?: (value: boolean) => void;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
}

/** On/off toggle — settings and preferences (e.g. annual billing). */
export function Switch({ label, checked, defaultChecked, onChange, disabled, className, style }: SwitchProps) {
  const [inner, setInner] = useState(!!defaultChecked);
  const on = checked !== undefined ? checked : inner;
  const lid = useId();
  const flip = () => { if (disabled) return; if (checked === undefined) setInner(!on); onChange?.(!on); };
  return (
    <span className={cx('ds-switch', disabled && 'ds-switch--disabled', className)} style={style}>
      <button type="button" role="switch" aria-checked={on} aria-labelledby={label ? lid : undefined} onClick={flip} disabled={disabled} className="ds-switch__track">
        <span className="ds-switch__thumb" />
      </button>
      {label && <span id={lid} className="ds-switch__label" onClick={flip}>{label}</span>}
    </span>
  );
}
