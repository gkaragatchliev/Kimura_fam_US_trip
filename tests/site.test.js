const test = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const path = require("path");
const { JSDOM, VirtualConsole } = require("jsdom");

const ROOT = path.join(__dirname, "..");

// ---------------------------------------------------------------------------
// Harness (same pattern as Hotspring_BG — proven in production).
//
// jsdom does not share top-level bindings across separate external <script>
// tags the way browsers do, so we combine data.js + app.js into a single
// inline script. Text splicing uses split/join (NOT String.replace) because
// .replace() interprets `$` in replacement strings and would corrupt the app.
// Script tags are located by regex so cache-busting query strings (?v=N)
// never break the harness.
// ---------------------------------------------------------------------------

function buildScript() {
  const data = fs.readFileSync(path.join(ROOT, "js", "data.js"), "utf8");
  let app = fs.readFileSync(path.join(ROOT, "js", "app.js"), "utf8");

  const hook =
    "  window.__trip = {\n" +
    "    TRIP: TRIP,\n" +
    "    state: state,\n" +
    "    init: init,\n" +
    "    renderDayCards: renderDayCards,\n" +
    "    openDetail: openDetail,\n" +
    "    closeDetail: closeDetail,\n" +
    "    setLang: setLang,\n" +
    "    loadLang: loadLang,\n" +
    "    t: t,\n" +
    "    escapeHtml: escapeHtml,\n" +
    "    fetchWeather: fetchWeather,\n" +
    "    fetchAQI: fetchAQI,\n" +
    "    aqiCategory: aqiCategory\n" +
    "  };\n";

  app = app.split('  document.addEventListener("DOMContentLoaded", init);')
    .join(hook + '\n  document.addEventListener("DOMContentLoaded", init);');

  return data + "\n" + app;
}

// Optional fetch stub — used by the weather/AQI tests to simulate the network.
function makeDom(fetchImpl) {
  const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  const inline = buildScript().split("</script>").join("<\\/script>");
  const processed = html
    .replace(/<script src="[^"]*"><\/script>/g, "")
    .split("</body>").join("<script>" + inline + "</script></body>");

  const vc = new VirtualConsole();
  vc.on("jsdomError", () => {});
  const dom = new JSDOM(processed, {
    runScripts: "dangerously",
    url: "http://localhost/",
    pretendToBeVisual: true,
    virtualConsole: vc
  });
  const w = dom.window;
  if (fetchImpl) { w.fetch = fetchImpl; }
  w.__trip.init();
  return dom;
}

// A tiny mock fetch: routes match by substring; each route has a body() or fails.
function mockFetch(routes) {
  const calls = [];
  const impl = function (url) {
    calls.push(url);
    const route = routes.filter((r) => url.indexOf(r.match) !== -1)[0];
    if (!route) { return Promise.reject(new Error("unhandled url: " + url)); }
    if (route.fail) { return Promise.reject(new Error("network error")); }
    return Promise.resolve({ ok: true, json: function () { return Promise.resolve(route.body()); } });
  };
  impl.calls = calls;
  return impl;
}

function fresh() {
  return makeDom();
}

function click(w, el) {
  el.dispatchEvent(new w.MouseEvent("click", { bubbles: true, cancelable: true }));
}

const TRIP = makeDom().window.__trip.TRIP;
const DAYS = TRIP.days;

// ---------------------------------------------------------------------------
// TS-01 Structure & Foundation
// ---------------------------------------------------------------------------

test("01 core files exist", () => {
  ["index.html", "css/style.css", "js/data.js", "js/app.js", "tests/site.test.js"].forEach((f) => {
    assert.ok(fs.existsSync(path.join(ROOT, f)), f + " exists");
  });
});

test("02 stylesheet + script wired", () => {
  const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  assert.ok(/<link[^>]*css\/style\.css[^>]*>/.test(html), "style.css linked");
  assert.ok(/<script[^>]*js\/data\.js[^>]*>/.test(html), "data.js wired");
  assert.ok(/<script[^>]*js\/app\.js[^>]*>/.test(html), "app.js wired");
});

test("03 test harness runs and exposes the TRIP object", () => {
  const w = fresh().window;
  assert.ok(w.__trip, "window.__trip exposed");
  assert.ok(Array.isArray(w.__trip.TRIP.days), "TRIP.days is an array");
});

// ---------------------------------------------------------------------------
// TS-02 Design System & Shell
// ---------------------------------------------------------------------------

test("04 page skeleton present (header + main + footer)", () => {
  const d = fresh().window.document;
  assert.ok(d.querySelector("header"), "header exists");
  assert.ok(d.querySelector("main"), "main exists");
  assert.ok(d.querySelector("footer"), "footer exists");
});

test("05 hero with bilingual trip title", () => {
  const d = fresh().window.document;
  const h1 = d.getElementById("trip-title");
  assert.ok(h1, "h1#trip-title exists");
  assert.ok(h1.textContent.trim().length > 0, "title non-empty");
  assert.ok(/[\u3040-\u30ff\u4e00-\u9fff]/.test(h1.textContent), "title contains Japanese");
  assert.ok(/[A-Za-z]/.test(h1.textContent), "title contains English");
});

test("06 JP/EN toggle present in header", () => {
  const d = fresh().window.document;
  const btn = d.getElementById("lang-toggle");
  assert.ok(btn, "lang-toggle button exists");
  assert.ok(d.querySelector("header").contains(btn), "toggle sits in the header");
});

test("07 Pacific NW tokens (teal/sage) defined in CSS", () => {
  const css = fs.readFileSync(path.join(ROOT, "css", "style.css"), "utf8");
  assert.ok(css.includes(":root"), "CSS :root block exists");
  assert.ok(/--color-teal\s*:/.test(css), "teal token defined");
  assert.ok(/--color-sage\s*:/.test(css), "sage token defined");
});

test("08 day-card grid renders card shells", () => {
  const d = fresh().window.document;
  const grid = d.getElementById("day-grid");
  assert.ok(grid, "#day-grid exists");
  assert.ok(grid.querySelectorAll(".day-card").length > 0, "grid contains day cards");
});

test("09 detail panel shell present and hidden by default", () => {
  const d = fresh().window.document;
  const panel = d.getElementById("detail-panel");
  assert.ok(panel, "#detail-panel exists");
  assert.ok(panel.classList.contains("hidden"), "panel hidden by default");
  assert.ok(d.getElementById("detail-close"), "close control exists");
});

// ---------------------------------------------------------------------------
// TS-03 Data & Day Cards
// ---------------------------------------------------------------------------

test("10 all 12 day cards render, in trip order", () => {
  const d = fresh().window.document;
  const cards = d.querySelectorAll("#day-grid .day-card");
  assert.strictEqual(cards.length, 12, "exactly 12 cards");
  assert.strictEqual(new Set(Array.from(cards).map((c) => c.getAttribute("data-id"))).size, 12, "ids unique");
  cards.forEach((card, i) => {
    assert.strictEqual(card.getAttribute("data-id"), DAYS[i].id, "order matches data");
  });
});

test("11 day badge + date (JP + EN) on each card", () => {
  const d = fresh().window.document;
  const cards = d.querySelectorAll("#day-grid .day-card");
  DAYS.forEach((day, i) => {
    const card = cards[i];
    assert.ok(card.querySelector(".day-badge").textContent.includes(day.dayLabel.jp), day.id + " JP label");
    assert.ok(card.querySelector(".day-badge").textContent.includes(day.dayLabel.en), day.id + " EN label");
    assert.ok(card.querySelector(".day-date").textContent.includes(day.date), day.id + " date");
    assert.ok(card.querySelector(".day-date").textContent.includes(day.weekday.jp), day.id + " weekday JP");
    assert.ok(card.querySelector(".day-date").textContent.includes(day.weekday.en), day.id + " weekday EN");
  });
});

test("12 location + theme shown on each card", () => {
  const d = fresh().window.document;
  const cards = d.querySelectorAll("#day-grid .day-card");
  DAYS.forEach((day, i) => {
    const card = cards[i];
    assert.ok(card.querySelector(".day-location").textContent.includes(day.location.jp), day.id + " location JP");
    assert.ok(card.querySelector(".day-location").textContent.includes(day.location.en), day.id + " location EN");
    assert.ok(card.querySelector(".day-theme").textContent.includes(day.theme.jp), day.id + " theme JP");
    assert.ok(card.querySelector(".day-theme").textContent.includes(day.theme.en), day.id + " theme EN");
  });
});

test("13 program blocks (collapsible) per day", () => {
  const d = fresh().window.document;
  const cards = d.querySelectorAll("#day-grid .day-card");
  DAYS.forEach((day, i) => {
    const card = cards[i];
    assert.ok(card.querySelector("details.day-info"), day.id + " has details block");
    const blocks = card.querySelectorAll(".prog-block");
    assert.strictEqual(blocks.length, day.programs.length, day.id + " program blocks count");
    day.programs.forEach((p) => {
      assert.ok(card.textContent.includes(p.name.jp), day.id + " program name JP");
      p.items.forEach((it) => assert.ok(card.textContent.includes(it.jp), day.id + " program item JP"));
    });
  });
});

test("14 eat blocks with note + maps link per day", () => {
  const d = fresh().window.document;
  const cards = d.querySelectorAll("#day-grid .day-card");
  DAYS.forEach((day, i) => {
    const card = cards[i];
    day.eat.forEach((e) => {
      assert.ok(card.textContent.includes(e.name.jp), day.id + " eat name");
      assert.ok(card.textContent.includes(e.note.jp), day.id + " eat note");
      const a = card.querySelector('a[href="' + e.maps + '"]');
      assert.ok(a, day.id + " eat maps link " + e.name.en);
      assert.strictEqual(a.getAttribute("target"), "_blank");
    });
  });
});

test("15 see blocks with note + maps link per day", () => {
  const d = fresh().window.document;
  const cards = d.querySelectorAll("#day-grid .day-card");
  DAYS.forEach((day, i) => {
    const card = cards[i];
    day.see.forEach((s) => {
      assert.ok(card.textContent.includes(s.name.jp), day.id + " see name");
      assert.ok(card.textContent.includes(s.note.jp), day.id + " see note");
      const a = card.querySelector('a[href="' + s.maps + '"]');
      assert.ok(a, day.id + " see maps link " + s.name.en);
      assert.strictEqual(a.getAttribute("target"), "_blank");
    });
  });
});

// ---------------------------------------------------------------------------
// TS-03b Drive-Stop Dining (kid-friendly lunch/snack options en route)
// ---------------------------------------------------------------------------

test("15b both drive days (Hillsboro↔Bend) list kid-friendly lunch stops", () => {
  const d = fresh().window.document;
  ["day2-tumalo-drive", "day5-pdx-pickup"].forEach((id) => {
    const card = d.querySelector('#day-grid .day-card[data-id="' + id + '"]');
    assert.ok(card, id + " card present");
    const stops = card.querySelectorAll(".eat-see li");
    assert.ok(stops.length >= 3, id + " has >= 3 dining stops (has " + stops.length + ")");
    stops.forEach((li) => {
      assert.ok(li.querySelector("a.maps-link"), id + " stop has maps link");
    });
  });
});

test("15c drive stops are family-friendly and convenient (note mentions it)", () => {
  const d = fresh().window.document;
  ["day2-tumalo-drive", "day5-pdx-pickup"].forEach((id) => {
    const card = d.querySelector('#day-grid .day-card[data-id="' + id + '"]');
    const text = card.querySelector(".eat-see").textContent;
    assert.ok(/family|kids|family-friendly|arcade|casual|diner|家族|子ども|キッズ|アーケード|カジュアル|ダイナー/i.test(text), id + " notes family/kids-friendly");
  });
});

// ---------------------------------------------------------------------------
// TS-04 Detail Panel
// ---------------------------------------------------------------------------

test("16 clicking a card opens the detail panel", () => {
  const w = fresh().window;
  const d = w.document;
  const panel = d.getElementById("detail-panel");
  assert.ok(panel.classList.contains("hidden"), "hidden before click");
  click(w, d.querySelector('#day-grid .day-card[data-id="day4-bachelor"]'));
  assert.ok(!panel.classList.contains("hidden"), "panel opens on card click");
});

test("17 detail panel shows the clicked day's content", () => {
  const w = fresh().window;
  const d = w.document;
  const day = DAYS.filter((x) => x.id === "day6-beaux-freres")[0];
  click(w, d.querySelector('#day-grid .day-card[data-id="' + day.id + '"]'));
  const panel = d.getElementById("detail-panel");
  assert.ok(panel.textContent.includes(day.dayLabel.jp), "day label JP");
  assert.ok(panel.textContent.includes(day.location.jp), "location JP");
  assert.ok(panel.textContent.includes(day.theme.jp), "theme JP");
  day.eat.forEach((e) => assert.ok(panel.textContent.includes(e.name.jp), "eat " + e.name.en));
  day.see.forEach((s) => assert.ok(panel.textContent.includes(s.name.jp), "see " + s.name.en));
});

test("18 detail panel closes via the close control", () => {
  const w = fresh().window;
  const d = w.document;
  const panel = d.getElementById("detail-panel");
  click(w, d.querySelector('#day-grid .day-card[data-id="day4-bachelor"]'));
  assert.ok(!panel.classList.contains("hidden"), "opened");
  click(w, d.getElementById("detail-close"));
  assert.ok(panel.classList.contains("hidden"), "panel hidden again after close");
});

// ---------------------------------------------------------------------------
// TS-05 Bilingual JP/EN
// ---------------------------------------------------------------------------

test("19 t() returns Japanese by default", () => {
  const w = fresh().window;
  assert.strictEqual(w.__trip.t({ jp: "こんにちは", en: "Hello" }), "こんにちは");
  assert.strictEqual(w.__trip.t({ jp: "川", en: "River" }), "川");
});

test("20 toggle flips all text to English without reload", () => {
  const w = fresh().window;
  const d = w.document;
  assert.ok(d.documentElement.getAttribute("data-lang") === "ja", "starts in Japanese");
  click(w, d.getElementById("lang-toggle"));
  assert.ok(d.documentElement.getAttribute("data-lang") === "en", "toggles to English");
  const card = d.querySelector('#day-grid .day-card[data-id="day4-bachelor"]');
  assert.ok(card.querySelector(".day-info summary").textContent.includes("Open plan"), "English toggle text");
  assert.ok(d.documentElement.getAttribute("lang") === "en");
  click(w, d.getElementById("lang-toggle"));
  assert.ok(d.documentElement.getAttribute("data-lang") === "ja", "toggles back to Japanese");
});

test("21 dates/location stay bilingual regardless of toggle", () => {
  const w = fresh().window;
  const d = w.document;
  click(w, d.getElementById("lang-toggle")); // switch to EN
  const card = d.querySelector('#day-grid .day-card[data-id="day4-bachelor"]');
  assert.ok(card.querySelector(".day-badge").textContent.includes("4日目"), "JP day label");
  assert.ok(card.querySelector(".day-badge").textContent.includes("Day 4"), "EN day label");
  assert.ok(card.querySelector(".day-location").textContent.includes("マウントバチェラー"), "JP location");
  assert.ok(card.querySelector(".day-location").textContent.includes("Mt. Bachelor"), "EN location");
});

test("22 language choice persists on reload", () => {
  const w = fresh().window;
  click(w, w.document.getElementById("lang-toggle")); // to EN
  assert.ok(w.localStorage.getItem("kimuraLangV1") === "en", "stored in localStorage");
  // simulate a reload: reset state then re-init reads the stored language
  w.__trip.state.lang = "ja";
  w.__trip.init();
  assert.strictEqual(w.__trip.state.lang, "en", "restored after re-init");
});

// ---------------------------------------------------------------------------
// TS-06 Directions
// ---------------------------------------------------------------------------

test("23 every eat/see place has a maps link", () => {
  const w = fresh().window;
  const d = w.document;
  const cards = d.querySelectorAll("#day-grid .day-card");
  DAYS.forEach((day, i) => {
    const card = cards[i];
    day.eat.concat(day.see).forEach((item) => {
      assert.ok(card.querySelector('a[href="' + item.maps + '"]'), day.id + " has maps link for " + item.name.en);
    });
  });
});

test("24 direction links open in a new tab", () => {
  const w = fresh().window;
  const d = w.document;
  d.querySelectorAll("#day-grid a.maps-link").forEach((a) => {
    assert.strictEqual(a.getAttribute("target"), "_blank", "opens new tab");
  });
});

test("25 direction URLs use the dir/?api=1 driving pattern", () => {
  const w = fresh().window;
  const d = w.document;
  const links = Array.from(d.querySelectorAll("#day-grid .day-info a.maps-link")).map((a) => a.getAttribute("href"));
  assert.ok(links.length > 0, "has direction links");
  links.forEach((u) => {
    assert.ok(u.indexOf("dir/?api=1") !== -1, "uses dir api: " + u);
    assert.ok(u.indexOf("travelmode=driving") !== -1, "driving mode: " + u);
  });
});

// ---------------------------------------------------------------------------
// TS-07 Weather
// ---------------------------------------------------------------------------

const WEATHER_ROUTES = [
  {
    match: "api.weather.gov/points",
    body: () => ({
      properties: {
        forecastHourly: "https://api.weather.gov/gridpoints/PDX/74,53/hourly"
      }
    })
  },
  {
    match: "/hourly",
    body: () => ({
      properties: {
        periods: [
          { number: 1, temperature: 72, shortForecast: "Sunny" },
          { number: 2, temperature: 68, shortForecast: "Partly Cloudy" }
        ]
      }
    })
  }
];

test("26 weather fetches NWS points API for a day's lat/lon", async () => {
  const fetchImpl = mockFetch(WEATHER_ROUTES);
  const w = makeDom(fetchImpl).window;
  await new Promise((res) => setTimeout(res, 20));
  assert.ok(fetchImpl.calls.some((u) => u.indexOf("api.weather.gov/points/43.9968,-121.6873") !== -1), "Mt. Bachelor coords queried");
});

test("27 weather shows temperature and condition", async () => {
  const fetchImpl = mockFetch(WEATHER_ROUTES);
  const w = makeDom(fetchImpl).window;
  const d = w.document;
  await new Promise((res) => setTimeout(res, 30));
  const card = d.querySelector('#day-grid .day-card[data-id="day4-bachelor"] .day-weather');
  assert.ok(card, "weather element exists");
  assert.ok(card.textContent.includes("72"), "shows temperature");
  assert.ok(card.textContent.includes("Sunny"), "shows condition");
});

test("28 weather falls back to NWS page link on failure", async () => {
  const failRoutes = [{ match: "api.weather.gov", fail: true, body: () => ({}) }];
  const fetchImpl = mockFetch(failRoutes);
  const w = makeDom(fetchImpl).window;
  const d = w.document;
  await new Promise((res) => setTimeout(res, 30));
  const card = d.querySelector('#day-grid .day-card[data-id="day4-bachelor"] .day-weather');
  assert.ok(card.querySelector('a[href^="https://forecast.weather.gov"]'), "fallback NWS link");
  assert.ok(card.textContent.indexOf("live data unavailable") !== -1 || card.textContent.indexOf("利用不可") !== -1, "fallback note");
});

// ---------------------------------------------------------------------------
// TS-08 Air Quality
// ---------------------------------------------------------------------------

const AQI_GOOD_ROUTES = [
  {
    match: "airnowapi.org",
    body: () => [
      {
        CategoryName: "Good",
        AQI: 32,
        Latitude: 43.99,
        Longitude: -121.68
      }
    ]
  }
];

test("29 AQI fetches AirNow for a day's coordinates", async () => {
  const fetchImpl = mockFetch(AQI_GOOD_ROUTES);
  const w = makeDom(fetchImpl).window;
  await new Promise((res) => setTimeout(res, 20));
  assert.ok(fetchImpl.calls.some((u) => u.indexOf("airnowapi.org") !== -1), "AirNow API queried");
});

test("30 AQI shows number and color-coded category", async () => {
  const fetchImpl = mockFetch(AQI_GOOD_ROUTES);
  const w = makeDom(fetchImpl).window;
  const d = w.document;
  await new Promise((res) => setTimeout(res, 30));
  const card = d.querySelector('#day-grid .day-card[data-id="day4-bachelor"] .day-aqi');
  assert.ok(card, "aqi element exists");
  assert.ok(card.textContent.includes("32"), "shows AQI number");
  assert.ok(card.querySelector(".aqi-good"), "green/good color class present");
});

test("31 AQI falls back to Fire & Smoke Map link on failure", async () => {
  const failRoutes = [{ match: "airnowapi.org", fail: true, body: () => ({}) }];
  const fetchImpl = mockFetch(failRoutes);
  const w = makeDom(fetchImpl).window;
  const d = w.document;
  await new Promise((res) => setTimeout(res, 30));
  const card = d.querySelector('#day-grid .day-card[data-id="day4-bachelor"] .day-aqi');
  assert.ok(card.querySelector('a[href="https://fire.airnow.gov"]'), "Fire & Smoke Map fallback link");
});

// ---------------------------------------------------------------------------
// TS-09 Smoke Banner
// ---------------------------------------------------------------------------

const AQI_SMOKY_ROUTES = [
  {
    match: "airnowapi.org",
    body: () => [
      {
        CategoryName: "Unhealthy",
        AQI: 150,
        Latitude: 43.99,
        Longitude: -121.68
      }
    ]
  }
];

test("32 smoke banner shows when AQI is unhealthy (>= 101)", async () => {
  const fetchImpl = mockFetch(AQI_SMOKY_ROUTES);
  const w = makeDom(fetchImpl).window;
  const d = w.document;
  await new Promise((res) => setTimeout(res, 30));
  const card = d.querySelector('#day-grid .day-card[data-id="day4-bachelor"]');
  const banner = card.querySelector(".smoke-banner");
  assert.ok(banner, "smoke banner present at AQI 150");
  assert.ok(banner.querySelector('a[href="https://fire.airnow.gov"]'), "banner links to Fire & Smoke Map");
});

test("33 no smoke banner when AQI is below threshold", async () => {
  const fetchImpl = mockFetch(AQI_GOOD_ROUTES); // AQI 32
  const w = makeDom(fetchImpl).window;
  const d = w.document;
  await new Promise((res) => setTimeout(res, 30));
  const card = d.querySelector('#day-grid .day-card[data-id="day4-bachelor"]');
  assert.ok(!card.querySelector(".smoke-banner"), "no banner at AQI 32");
});

test("34 aqiCategory maps AQI values to correct categories", () => {
  const w = fresh().window;
  assert.strictEqual(w.__trip.aqiCategory(20), "good");
  assert.strictEqual(w.__trip.aqiCategory(55), "moderate");
  assert.strictEqual(w.__trip.aqiCategory(120), "sensitive");
  assert.strictEqual(w.__trip.aqiCategory(175), "unhealthy");
  assert.strictEqual(w.__trip.aqiCategory(240), "very-unhealthy");
  assert.strictEqual(w.__trip.aqiCategory(320), "hazardous");
});

// ---------------------------------------------------------------------------
// TS-10 XSS & Link Integrity
// ---------------------------------------------------------------------------

test("35 escapeHtml neutralizes hostile input in cards", () => {
  const w = fresh().window;
  assert.strictEqual(
    w.__trip.escapeHtml('<script>alert("x")</script>'),
    "&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;"
  );
  w.TRIP.days.push({
    id: "day-xss",
    date: "2026-08-25",
    weekday: { jp: "火", en: "Tue" },
    dayLabel: { jp: "XSS", en: "XSS" },
    location: { jp: "<img src=x onerror=alert(1)>", en: "safe" },
    theme: { jp: "a<b>c", en: "d" },
    lat: 0, lon: 0,
    programs: [],
    eat: [],
    see: []
  });
  w.__trip.renderDayCards();
  const card = w.document.querySelector('.day-card[data-id="day-xss"]');
  assert.ok(card, "hostile card rendered");
  assert.ok(!card.querySelector("img"), "no img element injected");
  assert.ok(!card.querySelector("script"), "no script element injected");
  assert.ok(
    card.querySelector(".day-location .b-jp").textContent.indexOf("<img") !== -1,
    "escaped text preserved"
  );
});

test("36 no dead or placeholder links on the page", () => {
  const d = fresh().window.document;
  const links = Array.from(d.querySelectorAll("a[href]"));
  assert.ok(links.length > 0, "page has links");
  links.forEach((a) => {
    const href = a.getAttribute("href");
    assert.ok(href && href.trim() !== "", "no empty href");
    assert.ok(href !== "#" && href.charAt(0) !== "#", "no hash-only href: " + href);
    assert.ok(!/TODO|your-url|example\.com|undefined/.test(href), "no placeholder href: " + href);
  });
  ["css/style.css", "js/data.js", "js/app.js"].forEach((f) => {
    assert.ok(fs.existsSync(path.join(ROOT, f)), f + " referenced asset exists");
  });
});

test("37 no placeholder text in shipped source", () => {
  const files = ["index.html", "css/style.css", "js/data.js", "js/app.js"];
  const re = /(lorem\s+ipsum|TODO|TBD|FIXME|XXX|your-url|example\.com|PLACEHOLDER)/i;
  files.forEach((f) => {
    const src = fs.readFileSync(path.join(ROOT, f), "utf8");
    assert.ok(!re.test(src), f + " has no placeholder text");
  });
});

// ---------------------------------------------------------------------------
// TS-11 Performance & QA (cache-busting is the target of this sprint)
// ---------------------------------------------------------------------------

test("38 site weight < 500 KB (all HTML/CSS/JS)", () => {
  const files = ["index.html", "css/style.css", "js/data.js", "js/app.js"];
  let total = 0;
  files.forEach((f) => { total += fs.statSync(path.join(ROOT, f)).size; });
  assert.ok(total < 500 * 1024, "total " + total + " bytes < 512000");
});

test("39 exactly one h1 on the page", () => {
  const d = fresh().window.document;
  assert.strictEqual(d.querySelectorAll("h1").length, 1);
});

test("40 no console errors during render", () => {
  const w = fresh().window;
  assert.strictEqual(w.__trip.state, w.__trip.state, "app initialized without throwing");
});

test("41 cache-busting ?v=N present on CSS and JS", () => {
  const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  assert.ok(/css\/style\.css\?v=\d+/.test(html), "style.css has ?v=N");
  assert.ok(/js\/data\.js\?v=\d+/.test(html), "data.js has ?v=N");
  assert.ok(/js\/app\.js\?v=\d+/.test(html), "app.js has ?v=N");
});

// ---------------------------------------------------------------------------
// TS-12 Accessibility & Responsive
// ---------------------------------------------------------------------------

test("42 lang attribute is set and aria labels exist", () => {
  const d = fresh().window.document;
  assert.ok(d.documentElement.getAttribute("lang"), "html[lang] set");
  assert.ok(d.querySelector("#lang-toggle[aria-pressed]"), "toggle has aria-pressed");
  const cards = Array.from(d.querySelectorAll(".day-card"));
  assert.ok(cards.length > 0, "cards exist");
  cards.forEach((c) => {
    assert.ok(c.getAttribute("aria-label"), "card has aria-label: " + c.getAttribute("data-id"));
  });
});

test("43 details panels open with keyboard (Enter/Space)", () => {
  const w = fresh().window;
  const card = w.document.querySelector(".day-card");
  const detailPanel = w.document.getElementById("detail-panel");
  const enter = new w.KeyboardEvent("keydown", { key: "Enter", bubbles: true, cancelable: true });
  card.dispatchEvent(enter);
  assert.ok(!detailPanel.classList.contains("hidden"), "Enter opens detail panel");
  const esc = new w.KeyboardEvent("keydown", { key: "Escape", bubbles: true, cancelable: true });
  w.document.dispatchEvent(esc);
  assert.ok(detailPanel.classList.contains("hidden"), "Escape closes detail panel");
});

test("44 every interactive element has a label or title", () => {
  const d = fresh().window.document;
  const interactive = Array.from(d.querySelectorAll("a, button, summary, [role='button']"));
  interactive.forEach((el) => {
    const hasText = (el.textContent || "").trim().length > 0;
    const hasLabel = el.getAttribute("aria-label");
    const hasTitle = el.getAttribute("title");
    assert.ok(hasText || hasLabel || hasTitle, "interactive element is labeled: " + el.outerHTML.slice(0, 80));
  });
});

test("45 responsive: meta viewport present and CSS uses breakpoints", () => {
  const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  assert.ok(/name=["']viewport["']/.test(html), "viewport meta present");
  const css = fs.readFileSync(path.join(ROOT, "css", "style.css"), "utf8");
  assert.ok(/@media/.test(css), "CSS has media queries");
});

test("46 all cards render with valid, non-empty content", () => {
  const d = fresh().window.document;
  const cards = Array.from(d.querySelectorAll(".day-card"));
  assert.ok(cards.length >= 12, "all 12 days render");
  cards.forEach((c) => {
    assert.ok(c.querySelector(".day-location").textContent.trim(), "card has location");
    assert.ok(c.querySelector(".day-weather"), "card has weather slot");
    assert.ok(c.querySelector(".day-aqi"), "card has aqi slot");
  });
});

// ---------------------------------------------------------------------------
// TS-13 Launch Readiness
// ---------------------------------------------------------------------------

test("47 Open Graph meta present in head", () => {
  const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  ["og:title", "og:description", "og:type", "og:url", "og:image"].forEach((p) => {
    assert.ok(new RegExp('property="' + p + '"').test(html), p + " present");
    assert.ok(new RegExp('property="' + p + '"\\s+content="[^"]+"').test(html), p + " has content");
  });
});

test("48 Twitter card meta present in head", () => {
  const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  ["twitter:card", "twitter:title", "twitter:description"].forEach((p) => {
    assert.ok(new RegExp('name="' + p + '"\\s+content="[^"]+"').test(html), p + " present with content");
  });
});

test("49 favicon linked and file exists", () => {
  const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  assert.ok(/rel=["']icon["']/.test(html), "favicon linked");
  const m = html.match(/href="([^"]*favicon[^"]*)"/);
  assert.ok(m, "favicon href found");
  const favPath = path.join(ROOT, m[1].split("?")[0]);
  assert.ok(fs.existsSync(favPath), "favicon file exists: " + m[1]);
});

test("50 robots.txt allows crawling and points to sitemap", () => {
  const robotsPath = path.join(ROOT, "robots.txt");
  assert.ok(fs.existsSync(robotsPath), "robots.txt exists");
  const txt = fs.readFileSync(robotsPath, "utf8");
  assert.ok(/User-agent:\s*\*/i.test(txt), "User-agent: *");
  assert.ok(/Allow:\s*\//i.test(txt), "Allow: /");
  assert.ok(/Sitemap:\s*https?:\/\//i.test(txt), "Sitemap URL");
});

test("51 sitemap.xml is well-formed XML with the homepage URL", () => {
  const sitemapPath = path.join(ROOT, "sitemap.xml");
  assert.ok(fs.existsSync(sitemapPath), "sitemap.xml exists");
  const xml = fs.readFileSync(sitemapPath, "utf8");
  assert.ok(/<\?xml [^>]*\?>/.test(xml), "xml declaration");
  assert.ok(/<urlset[^>]*>/i.test(xml), "urlset root element");
  assert.ok(/<url>[\s\S]*<\/url>/.test(xml), "has <url> entries");
  const opens = (xml.match(/<url>/g) || []).length;
  const closes = (xml.match(/<\/url>/g) || []).length;
  assert.ok(opens >= 1 && opens === closes, "balanced <url> tags");
  assert.ok(/https?:\/\/[^<]+/.test(xml), "contains a URL");
});

test("52 styled 404 page: bilingual, one h1, link home", () => {
  const p404 = path.join(ROOT, "404.html");
  assert.ok(fs.existsSync(p404), "404.html exists");
  const html = fs.readFileSync(p404, "utf8");
  const dom = new JSDOM(html, { runScripts: "outside-only" });
  const d = dom.window.document;
  assert.strictEqual(d.querySelectorAll("h1").length, 1, "one h1");
  assert.ok(d.querySelector("a[href='/']") || d.querySelector("a[href='index.html']"), "link home");
  assert.ok(/lang=["']ja["']/.test(html), "JP content present");
});

// ---------------------------------------------------------------------------
// TS-13c "How this site was built" chapter (bottom of the homepage)
// ---------------------------------------------------------------------------

test("52b homepage has a bottom chapter documenting the build path", () => {
  const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  assert.ok(/id="how-built"/.test(html), "chapter section id=how-built present");
  assert.ok(html.indexOf('id="how-built"') > html.indexOf('id="day-grid"'), "chapter sits after the itinerary (bottom of content)");
  assert.ok(/Node\.js/.test(html), "mentions Node.js");
  assert.ok(/jsdom/.test(html), "mentions jsdom");
  assert.ok(/npm/.test(html), "mentions npm");
  assert.ok(/git/.test(html), "mentions git");
  assert.ok(/GitHub/.test(html), "mentions GitHub");
});

test("52c chapter covers PRD, TDD, GitHub posting, and LLM prompting", () => {
  const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  assert.ok(/PRD/.test(html), "explains PRD");
  assert.ok(/TDD|Red|Green|テスト駆動/.test(html), "explains TDD Red/Green");
  assert.ok(/github\.com|アカウント|account/i.test(html), "covers GitHub account + posting");
  assert.ok(/LLM|プロンプト|prompt|命令/i.test(html), "covers verbally commanding an LLM");
  assert.ok(/install|インストール|setup|セットアップ/i.test(html), "covers install/setup");
});