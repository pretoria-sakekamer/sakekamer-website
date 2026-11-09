import { useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from 'react';
import { cx } from '../../../lib/cx';

export interface TabItem { value: string; label: ReactNode; }
export interface TabsProps {
  tabs: Array<string | TabItem>;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onDark?: boolean;
  style?: CSSProperties;
}

const norm = (t: string | TabItem): TabItem => (typeof t === 'string' ? { value: t, label: t } : t);

/** Underlined uppercase tabs with a gold active rule. Render the panel yourself based on `value`. */
export function Tabs({ tabs, value, defaultValue, onChange, onDark = false, style }: TabsProps) {
  const items = tabs.map(norm);
  const [inner, setInner] = useState(defaultValue ?? items[0]?.value);
  const cur = value !== undefined ? value : inner;
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const select = (v: string) => { if (value === undefined) setInner(v); onChange?.(v); };
  const onKey = (e: KeyboardEvent, i: number) => {
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const n = (i + d + items.length) % items.length;
    refs.current[n]?.focus();
    select(items[n].value);
  };
  return (
    <div role="tablist" className={cx('ds-tabs', onDark && 'ds-tabs--on-dark')} style={style}>
      {items.map((t, i) => {
        const on = t.value === cur;
        return (
          <button key={t.value} ref={el => { refs.current[i] = el; }} type="button" role="tab" aria-selected={on} tabIndex={on ? 0 : -1}
            className="ds-tabs__tab" onClick={() => select(t.value)} onKeyDown={e => onKey(e, i)}>{t.label}</button>
        );
      })}
    </div>
  );
}
