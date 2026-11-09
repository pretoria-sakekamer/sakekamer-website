import type { CSSProperties, ReactNode } from 'react';

export interface PersonCardProps {
  name: string;
  role?: string;
  /** Portrait URL; without it a sand placeholder with initials is shown. */
  image?: string;
  initials?: string;
  /** Replaces the initials in the empty portrait (e.g. a content placeholder label). */
  placeholder?: ReactNode;
  style?: CSSProperties;
}

/** Team/board member portrait (4:5, gold bottom rule) with name and gold role line. */
export function PersonCard({ name, role, image, initials, placeholder, style }: PersonCardProps) {
  const ini = initials || name.split(' ').filter(w => /^[A-Z]/.test(w)).slice(0, 2).map(w => w[0]).join('');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, ...style }}>
      <div style={{ aspectRatio: '4/5', background: image ? `url(${image}) center/cover` : 'var(--sand)', display: 'grid', placeItems: 'center', borderBottom: '2px solid var(--gold-500)' }}>
        {!image && (placeholder ?? <span style={{ font: '500 56px/1 var(--font-display)', color: 'var(--navy-400)', letterSpacing: '.04em' }}>{ini}</span>)}
      </div>
      <div>
        <div style={{ font: '600 22px/1.2 var(--font-display)', color: 'var(--navy-900)' }}>{name}</div>
        {role && <div style={{ font: '700 12px/1.3 var(--font-sans)', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--gold-700)', marginTop: 6 }}>{role}</div>}
      </div>
    </div>
  );
}
