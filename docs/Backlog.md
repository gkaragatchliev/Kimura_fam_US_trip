# Backlog: Kimura Family US Trip Planner

## 1. Product Goal

Deliver a polished, **bilingual (JP + EN)** static single-page website the Kimura family
opens on their phones during their **Aug 12–23, 2026** US trip. For each of the **12
days** it shows optional program, best places to eat, best places to visit, one-click
Google Maps driving directions, live weather, and live air quality / wildfire smoke with
a prominent smoke alert banner. Static, no backend, deployed on **GitHub Pages**.

## 2. Working Agreement (TDD)

This project is **test-driven, sprint by sprint**:

- **Red**: a test is written *before* its feature. Run it — it fails.
- **Green**: implement the minimum to make it pass. Run it — it passes.
- We move to the next feature **only after** its test passes.
- Between sprints we **stop and report**: what's developed, what's left (tracked in
  `docs/Status.md`).
- Every test maps to a requirement in `PRD.md` (sections 5–9).

## 3. Delivery Strategy — Sprints

### Sprint 1 — Foundation & Design System (DESIGN PHASE)
Scaffold + test infra, page skeleton, "Pacific NW" teal/sage design tokens, the
day-card grid + detail panel shells, and the JP/EN toggle shell. Deliverable: a
working, viewable shell with passing foundation tests.

### Sprint 2 — Data & Day Cards
Fill `js/data.js` with all **12 days** of verified content and render cards + collapsible
program / eat / see blocks.

### Sprint 3 — Bilingual JP/EN
`t()` helper, language toggle (no reload), full translation of all text; dates and
location names stay bilingual.

### Sprint 4 — Directions & Weather
One-click Google Maps direction buttons per place, NWS live weather fetch with a
fallback link on failure.

### Sprint 5 — Air Quality & Smoke
Live AQI (keyless `fire.airnow.gov`), color-coded categories, smoke alert banner
(AQI ≥ 101) linking to the Fire & Smoke Map.

### Sprint 6 — Polish & Launch
Accessibility, responsive QA, cache-busting `?v=N`, XSS pass, final `npm test`, deploy
to GitHub Pages, verify on a phone.

---

## 4. Backlog Items

| Priority | When | Feature | Tests | Status |
|---|---|---|---|---|
| P0 | S1 | Create project scaffold (package.json, tests/, .gitignore) | TS-01 | ✅ DONE |
| P0 | S1 | Write Sprint 1 test suite (red) | TS-01 → TS-02 | ✅ DONE |
| P0 | S1 | Build page skeleton + hero with JP/EN toggle | TS-02 | ✅ DONE |
| P0 | S1 | Design "Pacific NW" tokens + day-card grid + detail panel shells | TS-02 | ✅ DONE |
| P0 | S2 | Fill `js/data.js` with 12 verified days | TS-03 | ✅ DONE |
| P0 | S2 | Render day cards + collapsible program/eat/see blocks | TS-03 | ✅ DONE |
| P0 | S2 | Drive-stop dining: kid-friendly lunch/snack options on both Hillsboro↔Bend legs | TS-03b | ✅ DONE |
| P0 | S2 | Detail panel opens on card click | TS-04 | ✅ DONE |
| P0 | S3 | `t()` helper + language toggle (no reload) | TS-05 | ✅ DONE |
| P0 | S4 | One-click Google Maps direction buttons | TS-06 | ✅ DONE |
| P0 | S4 | Live weather widget + fallback link | TS-07 | ✅ DONE |
| P0 | S5 | Live AQI widget + color coding | TS-08 | ✅ DONE |
| P0 | S5 | Smoke alert banner (AQI ≥ 101) | TS-09 | ✅ DONE |
| P0 | S6 | Accessibility + responsive QA | TS-10 → TS-13 | ✅ DONE |
| P0 | S6 | Cache-busting query strings (`?v=N`) | TS-11 | ✅ DONE |
| P0 | S6 | XSS escaping pass | TS-10 | ✅ DONE |
| P0 | S6 | Deploy to GitHub Pages + phone verification | — | ✅ DONE — live at https://gkaragatchliev.github.io/Kimura_fam_US_trip/ |
| P1 | S6 | Launch readiness: OG/Twitter meta, favicon, robots.txt, sitemap.xml, 404 | TS-13 | ✅ DONE |
| P2 | S6 | "How This Site Was Built" chapter (tools, install, GitHub, PRD/TDD, LLM prompting) | TS-13c | ✅ DONE |
| P2 | Future | Offline caching (service worker) if family reports poor signal | — | ⬜ NOT STARTED |

---

## 5. Sprint Test Suites

1. **TS-01 Structure & Foundation** — files exist; stylesheet + script wired.
2. **TS-02 Design System & Shell** — page skeleton, hero + JP/EN toggle, Pacific NW tokens, day-card grid + detail panel shells render.
3. **TS-03 Data & Day Cards** — all 12 days render; program/eat/see collapsible blocks present per day.
3b. **TS-03b Drive-Stop Dining** — both drive days (Hillsboro↔Bend) list ≥ 3 kid-friendly lunch/snack stops with maps links and family-friendly notes.
4. **TS-04 Detail Panel** — clicking a card opens its detail panel with the right content.
5. **TS-05 Bilingual JP/EN** — `t()` returns JP/EN; toggle flips all text without reload; single-language view (whole page either JP or EN, never mixed).
6. **TS-06 Directions** — every place has a one-click Google Maps `dir/?api=1` link with the correct origin/destination; opens in a new tab.
7. **TS-07 Weather** — NWS live fetch succeeds or gracefully falls back to the NWS forecast-page link; shows temp + condition.
8. **TS-08 Air Quality** — live AQI number + category with correct color coding; fallback to Fire & Smoke Map on failure.
9. **TS-09 Smoke Banner** — shows when AQI ≥ 101 (or smoke source); links to `https://fire.airnow.gov`; hides otherwise.
10. **TS-10 XSS & Link Integrity** — `escapeHtml` escapes all user-visible text; no dead internal links; no placeholder text.
11. **TS-11 Performance & QA** — site weight budget, one `h1`, no console errors, cache-busting `?v=N` on CSS/JS.
12. **TS-12 Accessibility & Responsive** — touch targets ≥ 44px, body text ≥ 16px, no horizontal overflow at 375/768/1280px, JP/EN toggle reachable, color contrast ≥ 4.5:1.
13. **TS-13 Launch Readiness** — Open Graph + Twitter card meta, favicon linked + exists, `robots.txt`, valid `sitemap.xml`, styled 404 page, GitHub Pages live.

---

## 6. Definition of Done

A backlog item is done when:

- its tests were written **first** (red), then the feature made them pass (green);
- it matches the PRD / UX / Graphics intent;
- it works on mobile, tablet, and desktop;
- it is readable and accessible;
- it fits the static, no-backend approach;
- it can be maintained with a text editor only;
- the board (`docs/Status.md`) reflects reality.
