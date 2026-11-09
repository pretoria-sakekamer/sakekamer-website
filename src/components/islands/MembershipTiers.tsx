import { useState } from 'react';
import { ANNUAL_DISCOUNT, TALK_THRESHOLD, tierFeatures, tiers } from '@content/membership';
import { Button } from '../ds/core/Button';
import { Icon } from '../ds/core/Icon';
import { TierCard } from '../ds/brand/TierCard';
import { Switch } from '../ds/forms/Switch';
import { Kicker } from '../site/Kicker';
import { Placeholder } from '../site/Placeholder';
import { rand } from '../../lib/format';
import { requestJoin } from '../../lib/bus';

const annualPrice = (m: number) => m * 12 * (1 - ANNUAL_DISCOUNT);

/**
 * Lidmaatskap heading with the annual/monthly Switch (annual = monthly × 12 × 0.9) and the
 * five-column comparison table (Koppel recommended, navy column).
 * ≤760px the table becomes stacked TierCards (README "Responsive").
 * Join buttons call requestJoin() — handled by GlobalUI (toast + TODO membership platform).
 */
export function MembershipTiers() {
  const [annual, setAnnual] = useState(true);
  const price = (m: number) => rand(annual ? annualPrice(m) : m);
  const per = annual ? 'per jaar' : 'per maand';
  const cta = (m: number) => (m >= TALK_THRESHOLD ? 'Gesels' : 'Sluit aan');

  return (
    <>
      <section className="bg-paper mhead">
        <div className="wrap">
          <Kicker>Lidmaatskap</Kicker>
          <div className="mhead__row">
            <h1 className="h-xl">Kies wat jy<br /><i className="em-gold">wil bereik.</i></h1>
            <Switch label="Jaarliks (10% afslag)" checked={annual} onChange={setAnnual} />
          </div>
        </div>
      </section>
      <section className="bg-paper tiers" id="vlakke" aria-label="Lidmaatskapvlakke">
        <div className="wrap">
          <div className="tiers__scroll">
            <table className="ttable">
              <thead>
                <tr>
                  <th scope="col" className="ttable__corner">Pryse is die direksie se voorstel <Placeholder>finaal?</Placeholder></th>
                  {tiers.map(t => (
                    <th key={t.id} scope="col" className={'ttable__tier' + (t.star ? ' ttable__tier--star' : '')}>
                      <div className="ttable__name">{t.name}{t.star && ' ★'}</div>
                      <div className="ttable__price">{price(t.m)}</div>
                      <div className="ttable__per">{per}</div>
                      <div className="ttable__for">{t.for}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tierFeatures.map(f => (
                  <tr key={f.label}>
                    <th scope="row" className="ttable__label">{f.label}</th>
                    {tiers.map((t, i) => (
                      <td key={t.id} className={'ttable__cell' + (t.star ? ' ttable__cell--star' : '')}>
                        {i + 1 >= f.min
                          ? <Icon name="check" size={18} color="var(--gold-600)" label="Ingesluit" />
                          : <span className="ttable__no" aria-label="Nie ingesluit nie">—</span>}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td />
                  {tiers.map(t => (
                    <td key={t.id} className="ttable__cta">
                      <Button size="sm" variant={t.star ? 'primary' : 'secondary'} onClick={() => requestJoin(t.name)}>{cta(t.m)}</Button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <div className="tcards">
            <p className="ttable__corner" style={{ padding: 0, width: 'auto' }}>Pryse is die direksie se voorstel <Placeholder>finaal?</Placeholder></p>
            {tiers.map(t => (
              <TierCard key={t.id} name={t.name + (t.star ? ' ★' : '')} price={price(t.m)} period={' ' + per} summary={t.for}
                features={tierFeatures.filter(f => tiers.indexOf(t) + 1 >= f.min).map(f => f.label)}
                featured={t.star} cta={cta(t.m)}
                onCta={() => requestJoin(t.name)}
                style={{ borderRadius: 0 }} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
