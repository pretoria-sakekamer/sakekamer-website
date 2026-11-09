import { useId, type CSSProperties, type SelectHTMLAttributes } from 'react';
import { Icon } from '../core/Icon';
import { FieldHint, FieldLabel } from './Field';

export interface SelectOption { value: string; label: string; }
export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'style'> {
  label?: string;
  hint?: string;
  error?: string;
  options?: Array<string | SelectOption>;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  value?: string;
  defaultValue?: string;
  id?: string;
  style?: CSSProperties;
}

/** Native dropdown styled like Input with a Lucide chevron. */
export function Select({ label, hint, error, options = [], placeholder, required, disabled, id, style, ...rest }: SelectProps) {
  const auto = useId();
  const fid = id || auto;
  const hid = fid + '-hint';
  return (
    <div style={style}>
      <FieldLabel htmlFor={fid} label={label} required={required} />
      <div className="ds-select">
        <select id={fid} className="ds-field__box" disabled={disabled} required={required} aria-invalid={!!error}
          aria-describedby={error || hint ? hid : undefined} {...rest}>
          {placeholder && <option value="">{placeholder}</option>}
          {options.map(o => typeof o === 'string'
            ? <option key={o} value={o}>{o}</option>
            : <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <Icon name="chevron-down" size={18} color="var(--navy-900)" className="ds-select__chev" />
      </div>
      <FieldHint id={hid} hint={hint} error={error} />
    </div>
  );
}
