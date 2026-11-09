import { useState, type ReactNode } from 'react';
import { ANNUAL_DISCOUNT, calculator, tiers } from '@content/membership';
import type { TierId } from '@content/types';
import { Button } from '../ds/core/Button';
import { Tag } from '../ds/core/Tag';
import { Switch } from '../ds/forms/Switch';
import { Kicker } from '../site/Kicker';
import { Placeholder } from '../site/Placeholder';
import { decimalAf, rand } from '../../lib/format';

const { BREAKFAST_SAVING, SPOTLIGHT_VALUE, defaults, ranges } = calculator;

/**
 * "Lidmaatskap betaal vir homself" calculator.
 * value = referrals × referralValue + breakfasts × BREAKFAST_SAVING + (spotlight ? SPOTLIGHT_VALUE : 0)
 * fee   = monthly × 12 × (1 − 10%)
 * The bar's midpoint marks where membership pays for itself (ratio 1).
 */
export function Calculator({ joinHref }: { joinHref: string }) {
  const [tier, setTier] = useState<TierId>(defaults.tier);
  const [ref, setRef] = useState(defaults.referrals);
  const [refVal, setRefVal] = useState(defaults.referralValue);
  const [bf, setBf] = useState(defaults.breakfasts);
  const [spot, setSpot] = useState(defaults.spotlight);

  const t = tiers.find(x => x.id === tier) ?? tiers[1];
  const fee = t.m * 12 * (1 - ANNUAL_DISCOUNT);
  const value = ref * refVal + bf * BREAKFAST_SAVING + (spot ? SPOTLIGHT_VALUE : 0);
  const ratio = value / fee;

  return (
    <section className="bg-white py-112 rule-top" aria-labelledby="reken-h">
      <div className="wrap">
        <Kicker n="★">Reken self uit</Kicker>
        <div className="calc__grid">
          <div className="calc__inputs">
            <h2 id="reken-h" className="h-l">Lidmaatskap betaal<br /><i className="em-gold">vir homself.</i></h2>
            <div className="tags" role="group" aria-label="Lidmaatskapvlak">
              {tiers.map(x => <Tag key={x.id} selected={tier === x.id} onClick={() => setTier(x.id)}>{x.name}</Tag>)}
            </div>
            <Slider label="Verwysings deur lede per jaar" value={ref} onChange={setRef} {...ranges.referrals} format={v => v} />
            <Slider label="Waarde van een verwysing" value={refVal} onChange={setRefVal} {...ranges.referralValue} format={rand} />
            <Slider label="Ontbyte bygewoon (afslag elk)" value={bf} onChange={setBf} {...ranges.breakfasts} format={v => v} />
            <Switch label="'n Ledekollig op ons platforms" checked={spot} onChange={setSpot} />
            <p className="note">Afslag per ontbyt en waarde van 'n kollig: <Placeholder>bevestig syfers</Placeholder></p>
          </div>
          <div className="calc__panel" aria-live="polite">
            <div className="calc__pair">
              <div>
                <div className="calc__lab">JY BETAAL</div>
                <div className="calc__num">{rand(fee)}</div>
                <div className="calc__sub">{t.name}, jaarliks (10% afslag)</div>
              </div>
              <div>
                <div className="calc__lab calc__lab--gold">JY KRY</div>
                <div className="calc__num calc__num--gold">{rand(value)}</div>
                <div className="calc__sub">geskatte waarde per jaar</div>
              </div>
            </div>
            <div className="calc__bar" role="img" aria-label={`Waarde is ${decimalAf(ratio)} keer die fooi`}>
              <div className="calc__fill" style={{ width: Math.min(100, ratio * 50) + '%' }} />
              <div className="calc__mid" />
            </div>
            <div className="calc__verdict">
              {ratio >= 1
                ? <>Jou lidmaatskap betaal homself <b>{decimalAf(ratio)}×</b> terug.</>
                : <>Nog {rand(fee - value)} tot jou lidmaatskap homself betaal.</>}
            </div>
            <Button iconRight="arrow-right" href={joinHref}>Kies {t.name}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

interface SliderProps {
  label: string; value: number; onChange: (v: number) => void;
  min: number; max: number; step: number; format: (v: number) => ReactNode;
}

function Slider({ label, value, onChange, min, max, step, format }: SliderProps) {
  return (
    <label className="slider">
      <span className="slider__top"><span>{label}</span><span className="slider__v">{format(value)}</span></span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(+e.target.value)} />
    </label>
  );
}
