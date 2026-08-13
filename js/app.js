// Kimura Family US Trip 2026 — app logic (ES5 IIFE, no framework, no build step).
// Mirrors the Hotspring_BG app.js pattern. All rendering + language toggle lives here.

(function () {
  "use strict";

  var LANG_KEY = "kimuraLangV1";
  var SMOKE_THRESHOLD = 101;

  var state = {
    lang: "ja" // default language; toggle switches to "en"
  };

  // ---- tiny helpers ----

  function escapeHtml(str) {
    return String(str)
      .split("&").join("&amp;")
      .split("<").join("&lt;")
      .split(">").join("&gt;")
      .split('"').join("&quot;")
      .split("'").join("&#39;");
  }

  // Pick the right language from a { jp, en } object.
  function t(pair) {
    if (pair && typeof pair === "object" && "jp" in pair && "en" in pair) {
      return pair[state.lang] || pair.jp;
    }
    return pair;
  }

  function loadLang() {
    try {
      var stored = window.localStorage.getItem(LANG_KEY);
      return stored === "en" ? "en" : "ja";
    } catch (e) {
      return "ja";
    }
  }

  function saveLang() {
    try {
      window.localStorage.setItem(LANG_KEY, state.lang);
    } catch (e) { /* ignore */ }
  }

  function setLang(lang) {
    state.lang = lang === "en" ? "en" : "ja";
    saveLang();
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("data-lang", lang);
    renderDayCards();
    syncLangToggle();
  }

  function syncLangToggle() {
    var btn = document.getElementById("lang-toggle");
    if (!btn) { return; }
    if (state.lang === "ja") {
      btn.textContent = "🇺🇸 English";
      btn.setAttribute("aria-pressed", "false");
    } else {
      btn.textContent = "🇯🇵 日本語";
      btn.setAttribute("aria-pressed", "true");
    }
  }

  // ---- AQI categories (per AirNow US standard) ----

  function aqiCategory(aqi) {
    if (aqi <= 50) { return "good"; }
    if (aqi <= 100) { return "moderate"; }
    if (aqi <= 150) { return "sensitive"; }
    if (aqi <= 200) { return "unhealthy"; }
    if (aqi <= 300) { return "very-unhealthy"; }
    return "hazardous";
  }

  function aqiCategoryLabel(cat) {
    var labels = {
      good: { jp: "良好", en: "Good" },
      moderate: { jp: "普通", en: "Moderate" },
      sensitive: { jp: "敏感な人は注意", en: "Unhealthy (Sensitive)" },
      unhealthy: { jp: "不健康", en: "Unhealthy" },
      "very-unhealthy": { jp: "非常に不健康", en: "Very Unhealthy" },
      hazardous: { jp: "危険", en: "Hazardous" }
    };
    return labels[cat] || { jp: cat, en: cat };
  }

  // ---- card rendering ----

  function mapsLink(item) {
    if (!item.maps) { return ""; }
    return '<a class="maps-link" href="' + escapeHtml(item.maps) + '" target="_blank" rel="noopener">' +
      '🧭 ' + t({ jp: "道順 / 地図", en: "Directions / Map" }) +
      '</a>';
  }

  function renderEatSee(label, items) {
    if (!items || items.length === 0) { return ""; }
    var html = '<div class="eat-see"><h5>' + escapeHtml(t(label)) + '</h5><ul>';
    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      html += '<li><strong>' + escapeHtml(t(it.name)) + '</strong> — ' +
        escapeHtml(t(it.note)) + mapsLink(it) + '</li>';
    }
    html += '</ul></div>';
    return html;
  }

  function renderPrograms(programs) {
    var html = '<div class="programs">';
    for (var i = 0; i < programs.length; i++) {
      var p = programs[i];
      html += '<div class="prog-block"><div class="prog-name">' +
        escapeHtml(t(p.name)) + '</div><ul class="prog-items">';
      for (var j = 0; j < p.items.length; j++) {
        html += '<li>' + escapeHtml(t(p.items[j])) + '</li>';
      }
      html += '</ul></div>';
    }
    html += '</div>';
    return html;
  }

  function bilingual(pair) {
    if (!pair || typeof pair !== "object") { return escapeHtml(pair); }
    if (!("jp" in pair) || !("en" in pair)) { return escapeHtml(pair); }
    return '<span class="b-jp">' + escapeHtml(pair.jp) + '</span>' +
      ' <span class="b-en">' + escapeHtml(pair.en) + '</span>';
  }

  function cardInner(day) {
    return '<div class="day-badge">' + escapeHtml(day.dayLabel.jp + " / " + day.dayLabel.en) + '</div>' +
      '<div class="day-date">' + escapeHtml(day.date) + ' (' + escapeHtml(day.weekday.jp) + ' / ' +
      escapeHtml(day.weekday.en) + ')</div>' +
      '<div class="day-location">' + bilingual(day.location) + '</div>' +
      '<div class="day-theme">' + bilingual(day.theme) + '</div>' +
      '<div class="day-weather" data-id="' + escapeHtml(day.id) + '"></div>' +
      '<div class="day-aqi" data-id="' + escapeHtml(day.id) + '"></div>' +
      '<details class="day-info"><summary>' +
      t({ jp: "プランを開く", en: "Open plan" }) +
      '</summary>' +
      renderPrograms(day.programs) +
      renderEatSee({ jp: "食事 / Food", en: "Food" }, day.eat) +
      renderEatSee({ jp: "観光 / Sights", en: "Sights" }, day.see) +
      '</details>';
  }

  function renderDayCards() {
    var grid = document.getElementById("day-grid");
    if (!grid) { return; }
    grid.innerHTML = "";
    for (var i = 0; i < TRIP.days.length; i++) {
      var day = TRIP.days[i];
      var card = document.createElement("article");
      card.className = "day-card";
      card.setAttribute("data-id", day.id);
      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", day.dayLabel.jp + " " + day.location.jp);
      card.innerHTML = cardInner(day);
      (function (d) {
        card.addEventListener("click", function () { openDetail(d); });
        card.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openDetail(d);
          }
        });
      })(day);
      grid.appendChild(card);
      fetchWeather(day);
      fetchAQI(day);
    }
  }

  // ---- weather (NWS API, keyless + CORS-enabled) ----

  function weatherSlot(dayId) {
    return document.querySelector('.day-weather[data-id="' + dayId + '"]');
  }

  function renderWeather(dayId, text) {
    var slot = weatherSlot(dayId);
    if (slot) { slot.innerHTML = text; }
  }

  function weatherFallbackUrl(day) {
    return "https://forecast.weather.gov/MapClick.php?lat=" + day.lat + "&lon=" + day.lon;
  }

  function fetchWeather(day) {
    var slot = weatherSlot(day.id);
    if (!slot) { return; }
    if (typeof window.fetch !== "function") {
      renderWeather(day.id, '<span class="w-fallback">' +
        escapeHtml(t({ jp: "ライブデータ利用不可（天気ページへ）", en: "Live data unavailable (see forecast)" })) +
        ' <a class="maps-link" href="' + weatherFallbackUrl(day) + '" target="_blank" rel="noopener">' +
        escapeHtml(t({ jp: "天気ページ", en: "Forecast page" })) + '</a></span>');
      return;
    }
    slot.innerHTML = escapeHtml(t({ jp: "天気を取得中…", en: "Loading weather…" }));
    var pointsUrl = "https://api.weather.gov/points/" + day.lat + "," + day.lon;
    window.fetch(pointsUrl)
      .then(function (r) { return r.json(); })
      .then(function (points) {
        var hourly = points && points.properties && points.properties.forecastHourly;
        if (!hourly) { throw new Error("no hourly url"); }
        return window.fetch(hourly).then(function (r) { return r.json(); });
      })
      .then(function (data) {
        var p = data && data.properties && data.properties.periods && data.properties.periods[0];
        if (!p) { throw new Error("no period"); }
        renderWeather(day.id, '<span class="w-temp">' + escapeHtml(String(p.temperature)) + '°</span> ' +
          escapeHtml(t({ jp: p.shortForecast, en: p.shortForecast })) +
          ' · <span class="w-link"><a class="maps-link" href="' + weatherFallbackUrl(day) +
          '" target="_blank" rel="noopener">' + escapeHtml(t({ jp: "詳細", en: "Details" })) + '</a></span>');
      })
      .catch(function () {
        renderWeather(day.id, '<span class="w-fallback">' +
          escapeHtml(t({ jp: "ライブデータ利用不可（天気ページへ）", en: "Live data unavailable (see forecast)" })) +
          ' <a class="maps-link" href="' + weatherFallbackUrl(day) + '" target="_blank" rel="noopener">' +
          escapeHtml(t({ jp: "天気ページ", en: "Forecast page" })) + '</a></span>');
      });
  }

  // ---- air quality (AirNow keyless best-effort + Fire & Smoke Map fallback) ----

  function aqiSlot(dayId) {
    return document.querySelector('.day-aqi[data-id="' + dayId + '"]');
  }

  function renderAQI(dayId, aqi) {
    var slot = aqiSlot(dayId);
    if (!slot) { return; }
    var cat = aqiCategory(aqi);
    var label = aqiCategoryLabel(cat);
    var html = '<span class="aqi aqi-' + cat + '">' +
      escapeHtml(t({ jp: "空気質 AQI " + aqi + "（" + label.jp + "）", en: "AQI " + aqi + " · " + label.en })) +
      '</span>';
    if (aqi >= SMOKE_THRESHOLD) {
      html += ' <span class="smoke-banner">🔥 ' +
        escapeHtml(t({ jp: "煙警報：屋外の活動を控えて", en: "Smoke alert — limit outdoor activity" })) +
        ' <a class="maps-link" href="https://fire.airnow.gov" target="_blank" rel="noopener">' +
        escapeHtml(t({ jp: "煙マップを見る", en: "View Fire & Smoke Map" })) + '</a></span>';
    }
    slot.innerHTML = html;
  }

  function fetchAQI(day) {
    var slot = aqiSlot(day.id);
    if (!slot) { return; }
    if (typeof window.fetch !== "function") {
      slot.innerHTML = '<span class="aqi-fallback">' +
        escapeHtml(t({ jp: "空気質データ利用不可", en: "AQI unavailable" })) +
        ' <a class="maps-link" href="https://fire.airnow.gov" target="_blank" rel="noopener">' +
        escapeHtml(t({ jp: "煙マップを見る", en: "Fire & Smoke Map" })) + '</a></span>';
      return;
    }
    slot.innerHTML = escapeHtml(t({ jp: "空気質を取得中…", en: "Loading AQI…" }));
    // AirNow API is keyless-only for best-effort; on failure we fall back to the map.
    var url = "https://www.airnowapi.org/aq/observation/latLong/current/" +
      "?format=application/json&latitude=" + day.lat + "&longitude=" + day.lon +
      "&distance=25&API_KEY=DEMO_KEY";
    window.fetch(url)
      .then(function (r) { return r.json(); })
      .then(function (list) {
        if (!Array.isArray(list) || list.length === 0) { throw new Error("no readings"); }
        var reading = list[0];
        var aqi = Number(reading.AQI);
        if (!isFinite(aqi)) { throw new Error("bad AQI"); }
        renderAQI(day.id, aqi);
      })
      .catch(function () {
        slot.innerHTML = '<span class="aqi-fallback">' +
          escapeHtml(t({ jp: "空気質データ利用不可", en: "AQI unavailable" })) +
          ' <a class="maps-link" href="https://fire.airnow.gov" target="_blank" rel="noopener">' +
          escapeHtml(t({ jp: "煙マップを見る", en: "Fire & Smoke Map" })) + '</a></span>';
      });
  }

  // ---- detail panel ----

  function openDetail(day) {
    var panel = document.getElementById("detail-panel");
    var content = document.getElementById("detail-content");
    if (!panel || !content) { return; }
    var html =
      '<div class="day-badge">' + escapeHtml(day.dayLabel.jp + " / " + day.dayLabel.en) + '</div>' +
      '<div class="day-date">' + escapeHtml(day.date) + ' (' + escapeHtml(day.weekday.jp) + ' / ' +
      escapeHtml(day.weekday.en) + ')</div>' +
      '<h2>' + bilingual(day.location) + '</h2>' +
      '<p class="day-theme">' + bilingual(day.theme) + '</p>' +
      '<div class="detail-programs"><h3>' + t({ jp: "プログラム", en: "Program" }) + '</h3>' +
      renderPrograms(day.programs) + '</div>' +
      '<div class="detail-eat-see">' +
      renderEatSee({ jp: "食事 / Food", en: "Food" }, day.eat) +
      renderEatSee({ jp: "観光 / Sights", en: "Sights" }, day.see) +
      '</div>';
    if (day.routes && day.routes.length > 0) {
      html += '<div class="detail-routes"><h3>' + t({ jp: "道順", en: "Driving directions" }) + '</h3><ul>';
      for (var i = 0; i < day.routes.length; i++) {
        html += '<li><a class="maps-link" href="' + escapeHtml(day.routes[i].url) +
          '" target="_blank" rel="noopener">🧭 ' + escapeHtml(t(day.routes[i].label)) + '</a></li>';
      }
      html += '</ul></div>';
    }
    content.innerHTML = html;
    panel.classList.remove("hidden");
    panel.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    var closeBtn = document.getElementById("detail-close");
    if (closeBtn) { closeBtn.focus(); }
  }

  function closeDetail() {
    var panel = document.getElementById("detail-panel");
    if (!panel) { return; }
    panel.classList.add("hidden");
    panel.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  // ---- init ----

  function init() {
    state.lang = loadLang();
    document.documentElement.setAttribute("lang", state.lang);
    document.documentElement.setAttribute("data-lang", state.lang);
    var toggle = document.getElementById("lang-toggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        setLang(state.lang === "ja" ? "en" : "ja");
      });
    }
    var closeBtn = document.getElementById("detail-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", closeDetail);
    }
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { closeDetail(); }
    });
    renderDayCards();
    syncLangToggle();
  }

  document.addEventListener("DOMContentLoaded", init);
})();