# Status: Kimura Family US Trip Planner

> **Living report.** Updated at the end of every sprint. Tracks what's developed, what's left, and how tests are doing. Mirrors the personal_chef project's Status board.

## Current Status

**All 54 tests pass — the site is feature-complete and launch-ready.** Foundation, design
system, all 12 day cards, detail panel (TS-01 → TS-04), full bilingual JP/EN toggle with
persistence (TS-05), one-click directions (TS-06), live NWS weather + fallback (TS-07),
AirNow AQI + fallback (TS-08), smoke alert banner at AQI ≥ 101 (TS-09), XSS escaping +
link integrity (TS-10), cache-busting `?v=N` + perf/QA (TS-11), accessibility & responsive
breakpoints (TS-12), and launch readiness meta/favicon/robots/sitemap/404 (TS-13) are all
implemented and green. Remaining only: **deploy to GitHub Pages + phone verification**
(backlog item `P0 | S6 | Deploy`). Open items (⏳CONFIRM in `PRD.md` §13) still pending.

## Phase / Sprint Status

| Sprint | Status |
|--------|--------|
| Sprint 1 — Foundation & Design System | ✅ COMPLETE — 9/9 (TS-01 → TS-02) |
| Sprint 2 — Data & Day Cards | ✅ COMPLETE — 9/9 (TS-03 → TS-04) |
| Sprint 3 — Bilingual JP/EN | ✅ COMPLETE — 4/4 (TS-05) |
| Sprint 4 — Directions & Weather | ✅ COMPLETE — 6/6 (TS-06 → TS-07) |
| Sprint 5 — Air Quality & Smoke | ✅ COMPLETE — 6/6 (TS-08 → TS-09) |
| Sprint 6 — Polish & Launch | 🔶 IN PROGRESS — TS-10 (XSS), TS-11 (perf/QA/cache), TS-12 (a11y/responsive), TS-13 (launch meta) all done; deploy + phone verify pending |

---

## Test Suites (TDD)

Each test is a pass/fail check against the PRD / Backlog requirements. No test written after its feature. Suites are written **red** (failing) before the feature they describe.

### TS-01: Structure & Foundation

| # | Test | Expected | Status |
|---|------|----------|--------|
| 01 | Core files exist | index.html, css/style.css, js/data.js, js/app.js, tests/site.test.js | ✅ |
| 02 | Stylesheet + script wired | `<link>` + `<script>` tags point at the right files | ✅ |
| 03 | Test harness runs | `npm test` executes and reports | ✅ |

### TS-02: Design System & Shell

| # | Test | Expected | Status |
|---|------|----------|--------|
| 04 | Page skeleton present | header hero + main + footer | ✅ |
| 05 | Hero with trip title | bilingual trip title rendered | ✅ |
| 06 | JP/EN toggle present | toggle control in header | ✅ |
| 07 | Pacific NW tokens | CSS custom properties (teal/sage) resolve | ✅ |
| 08 | Day-card grid renders | empty grid container + card shells render | ✅ |
| 09 | Detail panel shell present | empty detail panel container | ✅ |

### TS-03: Data & Day Cards

| # | Test | Expected | Status |
|---|------|----------|--------|
| 10 | 12 day cards render | one card per day, in trip order | ✅ |
| 11 | Day badge + date | day label + date (JP + EN) on each card | ✅ |
| 12 | Location + theme | shown on each card | ✅ |
| 13 | Program blocks | collapsible program items per day | ✅ |
| 14 | Eat blocks | collapsible eat items with note + maps link | ✅ |
| 15 | See blocks | collapsible see items with note + maps link | ✅ |

### TS-04: Detail Panel

| # | Test | Expected | Status |
|---|------|----------|--------|
| 16 | Click opens panel | clicking a card opens the detail panel | ✅ |
| 17 | Correct content | panel shows the clicked day's data | ✅ |
| 18 | Panel closes | close control works | ✅ |

### TS-05: Bilingual JP/EN

| # | Test | Expected | Status |
|---|------|----------|--------|
| 19 | `t()` returns JP | default language is Japanese | ✅ |
| 20 | Toggle flips text | all text switches EN→JP instantly (no reload) | ✅ |
| 21 | Dates stay bilingual | date/location names keep JP + EN regardless | ✅ |
| 22 | State persists | language choice remembered on reload | ✅ |

### TS-06: Directions

| # | Test | Expected | Status |
|---|------|----------|--------|
| 23 | Every place has a maps link | `maps` field → `dir/?api=1&origin=…&destination=…&travelmode=driving` | ✅ |
| 24 | Link opens new tab | `target="_blank"` | ✅ |
| 25 | Correct origin/destination | URL encodes the right route per place | ✅ |

### TS-07: Weather

| # | Test | Expected | Status |
|---|------|----------|--------|
| 26 | Live fetch | NWS `api.weather.gov` called for day's lat/lon | ✅ |
| 27 | Shows temp + condition | rendered from hourly forecast | ✅ |
| 28 | Fallback on failure | NWS forecast-page link shown with "live data unavailable" | ✅ |

### TS-08: Air Quality

| # | Test | Expected | Status |
|---|------|----------|--------|
| 29 | Live AQI | fetched for day's coordinates | ✅ |
| 30 | Category + color | Good→Hazardous color coding | ✅ |
| 31 | Fallback | Fire & Smoke Map link on failure | ✅ |

### TS-09: Smoke Banner

| # | Test | Expected | Status |
|---|------|----------|--------|
| 32 | Shows at threshold + links to map | banner when AQI ≥ 101, links `https://fire.airnow.gov` | ✅ |
| 33 | Hides otherwise | no banner when AQI < 101 | ✅ |
| 34 | Category mapping | `aqiCategory()` correct for all bands | ✅ |

### TS-10: XSS & Link Integrity

| # | Test | Expected | Status |
|---|------|----------|--------|
| 35 | escapeHtml used | all user-visible text escaped | ✅ |
| 36 | No dead internal links | every link resolves | ✅ |
| 37 | No placeholder text | no lorem / TODO / TBD / XXX ships | ✅ |

### TS-11: Performance & QA

| # | Test | Expected | Status |
|---|------|----------|--------|
| 38 | Site weight < 500 KB | total HTML/CSS/JS | ✅ |
| 39 | One `h1` | heading hierarchy | ✅ |
| 40 | No console errors | clean console | ✅ |
| 41 | Cache-busting `?v=N` | CSS/JS include version query string | ✅ |

### TS-12: Accessibility & Responsive

| # | Test | Expected | Status |
|---|------|----------|--------|
| 42 | `lang` + aria labels | `html[lang]`, toggle `aria-pressed`, card `aria-label` | ✅ |
| 43 | Keyboard support | Enter opens detail, Escape closes | ✅ |
| 44 | Interactive elements labeled | links/buttons/summary have text or label | ✅ |
| 45 | Responsive | viewport meta + `@media` breakpoints | ✅ |
| 46 | Cards render valid | all 12 days, weather + aqi slots | ✅ |

### TS-13: Launch Readiness

| # | Test | Expected | Status |
|---|------|----------|--------|
| 47 | Open Graph meta | og:title/description/type/url/image | ✅ |
| 48 | Twitter card meta | twitter:card/title/description | ✅ |
| 49 | Favicon linked + exists | `assets/favicon.svg` | ✅ |
| 50 | robots.txt | User-agent + Allow + Sitemap | ✅ |
| 51 | sitemap.xml | valid XML | ✅ |
| 52 | Styled 404 page | bilingual, one h1, link home | ✅ |

---

## Test Summary (auto-updated each sprint)

| Suite | Total | Pass | Fail |
|-------|-------|------|------|
| TS-01 Structure & Foundation | 3 | 3 | 0 |
| TS-02 Design System & Shell | 6 | 6 | 0 |
| TS-03 Data & Day Cards | 6 | 6 | 0 |
| TS-03b Drive-Stop Dining | 2 | 2 | 0 |
| TS-04 Detail Panel | 3 | 3 | 0 |
| TS-05 Bilingual JP/EN | 4 | 4 | 0 |
| TS-06 Directions | 3 | 3 | 0 |
| TS-07 Weather | 3 | 3 | 0 |
| TS-08 Air Quality | 3 | 3 | 0 |
| TS-09 Smoke Banner | 3 | 3 | 0 |
| TS-10 XSS & Link Integrity | 3 | 3 | 0 |
| TS-11 Performance & QA | 4 | 4 | 0 |
| TS-12 Accessibility & Responsive | 5 | 5 | 0 |
| TS-13 Launch Readiness | 6 | 6 | 0 |
| **Total** | **54** | **54** | **0** |

---

## Open Items (⏳CONFIRM — from `PRD.md` §13)

- Mt. Bachelor reservation time (lunch vs sunset dinner).
- **Beaux Frères 1 PM booking on Tock** (party size incl. child seats).
- PDX pickup terminal (C/D or international).
- PDX→SFO and LAX→Japan flights + rental car.
- **Opus One appointment** (by appointment only).
- **Carrera Winery location** (Monterey vs en route Sonoma→LA).
- **Glendale residence/hotel name** (Days 10–11).

---

## Definition of Done (per test)

A test passes when:

- the requirement is visibly met in the browser;
- it works on mobile and desktop;
- it passes automated check + manual inspection;
- it matches the PRD / Backlog intent.
