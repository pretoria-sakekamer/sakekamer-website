# Pretoria Sakekamer website

The production site for **pretoriasake.co.za**, built from the v2 design handoff.

It uses **Astro 7, TypeScript and React 19 islands**, with plain CSS built on the brand tokens. The site is fully static, so it runs on Vercel's free (Hobby) plan without an adapter.

## Run it

```bash
npm install
```

```bash
npm run dev       # http://localhost:4321
```

```bash
npm run build     # type check + static build into dist/
```

## Where things live

| What | Where |
|---|---|
| **Copy and data you edit** (pillars, tiers, events, team, Wie soek wat, figures) | `content/*.ts`, all typed in `content/types.ts` |
| Brand tokens (copied verbatim from `design/tokens`) | `src/styles/tokens/` |
| Design-system components (typed port of `design/components`) | `src/components/ds/` |
| Site primitives (`Placeholder`, `Kicker`, `Masthead`, `SiteFooter`) | `src/components/site/` |
| Static page sections | `src/components/sections/` |
| Interactive React islands | `src/components/islands/` |
| Page bodies, one per route | `src/components/pages/` |
| Routes (Afrikaans at `/`, English mirrors at `/en/`) | `src/pages/` |
| UI strings (i18n) | `src/i18n/` |
| Form validation, spam protection and submit stub | `src/lib/forms.ts` |
| Fonts, logos, photos | `public/` |

## Routes

| Route | Page | Source in the prototype |
|---|---|---|
| `/` | Tuis | `Home.jsx` |
| `/wat-jy-kry` | Wat jy kry | `Pages.jsx` (ValuePage) |
| `/lidmaatskap` | Lidmaatskap | `Membership.jsx` |
| `/funksies` | Funksies | `Pages.jsx` (EventsPage) |
| `/ledegids` | Ledegids | `Pages.jsx` (DirectoryPage) |
| `/oor-ons` | Oor ons | `Pages.jsx` (AboutPage) |

Each route also exists under `/en/` (for example `/en/lidmaatskap`). Those pages show the Afrikaans content with an "English version coming soon" banner. They are marked `noindex` and left out of the sitemap until the English copy arrives.

## Placeholders

Content that is still missing appears as a gold **PLEKHOUER · …** label, rendered by `<Placeholder>`. Every one is listed in [`CONTENT_TODO.md`](./CONTENT_TODO.md). Once that list is clear, hide them all by setting `PUBLIC_SHOW_PLACEHOLDERS=false`.

## Interactions

- **Toast and booking dialog.** Both are global and mounted once in the layout (`GlobalUI`).
  - Any island can call `showToast()`, `openBooking()` or `requestJoin()` from `src/lib/bus.ts`.
  - A static button can open the booking dialog with `data-action="book"`.
- **Motion.**
  - The rally-cry auto-flip (every 3.8s) and the cycling Vra die Kamer examples stop when the visitor has `prefers-reduced-motion` set.
  - All CSS transitions are cut under the same setting.
- **Forms.** All forms validate on the client and carry a honeypot and minimum-fill-time check. Submissions are a **stub** for now; see the TODO in `src/lib/forms.ts` and the "Integrations" list in `CONTENT_TODO.md`.

## Brand rules

- Keep all Afrikaans copy exactly as written.
- No emoji.
- Never use the retired tagline "Die kampvegter vir 'n selfstandige sakegemeenskap".
- See the handoff's `design/BRAND_GUIDE.md`.

## Deploying (Vercel)

Import the GitHub repo in Vercel. It detects Astro and needs no settings: the build command is `npm run build` and the output folder is `dist`.
