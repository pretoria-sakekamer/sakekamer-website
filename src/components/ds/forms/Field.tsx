import type { ReactNode } from 'react';

/** Shared label + hint/error wrapper for Input, Select and Textarea. */
export function FieldLabel({ htmlFor, label, required }: { htmlFor: string; label?: string; required?: boolean }) {
  if (!label) return null;
  return (
    <label htmlFor={htmlFor} className="ds-field__label">
      {label}{required && <span className="ds-field__req" aria-hidden="true"> *</span>}
    </label>
  );
}

export function FieldHint({ id, hint, error }: { id: string; hint?: ReactNode; error?: ReactNode }) {
  if (!error && !hint) return null;
  return <div id={id} className={error ? 'ds-field__hint ds-field__hint--error' : 'ds-field__hint'} role={error ? 'alert' : undefined}>{error || hint}</div>;
}
