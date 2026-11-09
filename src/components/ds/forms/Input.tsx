import { useId, type CSSProperties, type InputHTMLAttributes } from 'react';
import { FieldHint, FieldLabel } from './Field';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'style'> {
  label?: string;
  hint?: string;
  /** Error message; turns the border red. */
  error?: string;
  required?: boolean;
  disabled?: boolean;
  type?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  id?: string;
  name?: string;
  style?: CSSProperties;
}

/** Labelled single-line text field, 48px tall, label above in bold Nunito. */
export function Input({ label, hint, error, required, disabled, id, style, ...rest }: InputProps) {
  const auto = useId();
  const fid = id || auto;
  const hid = fid + '-hint';
  return (
    <div style={style}>
      <FieldLabel htmlFor={fid} label={label} required={required} />
      <input id={fid} className="ds-field__box" disabled={disabled} required={required} aria-invalid={!!error}
        aria-describedby={error || hint ? hid : undefined} {...rest} />
      <FieldHint id={hid} hint={hint} error={error} />
    </div>
  );
}
