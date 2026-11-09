import { useId, type CSSProperties, type TextareaHTMLAttributes } from 'react';
import { FieldHint, FieldLabel } from './Field';

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'style'> {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  placeholder?: string;
  value?: string;
  id?: string;
  style?: CSSProperties;
}

/** Multi-line field — e.g. the "Vra die Kamer" problem description. */
export function Textarea({ label, hint, error, required, disabled, rows = 4, id, style, ...rest }: TextareaProps) {
  const auto = useId();
  const fid = id || auto;
  const hid = fid + '-hint';
  return (
    <div style={style}>
      <FieldLabel htmlFor={fid} label={label} required={required} />
      <textarea id={fid} rows={rows} className="ds-field__box ds-field__box--textarea" disabled={disabled} required={required}
        aria-invalid={!!error} aria-describedby={error || hint ? hid : undefined} {...rest} />
      <FieldHint id={hid} hint={hint} error={error} />
    </div>
  );
}
