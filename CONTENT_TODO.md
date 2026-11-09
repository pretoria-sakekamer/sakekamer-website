# Content to do

Every gold **PLEKHOUER** label on the site is listed here. Each label marks content the Sakekamer still has to supply. The labels stay visible on purpose until the content arrives.

- **To fill a placeholder:** edit the file shown, replacing the `<Placeholder>…</Placeholder>` or `ph('…')` with the real content, and tick it off here.
- **To hide every label at once** (only once this list is clear): set `PUBLIC_SHOW_PLACEHOLDERS=false` in Vercel → Project → Settings → Environment Variables.
- **To find them in the code:** search for `<Placeholder` or `ph('`.

There are 31 placeholders, matching the prototype one for one. Some repeat on the page, so the counts are shown.

---

## Global

| # | Label on site | What is needed | File |
|---|---|---|---|
| G1 | `EN-kopie` | All English copy. This label appears on every `/en/…` page. | `src/layouts/BaseLayout.astro` (banner), `src/i18n/ui.ts` (UI strings) |
| G2 | `pryse` | Event prices for members and for guests. Shown in the booking dialog. | `src/components/islands/GlobalUI.tsx` |
| G3 | `skakel` | Joining URL or membership platform. Shown in the toast after "Sluit aan" or "Gesels". | `src/components/islands/GlobalUI.tsx`, `content/site.ts` → `portalUrl` |

## Home (`/`)

| # | Label on site | What is needed | File |
|---|---|---|---|
| H1 | `Fotograaf / regte` | Credit and usage rights for the Klapperkop photo | `src/components/sections/Hero.astro` |
| H2 | `bevestig beleid` | Confirm the policy "Nie 'n lid nie? Jou eerste vraag is op ons." (Vra die Kamer dialog) | `src/components/islands/AskTheChamber.tsx` |
| H3 | `kwartaal` | Which quarter the report-back figures cover | `src/components/sections/Proof.astro` |
| H4–H6 | `#` (×3) | Quarterly figures: problems solved through Vra die Kamer, referrals between members, spotlights published | `content/community.ts` → `stats` |
| H7 | `bevestig syfers` | Value of one breakfast saving (now R150) and of one spotlight (now R3 500), used by the calculator. Shown on Home and on Lidmaatskap. | `content/membership.ts` → `calculator` |
| H8–H11 | `Lid se naam` (×4) | Real "Wie soek wat" posts with member names | `content/community.ts` → `wanted` |
| H12 | `nr.` | Edition number of the next Koffie-en-Kenmekaar | `src/components/sections/NextEdition.astro` |
| H13 | `naam en onderwerp` | Guest speaker and topic for 18 November | `src/components/sections/NextEdition.astro` |
| H14 | `maand se tema` | Which pillar is the month's theme | `src/components/sections/NextEdition.astro` |
| H15 | `lidprys` | Member price for the breakfast | `src/components/sections/NextEdition.astro` |
| H16 | `volle prys` | Guest price for the breakfast | `src/components/sections/NextEdition.astro` |
| H17 | `portret` (dark) | Portrait of the chairman | `src/components/sections/Voice.astro` |
| H18 | `ledefoto` (×3) | Photo for each member story | `src/components/sections/Stories.astro` |
| H19 | `pilaar` (×3) | Pillar each story belongs to | `src/components/sections/Stories.astro` |
| H20 | `besigheid` (×3) | Business name in each story title | `src/components/sections/Stories.astro` |
| H21 | `Kort ledeverhaal: …` (×3) | Short story text: the problem, who helped, the outcome | `src/components/sections/Stories.astro` |
| H22 | `bevestig aanbod` (dark) | Confirm step iii, "'n direkteur stel jou aan drie lede voor". Shown on Home, Wat jy kry and Lidmaatskap. | `src/components/sections/JoinSteps.astro` |

## Wat jy kry (`/wat-jy-kry`)

| # | Label on site | What is needed | File |
|---|---|---|---|
| W1 | `drywer van die pilaar` (×6) | The board member or member who leads each pillar | `src/components/pages/ValuePage.astro` (consider adding a `driver` field to `content/pillars.ts`) |

## Lidmaatskap (`/lidmaatskap`)

| # | Label on site | What is needed | File |
|---|---|---|---|
| L1 | `finaal?` | Final tier prices. The current prices are the board's proposal (R100 / R375 / R800 / R1 800 / R6 000 per month). | `content/membership.ts` → `tiers` |

## Funksies (`/funksies`)

| # | Label on site | What is needed | File |
|---|---|---|---|
| F1 | `datum` | December date. Also all speakers and dates after 18 November. | `src/components/pages/EventsPage.astro`, `content/events.ts` |
| F2 | `volgende datum` (×3) | Next date for Koffie-en-Kenmekaar, SakeSkool and SakeWêreld | `src/components/pages/EventsPage.astro` (consider a `next` field on `content/events.ts` → `eventFormats`) |

## Ledegids (`/ledegids`)

| # | Label on site | What is needed | File |
|---|---|---|---|
| D1 | `gids-data uit ledelys` | The member directory data, either as an export of the member list or from the member portal | `content/community.ts` → `directory` |
| D2 | `naam` (×8) | Real business names, which replace the sample "Besigheid 1–8" | `content/community.ts` → `directory` |

## Oor ons (`/oor-ons`)

| # | Label on site | What is needed | File |
|---|---|---|---|
| A1 | `portret` (×7) | Board and management portraits, 4:5. Add each as `portrait` on the team member. | `content/community.ts` → `team` |
| A2 | `jaarverslag (PDF)` | Annual report | `src/components/pages/AboutPage.astro` |
| A3 | `grondwet en beleid` | Constitution and policies | `src/components/pages/AboutPage.astro` |
| A4 | `PAIA-handleiding` | PAIA manual | `src/components/pages/AboutPage.astro` |

---

## Not shown as a label, but still needed

**Links and integrations.** The forms validate input and have spam protection: a hidden honeypot field and a minimum fill time. Nothing is sent anywhere yet. Everything goes through one function, `submitForm()` in `src/lib/forms.ts`.

- [ ] **Vra die Kamer** → email/CRM, with the 48-hour service promise
- [ ] **Event booking** → events or membership platform (TBC)
- [ ] **Newsletter** → mail platform
- [ ] **Join** ("Sluit aan" / "Gesels") → membership platform or joining URL
- [ ] **Member portal** URL for "Lede-portaal · Teken in" (`content/site.ts` → `portalUrl`)
- [ ] **Renewal** URL
- [ ] **Member profile** URLs for the "Profiel" buttons in the Ledegids (`content/community.ts` → `directory[].href`)
- [ ] **Privaatheid / POPIA / PAIA** pages or documents for the footer links

**New copy to review.** The prototype had no wording for these, so the developer wrote it. Please check it, since the rest of the copy is final.

- Toast after Vra die Kamer: "Dankie! Ons het jou vraag ontvang." / "Binne 48 uur verbind ons jou met 'n lid wat kan help."
- Toast after the newsletter sign-up: "Dankie! Jy is ingeteken." / "Die nuusbrief kom elke maand na jou inkassie."
- Form error messages in `src/lib/forms.ts`, for example "Voer asseblief 'n geldige e-posadres in."
- The 404 page: "Hierdie bladsy bestaan nie."
- Alt text for the two photos, and screen-reader-only labels such as "Gaan na inhoud" and "Kieslys"

**Other.**

- [ ] English slugs, if wanted (for example `/en/membership`). Today `/en/` mirrors the Afrikaans slugs.
- [ ] Event photo credit (`public/images/event-2.jpg`)
