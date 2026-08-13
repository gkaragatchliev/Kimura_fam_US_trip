# PRD: キムラ家アメリカ旅行サイト / Kimura Family US Trip — Trip Website

**Prepared for:** The Kimura family planning their Aug 2026 US trip
**Reference project:** [`Hotspring_BG`](../Hotspring_BG) — small static vanilla HTML/CSS/JS
site with data-driven content, deployed on GitHub Pages. This PRD reuses that pattern
for a **day-by-day family trip planner**.
**Status:** Draft for review · **Last updated:** 2026-08-12
**Key dates:** Trip runs **Aug 12–18, 2026** (7 days). Today is Wed Aug 12.

---

## 1. 製品概要 / Product Overview

A single-page static website the family opens on their phones during the trip. For each
of the 7 days it shows:

- **プログラム案 / Program options** — 2–3 optional itineraries per day so the family can
  pick based on energy/weather.
- **食事 / Best places to eat** — short list with a one-line note + directions link.
- **観光 / Best places to visit** — short list with a one-line note + directions link.
- **道順リンク / Driving directions** — one-click Google Maps links (no copy/paste).
- **天気 / Current weather** — live temperature & conditions, plus a fallback link.
- **空気質 / Air quality + 山火事 / wildfire smoke** — live AQI for the area with a
  prominent **smoke alert banner** (late-summer Oregon) and a link to the AirNow Fire &
  Smoke Map.

The site is **bilingual JP + EN** with a language toggle: the whole page renders in
**one language at a time** — completely Japanese or completely English (no mixed output).

**Traveling party:** Kimura family **incl. a 5-year-old child** — all activities are
selected with a young child in mind (short, low-effort, family-friendly, snacks/bathroom
available).

---

## 2. 旅行概要 / Trip Overview

| Day | Date | Location | Theme |
|---|---|---|---|
| Day 1 | Wed Aug 12 | Hillsboro, OR | 到着・周辺散策 / Arrival & explore home base |
| Day 2 | Thu Aug 13 | Hillsboro → **Tumalo, OR** | ドライブ＋友人家族と夕食 / Drive to Tumalo (friends' home), dinner with them |
| Day 3 | Fri Aug 14 | **Tumalo / Bend, OR** | 自由日・夕方まで自宅で夕食 / Free day, base at friends' home in Tumalo, evening dinner at home |
| Day 4 | Sat Aug 15 | **Tumalo + Mt. Bachelor** | 午前は川/湖で泳ぐ → 山頂レストラン予約 / Short morning swim → Mt. Bachelor top-of-lift restaurant (reservation) |
| Day 5 | Sun Aug 16 | Tumalo → **PDX** → Forest Grove | 空港で家族迎え（13:00）→ McMenamins Grand Lodge 泊 / Pick up family at PDX by 1:00 PM, overnight at Grand Lodge |
| Day 6 | Mon Aug 17 | Willamette Valley (Newberg) | ワイナリー予約 13:00 / **Beaux Frères** appointment at 1:00 PM |
| Day 7 | Tue Aug 18 | PDX → **San Francisco** | 飛行機でサンフランシスコへ / Fly PDX → SFO, night at Argonaut Hotel (Fisherman's Wharf) |
| Day 8 | Wed Aug 19 | **Sonoma / Napa Valley** | ワイナリー訪問 / Winery day: **Ca' Momi Napa** + **Opus One** (Napa), night at The Lodge at Sonoma |
| Day 9 | Thu Aug 20 | Sonoma → **Los Angeles** | ワイナリー＋LAへ / **Carrera Winery** then drive/fly to LA, night at Hyatt Regency LAX |
| Day 10 | Fri Aug 21 | **Los Angeles (Glendale)** | LA観光 / LA sightseeing, overnight in Glendale |
| Day 11 | Sat Aug 22 | **Los Angeles (Glendale)** | LA観光 / LA sightseeing, overnight in Glendale |
| Day 12 | Sun Aug 23 | LAX → Japan | 帰国 / Departure to Japan |

> **Fixed constraints (do not break):**
> - **Home base in Central Oregon = Tumalo, OR** (≈7 mi NW of downtown Bend) — friends'
>   house; all Bend-area days start/end there. Add ~15–20 min to any "from Bend" drive.
> - **Day 4:** Mt. Bachelor restaurant **reservation** on top of the lift → morning
>   activities must be **short**; must arrive in time to ride up.
> - **Day 5:** Must arrive at **PDX by 1:00 PM** (picking up visiting family). Drive from
>   Tumalo is ≈3 h → leave by ~9:00–9:30 AM.
> - **Day 6:** **Beaux Frères Vineyard & Winery** appointment at **1:00 PM**
>   (15155 NE North Valley Rd, Newberg — **by appointment only**, family-friendly).
> - **Day 8 (Wed Aug 19):** winery day in **Napa Valley** — **Ca' Momi Napa** + **Opus One**
>   (Oakville). Opus One is **by appointment only** — book in advance. Drive from Sonoma
>   (The Lodge at Sonoma) to Napa is ≈45–60 min each way.
> - **Day 9 (Thu Aug 20):** **Carrera Winery** visit, then travel to **LA** (Hyatt Regency
>   LAX). ⏳CONFIRM Carrera location — if Monterey/Carmel it's a **≈5–6 h drive** from LA,
>   may need to reorder (visit en route Sonoma→LA) or fly.
> - **Days 10–11 (Glendale, LA):** ⏳CONFIRM exact residence/hotel name & address.

---

## 3. ワンクリックリンク集 / One-Click Quick Links

These are the links that go into the site as big, thumb-friendly buttons.

### 3.1 Driving directions (Google Maps, `travelmode=driving`)

| Route | Link |
|---|---|
| Hillsboro → Tumalo (Day 2) | https://www.google.com/maps/dir/?api=1&origin=Hillsboro%2C%20OR&destination=Tumalo%2C%20OR&travelmode=driving |
| Tumalo → Bend (local errands, Days 3–4) | https://www.google.com/maps/dir/?api=1&origin=Tumalo%2C%20OR&destination=Bend%2C%20OR&travelmode=driving |
| Tumalo → Mt. Bachelor (Day 4) | https://www.google.com/maps/dir/?api=1&origin=Tumalo%2C%20OR&destination=Mt.%20Bachelor%2C%20OR&travelmode=driving |
| Bend → Smith Rock State Park (on-the-way stop option) | https://www.google.com/maps/dir/?api=1&origin=Bend%2C%20OR&destination=Smith%20Rock%20State%20Park%2C%20OR&travelmode=driving |
| Tumalo → PDX (Day 5) | https://www.google.com/maps/dir/?api=1&origin=Tumalo%2C%20OR&destination=Portland%20International%20Airport%2C%20OR&travelmode=driving |
| PDX → McMenamins Grand Lodge, Forest Grove (Day 5) | https://www.google.com/maps/dir/?api=1&origin=Portland%20International%20Airport&destination=McMenamins%20Grand%20Lodge%2C%20Forest%20Grove%2C%20OR&travelmode=driving |
| Grand Lodge → Beaux Frères, Newberg (Day 6) | https://www.google.com/maps/dir/?api=1&origin=McMenamins%20Grand%20Lodge%2C%20Forest%20Grove%2C%20OR&destination=Beaux%20Fr%C3%A8res%20Vineyard%2C%20Newberg%2C%20OR&travelmode=driving |
| Forest Grove → PDX (Day 7) | https://www.google.com/maps/dir/?api=1&origin=Forest%20Grove%2C%20OR&destination=Portland%20International%20Airport&travelmode=driving |
| PDX → Argonaut Hotel, SF (Day 7) | *(flight)* — PDX to SFO flight, then shuttle/taxi to Fisherman's Wharf. ⏳CONFIRM flight + transfer. |
| Argonaut Hotel → The Lodge at Sonoma (Day 8) | https://www.google.com/maps/dir/?api=1&origin=Argonaut%20Hotel%2C%20San%20Francisco%2C%20CA&destination=The%20Lodge%20at%20Sonoma%2C%20Sonoma%2C%20CA&travelmode=driving |
| Sonoma → Ca' Momi Napa (Day 8) | https://www.google.com/maps/dir/?api=1&origin=The%20Lodge%20at%20Sonoma%2C%20Sonoma%2C%20CA&destination=Ca%27%20Momi%2C%20Napa%2C%20CA&travelmode=driving |
| Ca' Momi → Opus One, Oakville (Day 8) | https://www.google.com/maps/dir/?api=1&origin=Ca%27%20Momi%2C%20Napa%2C%20CA&destination=Opus%20One%2C%20Oakville%2C%20CA&travelmode=driving |
| Napa → Carrera Winery (Day 9) | ⏳CONFIRM Carrera location first (Monterey/Carmel ≈ 3 h from Napa; or reorder) |
| Carrera → Hyatt Regency LAX (Day 9) | ⏳CONFIRM Carrera location (if Monterey: ≈5–6 h drive; may fly/reroute) |
| Hyatt Regency LAX → Glendale (Day 10) | https://www.google.com/maps/dir/?api=1&origin=Hyatt%20Regency%20Los%20Angeles%20International%20Airport&destination=Glendale%2C%20CA&travelmode=driving |
| Glendale → LAX (Day 12) | https://www.google.com/maps/dir/?api=1&origin=Glendale%2C%20CA&destination=Los%20Angeles%20International%20Airport&travelmode=driving |

### 3.2 Weather (NWS forecast pages — fallback links when live fetch fails)

| Place | Link |
|---|---|
| Hillsboro, OR | https://forecast.weather.gov/MapClick.php?lat=45.5234&lon=-122.9898 |
| Tumalo, OR (base) | https://forecast.weather.gov/MapClick.php?lat=44.1471&lon=-121.3340 |
| Bend, OR | https://forecast.weather.gov/MapClick.php?lat=44.0582&lon=-121.3153 |
| Mt. Bachelor (top, 7,775 ft) | https://forecast.weather.gov/MapClick.php?lat=43.9968&lon=-121.6873 |
| Newberg, OR (Beaux Frères) | https://forecast.weather.gov/MapClick.php?lat=45.2898&lon=-123.0341 |
| Forest Grove, OR | https://forecast.weather.gov/MapClick.php?lat=45.5198&lon=-123.1107 |
| PDX | https://forecast.weather.gov/MapClick.php?lat=45.5898&lon=-122.5951 |
| San Francisco (Fisherman's Wharf) | https://forecast.weather.gov/MapClick.php?lat=37.8080&lon=-122.4177 |
| Napa, CA | https://forecast.weather.gov/MapClick.php?lat=38.2975&lon=-122.2869 |
| Sonoma, CA | https://forecast.weather.gov/MapClick.php?lat=38.2921&lon=-122.4580 |
| Los Angeles (LAX) | https://forecast.weather.gov/MapClick.php?lat=33.9416&lon=-118.4085 |
| Glendale, CA | https://forecast.weather.gov/MapClick.php?lat=34.1425&lon=-118.2551 |

### 3.3 Air quality & wildfire smoke

| Purpose | Link |
|---|---|
| **AirNow Fire & Smoke Map** (live smoke/AQI per fire) | https://fire.airnow.gov |
| AirNow national AQI map | https://www.airnow.gov/ |
| NWS Bend zone forecast (fire-weather aware) | https://forecast.weather.gov/zone.php?zone=ORZ511 |

### 3.4 Key reservations / bookings

| Booking | Link |
|---|---|
| **Beaux Frères** (Day 6, 1 PM) — Tock | https://www.exploretock.com/beaux-freres |
| Beaux Frères — phone (same-day/support) | tel:+15035371137 |
| Mt. Bachelor scenic lift tickets (Day 4) | https://shop.mtbachelor.com/s/summer/scenic-lift-season-pass |
| Mt. Bachelor Sunset Dinners (Day 4, if applicable) | https://www.mtbachelor.com/events-activities/summer-activities/sunset-dinner/ |

---

## 4. 日別プラン / Per-Day Plans (draft content for `js/data.js`)

> All names/hours must be re-verified before publishing; anything marked **⏳CONFIRM**
> needs a phone call or web check.

### Day 1 — Hillsboro, OR (Wed Aug 12) · 到着・周辺散策

- **Program options**
  - *Light:* Downtown Hillsboro (Main St) walk + Orenco Woods Nature Park.
  - *Standard:* Rice Northwest Museum of Rocks & Minerals + Orenco Station dining.
  - *Full:* Pre-trip wine warm-up at a nearby Tualatin Valley vineyard.
- **See:** Orenco Woods Nature Park; Rice Northwest Museum; Downtown Main St; Orenco Station.
- **Eat:** Japanese-friendly options near Orenco Station / downtown Hillsboro. ⏳CONFIRM hours.

### Day 2 — Drive Hillsboro → Tumalo + dinner with friends (Thu Aug 13)

**Today's purpose: arrive safely at the friends' home in Tumalo, don't rush, watch fire
smoke along the route. Home base for Days 2–4 is Tumalo, OR (≈7 mi NW of Bend).**
- **Driving:** ≈3 h via Hwy 26 E → Madras → US-97 S, exit toward Tumalo. **Weather + AQI
  check before leaving** (fire smoke can close US-26 near Warm Springs/Madras).
- **On-the-way stop options (best for a 5-year-old — short, bathroom, food):**
  - *Government Camp (Mt. Hood, ≈1 h from Hillsboro):* **Mt. Hood Brewing Co.** (family-friendly,
    mac & cheese, pizza) or **Ratskeller Pizzeria** (arcade room, casual, affordable).
  - *Madras:* **Rio Distinctive Mexican Cuisine** (family-friendly, patio, 4.6★) — good lunch stop.
  - *Smith Rock State Park (Terrebonne, just before Bend):* famous viewpoint; parking fee
    $5; River Trail is flat and stroller-friendly — **good stretch-your-legs stop**.
- **Evening:** ディナー / **dinner with friends** in Tumalo (hosted). No evening plan needed.
- **See on the way:** Smith Rock viewpoint; Pilot Butte summit drive *if arriving early*
  (drive to top, 5-min, great intro view). ⏳CONFIRM daylight.
- **Air quality note:** Central Oregon is frequently **smoke-affected in August**. Site
  shows live AQI (Tumalo coords) + smoke banner here.

### Day 3 — Free day in Bend (Fri Aug 14) · 夕方は友人家族と自宅で夕食

**Day is free until evening dinner at home (Tumalo). All options below are 5-year-old
friendly (short, indoor/outdoor balance, food/bathrooms).**
- **Program options**
  - *Morning (choose one):*
    - **High Desert Museum** (≈15 min from Tumalo; indoor+outdoor, birds of prey, river
      otters, on-site café — best for a 5yo; allow 2–3 h).
    - **Old Mill District** (river walk, Wheel Fun Rentals surrey bike, playgrounds,
      lunch spots; Free Spirit indoor play/climbing for toddlers+).
    - **Drake Park + Mirror Pond** (free, shaded, playgrounds, ducks).
  - *Afternoon:* **Alpenglow Park splash pad** (free, ages 1–10) or **Shevlin Park**
    (flat, shaded 5-mile stroller trail along Tumalo Creek) — free, no permit.
  - *Rain/heat backup (indoor):* Mountain Air trampoline park; Old Mill Vector Volcano
    arcade; Bend Rock Gym.
- **Eat (lunch out, dinner at home):** Deschutes Brewery Public House (family friendly);
  Wild Rose Thai; Old Mill food carts. ⏳CONFIRM.
- **See:** High Desert Museum; Old Mill District; Drake Park; Pilot Butte (drive-up);
  Alpenglow splash pad.
- **Avoid with a 5yo:** Lava River Cave (42°F, dark, uneven — not for toddlers); long
  river float (designed for ages 8+); steep Smith Rock hikes.

### Day 4 — Tumalo morning swim → Mt. Bachelor top-of-lift restaurant (Sat Aug 15)

**Hard constraint: restaurant reservation at Pine Marten Lodge (top of the Pine Marten
chairlift, 7,775 ft). Morning activities MUST be short.**
- **Mt. Bachelor facts (verified):**
  - **Scenic chairlift:** Pine Marten lift, 10 AM–5 PM daily (extended to 7 PM
    Thu–Sun in late summer). Ride ≈10–12 min.
  - **Restaurant on top:** **Pine Marten Lodge** — casual **Scapolo's** lunch (burgers,
    pizza, salad) **and** reservation-only **Sunset Dinners** (5:00 PM–7:45 PM seatings,
    Thu–Sun). ⏳CONFIRM which reservation (lunch vs sunset dinner) and the exact time.
  - **Tickets (online vs window):** Adult $29/$34; Youth 6–12 $17/$22; **Child 5 & under
    FREE**. Buy online before leaving town.
  - Allow ~50 min drive **Tumalo** → base area + 20–30 min for parking, lift tickets,
    restroom before the ride.
- **Short morning swim options (pick ONE, then go up the mountain):**
  - **Riverbend Park** (Deschutes River beach, gentle grade, shallow — best for 5yo).
  - **Farewell Bend Park** (shallow slow-moving wade area + mill-themed playground).
  - **Tumalo State Park** (river swim, quieter, day-use fee).
  - *Splash-pad-only option:* Alpenglow Park (super quick, no water shoes needed).
  - Water is **cold** (~60–65°F); pack towels, change of clothes, snacks.
- **Program options**
  - *Light:* 60–90 min river swim → drive up → lunch at Pine Marten Lodge.
  - *Full (if reservation is Sunset Dinner):* swim + short Pilot Butte view on the way
    back → return to Tumalo to rest → head up for 5 PM sunset dinner. ⏳CONFIRM reservation.
- **Drive:** Tumalo → Mt. Bachelor: `https://www.google.com/maps/dir/?api=1&origin=Tumalo%2C%20OR&destination=Mt.%20Bachelor%2C%20OR&travelmode=driving`
- **Weather check:** mountain top is 10–15 °F cooler + wind; bring layers for the 5yo.

### Day 5 — Tumalo → PDX pickup (by 1:00 PM) → McMenamins Grand Lodge (Sun Aug 16)

**Hard constraint: arrive at PDX by 1:00 PM. Reverse the Day 2 route (Tumalo → US-97 N →
Madras → US-26 W). ≈3 h. Leave Tumalo by ≈9:00–9:30 AM to be safe
(fuel/bathroom/snack stops).**
- **Pickup:** Portland International Airport (PDX). ⏳CONFIRM arrivals terminal (C/D or
  international) and meeting point.
- **Then:** drive PDX → **McMenamins Grand Lodge, Forest Grove** (≈45 min). Historic
  lodge, pools, on-site dining — a relaxed night for everyone.
- **Program options**
  - *Light:* airport pickup → straight to Grand Lodge → soak/rest.
  - *Full:* quick stop at Uwajimaya (Beaverton) on the way if time & energy allow.
- **Lunch on the way back (if hungry before PDX):** *Madras:* **Rio Distinctive Mexican
  Cuisine** (family-friendly, 4.6★); *Government Camp:* **Mt. Hood Brewing Co.** or
  **Huckleberry Inn** (classic diner, 24 h). Budget a quick stop; the 1 PM PDX arrival is
  the hard constraint.
- **Eat:** dinner on-site at McMenamins Grand Lodge (or local Forest Grove). ⏳CONFIRM hours.

### Day 6 — Beaux Frères winery appointment, 1:00 PM (Mon Aug 17)

**Hard constraint: appointment at Beaux Frères at 1:00 PM.**
- **Confirmed winery name:** **Beaux Frères Vineyard & Winery** — 15155 NE North Valley
  Rd, Newberg, OR 97132 (Ribbon Ridge AVA, ≈30 min from Grand Lodge/Forest Grove).
  - **By appointment only** — no walk-ins. Open daily 10 AM–4 PM. Seated tasting
    ≈90–120 min, guided by winery ambassador.
  - **Family-friendly** — "a family winery, happy to welcome accompanying children."
  - Book on **Tock**: https://www.exploretock.com/beaux-freres · phone (503) 537-1137.
  - Tasting fee ≈$50–100/guest; last leg of North Valley Rd is gravel.
  - ⏳CONFIRM the 1 PM reservation is booked + party size (incl. child seat count).
- **Program options**
  - *Light:* 1 PM tasting → back to Grand Lodge/rest.
  - *Full:* arrive a little early, lunch at Red Hills Market (Dundee) on the way, then
    tasting; casual dinner in Forest Grove after.
- **Drive:** Grand Lodge → Beaux Frères: `https://www.google.com/maps/dir/?api=1&origin=McMenamins%20Grand%20Lodge%2C%20Forest%20Grove%2C%20OR&destination=Beaux%20Fr%C3%A8res%20Vineyard%2C%20Newberg%2C%20OR&travelmode=driving`
- **5yo note:** winery is child-friendly (grounds, non-alcoholic options) — pack quiet
  activities/snacks.

### Day 7 — Fly PDX → San Francisco, Argonaut Hotel (Tue Aug 18)

**Purpose: travel day — fly from Portland to San Francisco, check into the Argonaut
Hotel in Fisherman's Wharf.**
- **Flight:** PDX → SFO. ⏳CONFIRM flight number/time + baggage/child-car-seat handling.
- **Then:** shuttle/taxi or BART to **Argonaut Hotel, a Noble House Hotel** — 495 Jefferson
  St, Fisherman's Wharf, San Francisco. ⏳CONFIRM transfer method (rental car drop-off at
  PDX vs SFO pickup).
- **Program options**
  - *Light:* arrive, check in, short walk on Fisherman's Wharf, dinner nearby.
  - *Full:* late-afternoon stroll to Pier 39 / Ghirardelli Square if energy allows.
- **Eat:** casual, kid-friendly dinner near Fisherman's Wharf. ⏳CONFIRM.
- **5yo note:** travel day — keep it short, pack snacks/activities for the flight.

### Day 8 — Sonoma + Napa wineries: Ca' Momi Napa & Opus One (Wed Aug 19)

**Purpose: winery day. Night at The Lodge at Sonoma Resort (1325 Broadway, Sonoma, CA).**
- **Wineries (confirmed):**
  - **Ca' Momi Napa** — Napa Valley winery. ⏳CONFIRM address, hours, and whether a
    reservation is needed.
  - **Opus One Winery** — 7900 St. Helena Hwy, Oakville, CA (Napa Valley). **By
    appointment only** — book in advance. Iconic, elegant tasting.
  - Both are ~45–60 min from The Lodge at Sonoma; plan ~30–40 min between stops.
- **Program options**
  - *Standard:* morning drive Sonoma → Napa → Ca' Momi → Opus One → return to Sonoma.
  - *Full:* lunch in downtown Napa / Yountville between tastings.
- **Drive:** Sonoma → Ca' Momi: `https://www.google.com/maps/dir/?api=1&origin=The%20Lodge%20at%20Sonoma%2C%20Sonoma%2C%20CA&destination=Ca%27%20Momi%2C%20Napa%2C%20CA&travelmode=driving`
  · Ca' Momi → Opus One: `https://www.google.com/maps/dir/?api=1&origin=Ca%27%20Momi%2C%20Napa%2C%20CA&destination=Opus%20One%2C%20Oakville%2C%20CA&travelmode=driving`
- **5yo note:** bring quiet activities/snacks for the tastings; Napa wineries are
  child-tolerated but not play-focused.

### Day 9 — Carrera Winery → Los Angeles, Hyatt Regency LAX (Thu Aug 20)

**Purpose: Carrera Winery visit, then travel to LA. Night at Hyatt Regency LAX
(6225 W Century Blvd, LA).**
- **Carrera Winery:** ⏳CONFIRM location. If it's the **Monterey/Carmel** Carrera Winery,
  it's ≈3 h from Napa/Sonoma and ≈5–6 h from LA — **recommend visiting it en route
  Sonoma→LA, then continuing to LA** (or fly Monterey→LAX). Confirm before planning.
- **Program options**
  - *If Carrera is en route:* drive Sonoma → Carrera (Monterey) → LA (long day, ~8 h total).
  - *If Carrera is near LA:* morning free, visit Carrera, then to Hyatt Regency LAX.
- **Drive:** ⏳CONFIRM Carrera address first (see §3.1). Sonoma → LA is ≈6–7 h via I-5.
- **5yo note:** long drive day — plan snack/stretch stops, or split with a flight.

### Day 10 — Los Angeles / Glendale sightseeing (Fri Aug 21)

**Purpose: LA sightseeing day. Overnight in Glendale, LA. ⏳CONFIRM residence/hotel name.**
- **Program options**
  - *Family classics:* Griffith Observatory (kid-friendly, free, parking fee) + Hollywood
    Walk of Fame.
  - *Theme parks:* ⏳CONFIRM — e.g., Universal Studios Hollywood or Disneyland if planned.
  - *Easy/local:* Glendale Galleria / Americana at Brand (shopping + dining, stroller
    friendly).
- **Eat:** ⏳CONFIRM dinner spots (Glendale has great Japanese/Asian options).
- **5yo note:** pick 1–2 short activities; avoid marathon theme-park days unless planned.

### Day 11 — Los Angeles / Glendale (Sat Aug 22)

**Purpose: free LA day. Repeat overnight in Glendale (same residence/hotel as Day 10).**
- **Program options**
  - *Light:* relaxed morning, local park, family dinner.
  - *Full:* one more sightseeing pick from Day 10 options (Griffith, beach, shopping).
  - *Beach option:* Santa Monica Pier (short, iconic, kid-friendly) if not too far.
- **Eat:** ⏳CONFIRM.
- **5yo note:** keep it flexible — this is a recovery day before the long flight home.

### Day 12 — Depart to Japan from LAX (Sun Aug 23)

- **Program options**
  - *Standard:* pack, breakfast, drive Glendale → LAX (≈30–40 min), return rental car,
    check in for the flight to Japan.
- **Drive:** `https://www.google.com/maps/dir/?api=1&origin=Glendale%2C%20CA&destination=Los%20Angeles%20International%20Airport&travelmode=driving`
- **To-dos:** confirm flight time from LAX, rental-car return, and departure terminal.
  ⏳CONFIRM.

---

## 5. 機能要件 / Functional Requirements

### FR-1 日別カード / Day-by-day cards
- Render one card per day (12 cards), in trip order, like Hotspring_BG's `LOCATIONS` grid.
- Each card shows: day badge, date (JP + EN), location, theme, and collapsible
  **program / eat / see** blocks.
- Clicking a card scrolls to a detail panel (pattern from Hotspring_BG's info panel).

### FR-2 言語切替 / Bilingual JP + EN
- A header toggle switches all text between Japanese and English instantly (no reload).
- Implementation: data fields carry `{ jp, en }`; strings render via a `t()` helper.
- **Single-language view**: the whole page (hero, cards, detail panel, footer, chapter)
  renders in the active language only — completely Japanese or completely English,
  never mixed. Toggling re-renders everything, including hero, footer, and chapter.

### FR-3 道順リンク / Driving directions (one click)
- Each destination/place has a ready-made **Google Maps directions link**
  (`https://www.google.com/maps/dir/?api=1&origin=...&destination=...&travelmode=driving`).
- Rendered as a big "🧭 道順 / Directions" button that opens in a new tab.
- Optional multi-leg routes via `waypoints` (e.g., winery A → B → home).

### FR-4 天気 / Current weather
- **Live:** National Weather Service API (keyless, CORS-enabled):
  `https://api.weather.gov/points/{lat},{lon}` → `.../forecast/hourly`.
- Show: current temp, condition, high/low, weather icon.
- **Fallback:** on fetch failure, show the NWS link for that area (§3.2) with a
  "live data unavailable" note.
- Coordinates per day stored in `data.js` (`lat`/`lon`).

### FR-5 空気質・山火事 / Air quality + wildfire smoke
- **Live:** fetch AQI (AirNow API or keyless `fire.airnow.gov` data) for each day's
  coordinates.
- Display AQI number + category with color coding (Good→Hazardous).
- **Smoke banner:** if AQI ≥ 101 (or source reports wildfire smoke), show a prominent
  banner on the affected day(s): "🔥 煙警報 / Smoke alert — limit outdoor activity" with
  a link to `https://fire.airnow.gov`.
- **Fallback:** show the Fire & Smoke Map link instead of an error.

### FR-6 編集しやすいデータ / Easy data editing
- All trip content lives in `js/data.js` (Hotspring_BG pattern) — family edits
  days/restaurants/places without touching HTML/JS. Entry shape:
  ```js
  {
    id: "day2-tumalo-drive",
    date: "2026-08-13",
    dayLabel: { jp: "2日目", en: "Day 2" },
    location: { jp: "ヒルズボロ→タマロ", en: "Hillsboro → Tumalo, OR" },
    theme: { jp: "ドライブ＋友人家族と夕食", en: "Drive + dinner with friends" },
    lat: 44.1471, lon: -121.3340,
    alerts: [ "smoke-check" ],
    programs: [{ name: { jp: "...", en: "Light" }, items: [{ jp: "...", en: "..." }] }],
    eat: [{ name: { jp: "...", en: "..." }, note: { jp: "...", en: "..." }, maps: "URL" }],
    see: [{ name: { jp: "...", en: "..." }, note: { jp: "...", en: "..." }, maps: "URL" }],
    routes: [{ label: { jp: "...", en: "..." }, url: "https://www.google.com/maps/dir/..." }]
  }
  ```

### FR-7 保守性 / Maintainability
- Cache-busting query strings (`?v=N`) on CSS/JS — required lesson from Hotspring_BG
  (GitHub Pages caches aggressively). Bump version on every content/code change.

---

## 6. 非機能要件 / Non-Functional Requirements

- **Stack:** Vanilla HTML/CSS/JS, no framework, no build step, ES5-style IIFE (same as
  Hotspring_BG).
- **Offline tolerance:** static content always works; live weather/AQI degrade gracefully.
- **Mobile-first:** phones are primary; cards, buttons, map links must be thumb-friendly.
- **Performance:** small single page; lazy-load weather/AQI fetches.
- **No backend, no storage, no user data:** informational planner (not a poll).
- **Security:** escape all user-visible text (reuse `escapeHtml` from Hotspring_BG); no
  API keys committed (AirNow key, if used, in git-ignored config + committed `.example`).

---

## 7. 外部API・リンク / External Data Sources

| Data | Source | Key? | CORS | Fallback |
|---|---|---|---|---|
| Weather | `api.weather.gov` | No | Yes | NWS forecast page (§3.2) |
| Air quality | AirNow API (`airnowapi.org`) | Yes (free) | Yes | Fire & Smoke Map link |
| Wildfire smoke | `fire.airnow.gov` (map + data) | No (public) | Yes | `https://fire.airnow.gov` |
| Directions | Google Maps `dir/?api=1` links | No | — | n/a (plain link) |

> **Decision:** PRD default is **keyless AQI via `fire.airnow.gov` data + Fire & Smoke
> Map link fallback**; AirNow API key optional.

---

## 8. 技術設計 / Technical Design

- `index.html` — page skeleton, hero (trip title, JP/EN toggle), day-card grid, detail
  panel, footer.
- `css/style.css` — styles (CSS custom properties; Hotspring_BG palette, "Pacific NW"
  teal/sage).
- `js/data.js` — `TRIP` object: `days[]` (12 entries per FR-6) + `CONFIG` (app title,
  API endpoints, cache version, smoke threshold AQI=101).
- `js/app.js` — single IIFE: render day cards, detail panel, `t()` language helper +
  toggle, directions buttons, weather/AQI fetch with timeout + fallback, smoke banner,
  `escapeHtml`.
- `tests/site.test.js` — `node --test` + jsdom (Hotspring_BG harness): render 12 cards;
  language toggle flips text; directions links open correct URLs; weather fallback on
  failure; smoke banner at AQI threshold; XSS escaping.
- `package.json` — `npm test` script; devDependency `jsdom`.
- **Deploy:** GitHub Pages (Settings → Pages → branch `main`, `/root`), push to deploy.

---

## 9. スコープ外 / Out of Scope (v1)

- Voting/polling (that was Hotspring_BG's purpose; this is informational).
- Booking/reservations, payments, user accounts.
- Trip-editor UI — editing happens in `js/data.js`.
- Offline caching (service worker) — deferred unless family reports poor signal.

---

## 10. 開発工程 / Development Stages (Sprints)

This project is **test-driven (TDD), sprint by sprint**, exactly like my other static
websites (Hotspring_BG, personal_chef, Rafting_Trip_ideas). Each sprint is a
**Red → Green** cycle, then a **board report** before the next sprint.

### 10.1 Working Agreement (TDD)

- **Red:** a test is written *before* its feature. Run it — it fails.
- **Green:** implement the minimum to make it pass. Run it — it passes.
- We move to the next feature **only after** its test passes.
- Between sprints we **stop and report**: what's developed, what's left (tracked in
  `docs/Status.md`).
- Every test maps to a requirement in `PRD.md` (sections 5–7).

### 10.2 Sprint Plan

| Sprint | Focus | Builds | Test suites |
|---|---|---|---|
| **S1 — Foundation & Design System** | Scaffold + test infra, page skeleton, "Pacific NW" design tokens, day-card grid + detail panel shells, JP/EN toggle shell | `index.html`, `css/style.css`, `js/data.js` (empty `TRIP`), `js/app.js` (IIFE), `tests/site.test.js`, `package.json` | TS-01, TS-02 |
| **S2 — Data & Day Cards** | Fill `js/data.js` with all 12 days (verified content), render cards + collapsible program/eat/see blocks | `js/data.js` content, card renderer | TS-03, TS-04 |
| **S3 — Bilingual JP/EN** | `t()` helper, language toggle (no reload), full translation of all text, single-language view (whole page either JP or EN, never mixed) | language switch in `js/app.js` | TS-05 |
| **S4 — Directions & Weather** | One-click Google Maps direction buttons per place, NWS live weather fetch + fallback link | directions renderer, weather widget | TS-06, TS-07 |
| **S5 — Air Quality & Smoke** | Live AQI (keyless `fire.airnow.gov`), color-coded AQI, **smoke alert banner** (AQI ≥ 101) with Fire & Smoke Map link | AQI widget, smoke banner | TS-08, TS-09 |
| **S6 — Polish & Launch** | Accessibility, responsive QA, cache-busting `?v=N`, XSS pass, final `npm test`, deploy to GitHub Pages, verify on a phone | all files | TS-10 → TS-13 |

> **S1 gates the project:** scaffold + test harness must be green before any feature work.

### 10.3 Sprint Deliverables

Each sprint ends with:
1. All its tests **green** (`npm test`).
2. A working, viewable increment (`python -m http.server 8000`).
3. A **board report** — `docs/Status.md` updated (status per sprint, test table, blockers).

---

## 11. ボード報告 / Board Reporting

Project tracking mirrors my other sites: a `docs/` folder with a **Backlog** and a
**Status board** (living report), updated at the end of every sprint.

### 11.1 `docs/Backlog.md`

- **Product goal** — one paragraph (bilingual trip planner, GitHub Pages, Aug 2026).
- **Working agreement (TDD)** — Red/Green rules (§10.1).
- **Delivery strategy** — the 6 sprints from §10.2, each with its deliverable.
- **Backlog items table** — one row per feature with `Priority | When | Feature |
  Tests | Status` (mirrors personal_chef's table; e.g. `P0 | S2 | Fill 12 day entries | TS-03/04 | ✅ DONE`).
- **Sprint test suites** — one-line descriptions (TS-01 … TS-13).
- **Definition of Done** (§12).

### 11.2 `docs/Status.md` (the board)

> **Living report.** Updated at the end of every sprint. Mirrors personal_chef's Status board.

- **Current status** — one paragraph: what's done, what's in progress, blockers.
- **Sprint status table** — `| Sprint | Status |` with ✅ COMPLETE / 🔶 IN PROGRESS /
  ⏸ PAUSED per sprint (e.g. `S1 Foundation & Design System ✅ COMPLETE — 5/5`).
- **Test suites (TDD)** — one subsection **per suite (TS-01 … TS-13)**, each a table:
  `| # | Test | Expected | Status |` with every requirement as a pass/fail row (✅/❌).
- **Test summary table** — `| Suite | Total | Pass | Fail |` + grand total.
- **Definition of Done** (§12).

### 11.3 AGENTS.md

Also generated (as in my other repos): project context, stack, commands
(`npm test`, local server, deploy), and the **wise lessons learned** from previous
sites (cache-busting on GitHub Pages, jsdom cross-realm test pitfalls, no `gh` CLI →
use GitHub MCP tools). Prevents repeating past mistakes.

---

## 12. 完了の定義 / Definition of Done

A backlog item / sprint is done when:

- its tests were written **first** (red), then the feature made them pass (green);
- it matches the PRD intent (sections 5–9);
- it works on **mobile, tablet, and desktop** (phones are the primary device);
- it is **readable and accessible** (language toggle reachable, big thumb targets);
- it fits the **static, no-backend** approach (GitHub Pages);
- it can be maintained with a **text editor only** (`js/data.js` edits);
- the board (`docs/Status.md`) reflects reality.

---

## 13. マイルストーン / Next Steps

1. **Approve PRD** (this document).
2. **Confirm the open items (⏳CONFIRM):** Mt. Bachelor reservation time (lunch vs sunset
   dinner); **Beaux Frères 1 PM booking on Tock**; PDX pickup terminal; PDX→SFO and LAX→Japan
   flights + rental car; **Opus One appointment (by appointment only)**; **Carrera Winery
   location** (Monterey vs en route); **Glendale residence/hotel name**.
3. **Create repo** `Kimura_fam_US_trip` (private) with `docs/` folder.
4. **Write `docs/Backlog.md`** (§11.1) and `docs/Status.md` (§11.2) boards.
5. **Sprint 1** — scaffold + test harness + design system (Red first).
6. **Sprints 2–6** — build features Red→Green, report on the board after each sprint.
7. **Deploy** to GitHub Pages, share link with the family, verify on a phone.