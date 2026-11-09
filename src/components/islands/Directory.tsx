import { useMemo, useState } from 'react';
import { directory, sectors } from '@content/community';
import { Button } from '../ds/core/Button';
import { Tag } from '../ds/core/Tag';
import { Input } from '../ds/forms/Input';
import { Placeholder } from '../site/Placeholder';

/**
 * Ledegids: search Input + sector Tags filter the member list.
 * Search matches name, sector and area (the prototype matched name only; "Bv. boekhouer, Centurion"
 * implies sector/area too). Empty state points visitors to Vra die Kamer.
 * TODO(content): replace the sample rows with the member list (CONTENT_TODO.md).
 */
export function Directory({ askHref }: { askHref: string }) {
  const [q, setQ] = useState('');
  const [sec, setSec] = useState<string>('Alles');

  const rows = useMemo(() => {
    const terms = q.toLowerCase().split(/[\s,]+/).filter(Boolean);
    return directory.filter(r => {
      if (sec !== 'Alles' && r.sector !== sec) return false;
      const hay = `${r.name} ${r.sector} ${r.area}`.toLowerCase();
      return terms.every(t => hay.includes(t));
    });
  }, [q, sec]);

  return (
    <section className="bg-white dir">
      <div className="wrap">
        <div className="dir__top">
          <Input label="Soek 'n lid of diens" placeholder="Bv. boekhouer, Centurion" type="search" value={q} onChange={e => setQ(e.target.value)} />
          <Placeholder>gids-data uit ledelys</Placeholder>
        </div>
        <div className="tags dir__tags" role="group" aria-label="Sektor">
          {sectors.map(s => <Tag key={s} selected={sec === s} onClick={() => setSec(s)}>{s}</Tag>)}
        </div>
        <p className="sr-only" aria-live="polite">{rows.length} lede gevind</p>
        <div className="dir__list">
          {rows.map(r => (
            <div key={r.name} className="dir__row">
              <span className="dir__name">{r.name} <Placeholder>naam</Placeholder></span>
              <span className="dir__meta">
                <span className="dir__sector">{r.sector}</span>
                <span className="dir__area">{r.area}</span>
              </span>
              <span className="dir__btn"><Button size="sm" variant="ghost" iconRight="arrow-right" href={r.href ?? '#'} aria-label={`Profiel: ${r.name}`}>Profiel</Button></span>
            </div>
          ))}
          {!rows.length && <p className="dir__empty">Geen lede gevind nie. Probeer <a href={askHref}>Vra die Kamer</a>.</p>}
        </div>
      </div>
    </section>
  );
}
