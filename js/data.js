// Kimura Family US Trip 2026 — trip data (edit this file to change the plan).
// All user-visible text is bilingual { jp, en }. dates + locations stay bilingual.
// Edit freely — no other file needs to change for content.

var TRIP = {
  config: {
    cacheVersion: 1,
    smokeThresholdAQI: 101
  },
  days: [
    // ---------------------------------------------------------------
    // Day 1 — Wed Aug 12 — Hillsboro, OR — arrival & explore
    // ---------------------------------------------------------------
    {
      id: "day1-hillsboro",
      date: "2026-08-12",
      weekday: { jp: "水", en: "Wed" },
      dayLabel: { jp: "1日目", en: "Day 1" },
      location: { jp: "ヒルズボロ, オレゴン州", en: "Hillsboro, OR" },
      theme: { jp: "到着・周辺散策", en: "Arrival & explore home base" },
      lat: 45.5234, lon: -122.9898,
      alerts: [],
      programs: [
        {
          name: { jp: "ライト", en: "Light" },
          items: [
            { jp: "ダウンタウン・ヒルズボロ（メイン通り）散策", en: "Downtown Hillsboro (Main St) walk" },
            { jp: "オレンコ・ウッズ自然公園で短い散歩", en: "Short walk at Orenco Woods Nature Park" }
          ]
        },
        {
          name: { jp: "スタンダード", en: "Standard" },
          items: [
            { jp: "ライス北西太平洋鉱物岩石博物館", en: "Rice Northwest Museum of Rocks & Minerals" },
            { jp: "オレンコ・ステーションで夕食", en: "Dinner at Orenco Station" }
          ]
        },
        {
          name: { jp: "フル", en: "Full" },
          items: [
            { jp: "チュアラティン・バレーのワイナリーで夕食", en: "Pre-trip wine warm-up at a Tualatin Valley vineyard" }
          ]
        }
      ],
      eat: [
        {
          name: { jp: "オレンコ・ステーション周辺", en: "Orenco Station area" },
          note: { jp: "日本人好みの食事多数。営業時間要確認", en: "Japanese-friendly options. Check hours" },
          maps: "https://www.google.com/maps/dir/?api=1&origin=Hillsboro%2C%20OR&destination=Orenco%20Station%2C%20Hillsboro%2C%20OR&travelmode=driving"
        }
      ],
      see: [
        {
          name: { jp: "オレンコ・ウッズ自然公園", en: "Orenco Woods Nature Park" },
          note: { jp: "無料・子ども向けの遊歩道", en: "Free, family-friendly trails" },
          maps: "https://www.google.com/maps/dir/?api=1&origin=Hillsboro%2C%20OR&destination=Orenco%20Woods%20Nature%20Park%2C%20OR&travelmode=driving"
        },
        {
          name: { jp: "ライス博物館", en: "Rice Northwest Museum" },
          note: { jp: "鉱物・岩石の展示", en: "Rocks & minerals museum" },
          maps: "https://www.google.com/maps/dir/?api=1&origin=Hillsboro%2C%20OR&destination=Rice%20Northwest%20Museum%20of%20Rocks%20and%20Minerals%2C%20OR&travelmode=driving"
        }
      ],
      routes: []
    },

    // ---------------------------------------------------------------
    // Day 2 — Thu Aug 13 — Hillsboro → Tumalo — drive + dinner with friends
    // ---------------------------------------------------------------
    {
      id: "day2-tumalo-drive",
      date: "2026-08-13",
      weekday: { jp: "木", en: "Thu" },
      dayLabel: { jp: "2日目", en: "Day 2" },
      location: { jp: "ヒルズボロ→タマロ", en: "Hillsboro → Tumalo, OR" },
      theme: { jp: "ドライブ＋友人家族と夕食", en: "Drive to Tumalo + dinner with friends" },
      lat: 44.1471, lon: -121.3340,
      alerts: ["smoke-check"],
      programs: [
        {
          name: { jp: "往路", en: "On the way" },
          items: [
            { jp: "約3時間ドライブ（Hwy 26 → Madras → US-97）", en: "≈3 h drive (Hwy 26 → Madras → US-97)" },
            { jp: "スミスロック州立公園で休憩（足休め）", en: "Smith Rock State Park stretch stop" },
            { jp: "夕方にタマロの友人家へ到着・夕食", en: "Arrive friends' home in Tumalo for dinner" }
          ]
        },
        {
          name: { jp: "注意", en: "Note" },
          items: [
            { jp: "出発前に天気とAQIを確認（山火事の煙に注意）", en: "Check weather + AQI before leaving (fire smoke)" }
          ]
        }
      ],
      eat: [
        {
          name: { jp: "マウントフッド・ブルーイング（ガバメントキャンプ）", en: "Mt. Hood Brewing Co. (Government Camp)" },
          note: { jp: "家族連れOK・約1時間で休憩にちょうど良い・マカロニ＆チーズやピザ", en: "Family-friendly; great ≈1 h stop; mac & cheese, pizza" },
          maps: "https://www.google.com/maps/dir/?api=1&origin=Hillsboro%2C%20OR&destination=Mt%20Hood%20Brewing%20Co%2C%20Government%20Camp%2C%20OR&travelmode=driving"
        },
        {
          name: { jp: "ラッツケラー・ピッツェリア（ガバメントキャンプ）", en: "Ratskeller Pizzeria (Government Camp)" },
          note: { jp: "カジュアル・アーケード有・子ども大喜び・手頃", en: "Casual; arcade room; kids love it; affordable" },
          maps: "https://www.google.com/maps/dir/?api=1&origin=Hillsboro%2C%20OR&destination=Ratskeller%20Pizzeria%2C%20Government%20Camp%2C%20OR&travelmode=driving"
        },
        {
          name: { jp: "リオ・ディスティンクティブ・メキシカン（マドラス）", en: "Rio Distinctive Mexican Cuisine (Madras)" },
          note: { jp: "家族向け・屋外パティオ・好評価（4.6）・マドラスで昼食", en: "Family-friendly, patio, highly rated (4.6); lunch in Madras" },
          maps: "https://www.google.com/maps/dir/?api=1&origin=Government%20Camp%2C%20OR&destination=Rio%20Distinctive%20Mexican%20Cuisine%2C%20Madras%2C%20OR&travelmode=driving"
        },
        {
          name: { jp: "友人宅で夕食", en: "Dinner at friends' home" },
          note: { jp: "ホスト宅で夕食（外食不要）", en: "Hosted dinner — no plan needed" },
          maps: "https://www.google.com/maps/dir/?api=1&origin=Hillsboro%2C%20OR&destination=Tumalo%2C%20OR&travelmode=driving"
        }
      ],
      see: [
        {
          name: { jp: "スミスロック州立公園", en: "Smith Rock State Park" },
          note: { jp: "有名な眺望・フラットな遊歩道あり（駐車料$5）", en: "Famous viewpoint, flat trails (parking $5)" },
          maps: "https://www.google.com/maps/dir/?api=1&origin=Bend%2C%20OR&destination=Smith%20Rock%20State%20Park%2C%20OR&travelmode=driving"
        }
      ],
      routes: [
        {
          label: { jp: "ヒルズボロ→タマロ 道順", en: "Hillsboro → Tumalo directions" },
          url: "https://www.google.com/maps/dir/?api=1&origin=Hillsboro%2C%20OR&destination=Tumalo%2C%20OR&travelmode=driving"
        }
      ]
    },

    // ---------------------------------------------------------------
    // Day 3 — Fri Aug 14 — Bend free day
    // ---------------------------------------------------------------
    {
      id: "day3-bend-free",
      date: "2026-08-14",
      weekday: { jp: "金", en: "Fri" },
      dayLabel: { jp: "3日目", en: "Day 3" },
      location: { jp: "タマロ / ベンド", en: "Tumalo / Bend, OR" },
      theme: { jp: "自由日・夕方は友人宅で夕食", en: "Free day, evening dinner at home" },
      lat: 44.0582, lon: -121.3153,
      alerts: [],
      programs: [
        {
          name: { jp: "午前（1つ選択）", en: "Morning (choose one)" },
          items: [
            { jp: "ハイデザート博物館（屋内＋屋外・ワシやカワウソ）", en: "High Desert Museum (indoor/outdoor, birds & otters)" },
            { jp: "オールド・ミル・ディストリクト散策", en: "Old Mill District river walk" },
            { jp: "ドレイクパーク（無料・遊具・鴨）", en: "Drake Park (free, playground, ducks)" }
          ]
        },
        {
          name: { jp: "午後", en: "Afternoon" },
          items: [
            { jp: "アルペングロー・パーク水遊び場（無料）", en: "Alpenglow Park splash pad (free)" },
            { jp: "シェブリン・パーク（日陰のフラット遊歩道）", en: "Shevlin Park (shaded flat trail)" }
          ]
        },
        {
          name: { jp: "雨天・暑さ対策（屋内）", en: "Rain/heat backup (indoor)" },
          items: [
            { jp: "マウンテンエア・トランポリン", en: "Mountain Air trampoline park" },
            { jp: "オールドミル・アーケード", en: "Old Mill Vector Volcano arcade" }
          ]
        }
      ],
      eat: [
        {
          name: { jp: "デシューツ・ブルワリー", en: "Deschutes Brewery Public House" },
          note: { jp: "家族連れOK。夕食は自宅", en: "Family friendly; dinner at home" },
          maps: "https://www.google.com/maps/dir/?api=1&origin=Bend%2C%20OR&destination=Deschutes%20Brewery%20Public%20House%2C%20Bend%2C%20OR&travelmode=driving"
        },
        {
          name: { jp: "ワイルドローズ・タイ", en: "Wild Rose Thai" },
          note: { jp: "ベンドのタイ料理", en: "Bend Thai restaurant" },
          maps: "https://www.google.com/maps/dir/?api=1&origin=Bend%2C%20OR&destination=Wild%20Rose%20Thai%2C%20Bend%2C%20OR&travelmode=driving"
        }
      ],
      see: [
        {
          name: { jp: "ハイデザート博物館", en: "High Desert Museum" },
          note: { jp: "5歳児に最適。2〜3時間", en: "Best for a 5yo; allow 2–3 h" },
          maps: "https://www.google.com/maps/dir/?api=1&origin=Bend%2C%20OR&destination=High%20Desert%20Museum%2C%20OR&travelmode=driving"
        },
        {
          name: { jp: "ドレイクパーク", en: "Drake Park" },
          note: { jp: "無料・ミラーポンドの眺め", en: "Free, Mirror Pond view" },
          maps: "https://www.google.com/maps/dir/?api=1&origin=Bend%2C%20OR&destination=Drake%20Park%2C%20Bend%2C%20OR&travelmode=driving"
        }
      ],
      routes: [
        {
          label: { jp: "タマロ→ベンド 道順", en: "Tumalo → Bend directions" },
          url: "https://www.google.com/maps/dir/?api=1&origin=Tumalo%2C%20OR&destination=Bend%2C%20OR&travelmode=driving"
        }
      ]
    },

    // ---------------------------------------------------------------
    // Day 4 — Sat Aug 15 — Tumalo swim + Mt. Bachelor restaurant
    // ---------------------------------------------------------------
    {
      id: "day4-bachelor",
      date: "2026-08-15",
      weekday: { jp: "土", en: "Sat" },
      dayLabel: { jp: "4日目", en: "Day 4" },
      location: { jp: "タマロ + マウントバチェラー", en: "Tumalo + Mt. Bachelor, OR" },
      theme: { jp: "朝は川で泳ぐ→山頂レストラン予約", en: "Morning swim → top-of-lift restaurant (reservation)" },
      lat: 43.9968, lon: -121.6873,
      alerts: [],
      programs: [
        {
          name: { jp: "ライト", en: "Light" },
          items: [
            { jp: "60〜90分 川で泳ぐ → バチェラーへ → 山頂ランチ", en: "60–90 min river swim → drive up → lunch at Pine Marten Lodge" }
          ]
        },
        {
          name: { jp: "フル（サンセットディナーの場合）", en: "Full (if Sunset Dinner)" },
          items: [
            { jp: "水泳＋パイロットビュート → 一旦タマロへ休息 → 夕方の山頂ディナー", en: "Swim + Pilot Butte → rest in Tumalo → 5 PM sunset dinner" }
          ]
        }
      ],
      eat: [
        {
          name: { jp: "パインマーテン・ロッジ（山頂）", en: "Pine Marten Lodge (top)" },
          note: { jp: "スカポロスのランチ。予約要確認", en: "Scapolo's lunch. Reservation needed" },
          maps: "https://www.google.com/maps/dir/?api=1&origin=Tumalo%2C%20OR&destination=Mt.%20Bachelor%2C%20OR&travelmode=driving"
        }
      ],
      see: [
        {
          name: { jp: "リバーベンド・パーク", en: "Riverbend Park" },
          note: { jp: "デシューツ川の浅瀬。5歳児に最適", en: "Deschutes River beach, gentle grade — best for 5yo" },
          maps: "https://www.google.com/maps/dir/?api=1&origin=Bend%2C%20OR&destination=Riverbend%20Park%2C%20Bend%2C%20OR&travelmode=driving"
        },
        {
          name: { jp: "ファーウェル・ベンド・パーク", en: "Farewell Bend Park" },
          note: { jp: "浅い水遊び場＋遊具", en: "Shallow wade area + playground" },
          maps: "https://www.google.com/maps/dir/?api=1&origin=Bend%2C%20OR&destination=Farewell%20Bend%20Park%2C%20Bend%2C%20OR&travelmode=driving"
        },
        {
          name: { jp: "マウントバチェラー山頂", en: "Mt. Bachelor summit" },
          note: { jp: "椅子リフトで山頂へ（大人$29・5歳以下無料）", en: "Chairlift to 7,775 ft (adult $29, child 5&under FREE)" },
          maps: "https://www.google.com/maps/dir/?api=1&origin=Tumalo%2C%20OR&destination=Mt.%20Bachelor%2C%20OR&travelmode=driving"
        }
      ],
      routes: [
        {
          label: { jp: "タマロ→マウントバチェラー 道順", en: "Tumalo → Mt. Bachelor directions" },
          url: "https://www.google.com/maps/dir/?api=1&origin=Tumalo%2C%20OR&destination=Mt.%20Bachelor%2C%20OR&travelmode=driving"
        }
      ]
    },

    // ---------------------------------------------------------------
    // Day 5 — Sun Aug 16 — Tumalo → PDX pickup → Grand Lodge
    // ---------------------------------------------------------------
    {
      id: "day5-pdx-pickup",
      date: "2026-08-16",
      weekday: { jp: "日", en: "Sun" },
      dayLabel: { jp: "5日目", en: "Day 5" },
      location: { jp: "タマロ→PDX→フォレストグローブ", en: "Tumalo → PDX → Forest Grove, OR" },
      theme: { jp: "空港で家族迎え（13:00）→グランドロッジ泊", en: "Pick up family at PDX by 1 PM, overnight at Grand Lodge" },
      lat: 45.5898, lon: -122.5951,
      alerts: [],
      programs: [
        {
          name: { jp: "ライト", en: "Light" },
          items: [
            { jp: "PDXで家族迎え → そのままグランドロッジへ", en: "Airport pickup → straight to Grand Lodge" },
            { jp: "お風呂と休息でリラックス", en: "Soak & rest" }
          ]
        },
        {
          name: { jp: "フル", en: "Full" },
          items: [
            { jp: "時間があればウワジマヤ（ビーバートン）へ", en: "Quick Uwajimaya (Beaverton) stop if time" }
          ]
        }
      ],
      eat: [
        {
          name: { jp: "リオ・ディスティンクティブ・メキシカン（マドラス）", en: "Rio Distinctive Mexican Cuisine (Madras)" },
          note: { jp: "家族向け・好評価（4.6）・帰路の昼食に便利", en: "Family-friendly, highly rated (4.6); handy lunch on the way back" },
          maps: "https://www.google.com/maps/dir/?api=1&origin=Tumalo%2C%20OR&destination=Rio%20Distinctive%20Mexican%20Cuisine%2C%20Madras%2C%20OR&travelmode=driving"
        },
        {
          name: { jp: "マウントフッド・ブルーイング（ガバメントキャンプ）", en: "Mt. Hood Brewing Co. (Government Camp)" },
          note: { jp: "家族連れOK・クイックランチ・マカロニ＆チーズやピザ", en: "Family-friendly; quick lunch; mac & cheese, pizza" },
          maps: "https://www.google.com/maps/dir/?api=1&origin=Madras%2C%20OR&destination=Mt%20Hood%20Brewing%20Co%2C%20Government%20Camp%2C%20OR&travelmode=driving"
        },
        {
          name: { jp: "ハックルベリー・イン（ガバメントキャンプ）", en: "Huckleberry Inn (Government Camp)" },
          note: { jp: "クラシック・ダイナー・ハックルベリーパンケーキ・24時間", en: "Classic diner; huckleberry pancakes; open 24 h" },
          maps: "https://www.google.com/maps/dir/?api=1&origin=Madras%2C%20OR&destination=Huckleberry%20Inn%2C%20Government%20Camp%2C%20OR&travelmode=driving"
        },
        {
          name: { jp: "マクメナミンズ・グランドロッジ", en: "McMenamins Grand Lodge" },
          note: { jp: "敷地内のダイニングで夕食", en: "Dinner on-site at the lodge" },
          maps: "https://www.google.com/maps/dir/?api=1&origin=Portland%20International%20Airport&destination=McMenamins%20Grand%20Lodge%2C%20Forest%20Grove%2C%20OR&travelmode=driving"
        }
      ],
      see: [
        {
          name: { jp: "グランドロッジ", en: "Grand Lodge" },
          note: { jp: "歴史あるロッジ・プール・家族向け", en: "Historic lodge, pools, family-friendly" },
          maps: "https://www.google.com/maps/dir/?api=1&origin=Portland%20International%20Airport&destination=McMenamins%20Grand%20Lodge%2C%20Forest%20Grove%2C%20OR&travelmode=driving"
        }
      ],
      routes: [
        {
          label: { jp: "タマロ→PDX 道順", en: "Tumalo → PDX directions" },
          url: "https://www.google.com/maps/dir/?api=1&origin=Tumalo%2C%20OR&destination=Portland%20International%20Airport%2C%20OR&travelmode=driving"
        },
        {
          label: { jp: "PDX→グランドロッジ 道順", en: "PDX → Grand Lodge directions" },
          url: "https://www.google.com/maps/dir/?api=1&origin=Portland%20International%20Airport&destination=McMenamins%20Grand%20Lodge%2C%20Forest%20Grove%2C%20OR&travelmode=driving"
        }
      ]
    },

    // ---------------------------------------------------------------
    // Day 6 — Mon Aug 17 — Beaux Frères winery, 1:00 PM
    // ---------------------------------------------------------------
    {
      id: "day6-beaux-freres",
      date: "2026-08-17",
      weekday: { jp: "月", en: "Mon" },
      dayLabel: { jp: "6日目", en: "Day 6" },
      location: { jp: "ウィラメット・バレー（ニューバーグ）", en: "Willamette Valley (Newberg), OR" },
      theme: { jp: "ボー・フレール ワイナリー 予約13:00", en: "Beaux Frères appointment at 1:00 PM" },
      lat: 45.2898, lon: -123.0341,
      alerts: [],
      programs: [
        {
          name: { jp: "ライト", en: "Light" },
          items: [
            { jp: "13:00 テイスティング → グランドロッジへ戻る", en: "1 PM tasting → back to Grand Lodge" }
          ]
        },
        {
          name: { jp: "フル", en: "Full" },
          items: [
            { jp: "少し早めに出てレッドヒルズ・マーケットで昼食", en: "Early lunch at Red Hills Market (Dundee)" },
            { jp: "その後テイスティング → フォレストグローブで夕食", en: "Tasting then casual dinner in Forest Grove" }
          ]
        }
      ],
      eat: [
        {
          name: { jp: "ボー・フレール（テイスティング）", en: "Beaux Frères (tasting)" },
          note: { jp: "予約制・家族連れ歓迎。テイスティング90〜120分", en: "By appointment; family-friendly; ≈90–120 min" },
          maps: "https://www.google.com/maps/dir/?api=1&origin=McMenamins%20Grand%20Lodge%2C%20Forest%20Grove%2C%20OR&destination=Beaux%20Fr%C3%A8res%20Vineyard%2C%20Newberg%2C%20OR&travelmode=driving"
        },
        {
          name: { jp: "レッドヒルズ・マーケット", en: "Red Hills Market" },
          note: { jp: "ダンディーの食事処", en: "Dundee casual food market" },
          maps: "https://www.google.com/maps/dir/?api=1&origin=Forest%20Grove%2C%20OR&destination=Red%20Hills%20Market%2C%20Dundee%2C%20OR&travelmode=driving"
        }
      ],
      see: [
        {
          name: { jp: "ボー・フレール・ヴィンヤード", en: "Beaux Frères Vineyard" },
          note: { jp: "リボンリッジAVA・テイスティング予約制", en: "Ribbon Ridge AVA; seated tasting by appointment" },
          maps: "https://www.google.com/maps/dir/?api=1&origin=McMenamins%20Grand%20Lodge%2C%20Forest%20Grove%2C%20OR&destination=Beaux%20Fr%C3%A8res%20Vineyard%2C%20Newberg%2C%20OR&travelmode=driving"
        }
      ],
      routes: [
        {
          label: { jp: "グランドロッジ→ボー・フレール 道順", en: "Grand Lodge → Beaux Frères directions" },
          url: "https://www.google.com/maps/dir/?api=1&origin=McMenamins%20Grand%20Lodge%2C%20Forest%20Grove%2C%20OR&destination=Beaux%20Fr%C3%A8res%20Vineyard%2C%20Newberg%2C%20OR&travelmode=driving"
        }
      ]
    },

    // ---------------------------------------------------------------
    // Day 7 — Tue Aug 18 — PDX → San Francisco, Argonaut Hotel
    // ---------------------------------------------------------------
    {
      id: "day7-sf-argonaut",
      date: "2026-08-18",
      weekday: { jp: "火", en: "Tue" },
      dayLabel: { jp: "7日目", en: "Day 7" },
      location: { jp: "PDX→サンフランシスコ", en: "PDX → San Francisco, CA" },
      theme: { jp: "飛行機でSFへ→アルゴノートホテル泊", en: "Fly to SF, night at Argonaut Hotel" },
      lat: 37.8080, lon: -122.4177,
      alerts: [],
      programs: [
        {
          name: { jp: "ライト", en: "Light" },
          items: [
            { jp: "チェックイン → フィッシャーマンズワーフを散歩", en: "Check in, short Fisherman's Wharf walk" }
          ]
        },
        {
          name: { jp: "フル", en: "Full" },
          items: [
            { jp: "夕方にピア39 / ギラデリスクエアへ", en: "Late-afternoon stroll to Pier 39 / Ghirardelli Square" }
          ]
        }
      ],
      eat: [
        {
          name: { jp: "フィッシャーマンズワーフ周辺", en: "Near Fisherman's Wharf" },
          note: { jp: "カジュアルな家族向け夕食", en: "Casual, kid-friendly dinner" },
          maps: "https://www.google.com/maps/dir/?api=1&origin=San%20Francisco%20International%20Airport&destination=Argonaut%20Hotel%2C%20495%20Jefferson%20St%2C%20San%20Francisco%2C%20CA&travelmode=driving"
        }
      ],
      see: [
        {
          name: { jp: "アルゴノートホテル", en: "Argonaut Hotel" },
          note: { jp: "ジェファーソン通り495・フィッシャーマンズワーフ", en: "495 Jefferson St, Fisherman's Wharf" },
          maps: "https://www.google.com/maps/dir/?api=1&origin=San%20Francisco%20International%20Airport&destination=Argonaut%20Hotel%2C%20495%20Jefferson%20St%2C%20San%20Francisco%2C%20CA&travelmode=driving"
        },
        {
          name: { jp: "ピア39", en: "Pier 39" },
          note: { jp: "アシカ・子ども向けアクティビティ", en: "Sea lions, family activities" },
          maps: "https://www.google.com/maps/dir/?api=1&origin=Argonaut%20Hotel%2C%20San%20Francisco&destination=Pier%2039%2C%20San%20Francisco%2C%20CA&travelmode=driving"
        }
      ],
      routes: [
        {
          label: { jp: "SFO→アルゴノートホテル 道順", en: "SFO → Argonaut Hotel directions" },
          url: "https://www.google.com/maps/dir/?api=1&origin=San%20Francisco%20International%20Airport&destination=Argonaut%20Hotel%2C%20495%20Jefferson%20St%2C%20San%20Francisco%2C%20CA&travelmode=driving"
        }
      ]
    },

    // ---------------------------------------------------------------
    // Day 8 — Wed Aug 19 — Ca' Momi + Opus One (Napa), Lodge at Sonoma
    // ---------------------------------------------------------------
    {
      id: "day8-napa-wineries",
      date: "2026-08-19",
      weekday: { jp: "水", en: "Wed" },
      dayLabel: { jp: "8日目", en: "Day 8" },
      location: { jp: "ソノマ / ナパ・バレー", en: "Sonoma / Napa Valley, CA" },
      theme: { jp: "ワイナリー訪問: カモミ＆オーパスワン", en: "Winery day: Ca' Momi + Opus One" },
      lat: 38.2975, lon: -122.2869,
      alerts: [],
      programs: [
        {
          name: { jp: "スタンダード", en: "Standard" },
          items: [
            { jp: "朝 ソノマ→ナパ（約45〜60分）", en: "Morning drive Sonoma → Napa (≈45–60 min)" },
            { jp: "カ・モミ ナパ → オーパスワン（オークビル）", en: "Ca' Momi Napa → Opus One (Oakville)" },
            { jp: "夕方 ソノマへ戻り ロッジ泊", en: "Return to Sonoma, night at The Lodge" }
          ]
        },
        {
          name: { jp: "フル", en: "Full" },
          items: [
            { jp: "ナパ/ヨーントビルでランチ", en: "Lunch in downtown Napa / Yountville" }
          ]
        }
      ],
      eat: [
        {
          name: { jp: "ロッジ・アット・ソノマ", en: "The Lodge at Sonoma" },
          note: { jp: "ブロードウェイ1325・ソノマプラザ徒歩圏", en: "1325 Broadway, walkable to Sonoma Plaza" },
          maps: "https://www.google.com/maps/dir/?api=1&origin=Opus%20One%2C%20Oakville%2C%20CA&destination=The%20Lodge%20at%20Sonoma%2C%20Sonoma%2C%20CA&travelmode=driving"
        }
      ],
      see: [
        {
          name: { jp: "カ・モミ ナパ", en: "Ca' Momi Napa" },
          note: { jp: "ナパ・バレーのワイナリー。予約要確認", en: "Napa Valley winery. Check reservation" },
          maps: "https://www.google.com/maps/dir/?api=1&origin=The%20Lodge%20at%20Sonoma%2C%20Sonoma%2C%20CA&destination=Ca%27%20Momi%2C%20Napa%2C%20CA&travelmode=driving"
        },
        {
          name: { jp: "オーパスワン", en: "Opus One" },
          note: { jp: "オークビル・予約制・象徴的なテイスティング", en: "Oakville; by appointment; iconic tasting" },
          maps: "https://www.google.com/maps/dir/?api=1&origin=Ca%27%20Momi%2C%20Napa%2C%20CA&destination=Opus%20One%2C%20Oakville%2C%20CA&travelmode=driving"
        }
      ],
      routes: [
        {
          label: { jp: "ソノマ→カ・モミ 道順", en: "Sonoma → Ca' Momi directions" },
          url: "https://www.google.com/maps/dir/?api=1&origin=The%20Lodge%20at%20Sonoma%2C%20Sonoma%2C%20CA&destination=Ca%27%20Momi%2C%20Napa%2C%20CA&travelmode=driving"
        },
        {
          label: { jp: "カ・モミ→オーパスワン 道順", en: "Ca' Momi → Opus One directions" },
          url: "https://www.google.com/maps/dir/?api=1&origin=Ca%27%20Momi%2C%20Napa%2C%20CA&destination=Opus%20One%2C%20Oakville%2C%20CA&travelmode=driving"
        }
      ]
    },

    // ---------------------------------------------------------------
    // Day 9 — Thu Aug 20 — Carrera Winery → Los Angeles, Hyatt Regency LAX
    // ---------------------------------------------------------------
    {
      id: "day9-carrera-lax",
      date: "2026-08-20",
      weekday: { jp: "木", en: "Thu" },
      dayLabel: { jp: "9日目", en: "Day 9" },
      location: { jp: "カレラワイナリー→ロサンゼルス", en: "Carrera Winery → Los Angeles, CA" },
      theme: { jp: "カレラワイナリー訪問＋LAへ", en: "Carrera Winery then travel to LA" },
      lat: 33.9416, lon: -118.4085,
      alerts: [],
      programs: [
        {
          name: { jp: "カレラが途中の場合", en: "If Carrera en route" },
          items: [
            { jp: "ソノマ→カレラ（モントレー）→LA（約8時間）", en: "Sonoma → Carrera (Monterey) → LA (≈8 h)" }
          ]
        },
        {
          name: { jp: "カレラがLA近くの場合", en: "If Carrera near LA" },
          items: [
            { jp: "午前カレラ訪問 → 午後ハイアットLAXへ", en: "Morning Carrera → afternoon Hyatt Regency LAX" }
          ]
        }
      ],
      eat: [
        {
          name: { jp: "ハイアット・リージェンシーLAX", en: "Hyatt Regency LAX" },
          note: { jp: "センチュリー通り6225・空港シャトル24時間", en: "6225 W Century Blvd; 24-h airport shuttle" },
          maps: "https://www.google.com/maps/dir/?api=1&origin=Los%20Angeles%20International%20Airport&destination=Hyatt%20Regency%20Los%20Angeles%20International%20Airport&travelmode=driving"
        }
      ],
      see: [
        {
          name: { jp: "カレラ・ワイナリー", en: "Carrera Winery" },
          note: { jp: "正確な場所を確認中（モントレー/カーメル？）", en: "Exact location being confirmed (Monterey/Carmel?)" },
          maps: "https://www.google.com/maps/dir/?api=1&origin=Sonoma%2C%20CA&destination=Carrera%20Winery&travelmode=driving"
        }
      ],
      routes: [
        {
          label: { jp: "ソノマ→LA 道順", en: "Sonoma → LA directions" },
          url: "https://www.google.com/maps/dir/?api=1&origin=Sonoma%2C%20CA&destination=Los%20Angeles%2C%20CA&travelmode=driving"
        }
      ]
    },

    // ---------------------------------------------------------------
    // Day 10 — Fri Aug 21 — Los Angeles / Glendale sightseeing
    // ---------------------------------------------------------------
    {
      id: "day10-glendale",
      date: "2026-08-21",
      weekday: { jp: "金", en: "Fri" },
      dayLabel: { jp: "10日目", en: "Day 10" },
      location: { jp: "ロサンゼルス / グレンデール", en: "Los Angeles / Glendale, CA" },
      theme: { jp: "LA観光・グレンデール泊", en: "LA sightseeing, overnight in Glendale" },
      lat: 34.1425, lon: -118.2551,
      alerts: [],
      programs: [
        {
          name: { jp: "家族定番", en: "Family classics" },
          items: [
            { jp: "グリフィス天文台（無料・駐車料のみ）", en: "Griffith Observatory (free, parking fee)" },
            { jp: "ハリウッド・ウォーク・オブ・フェイム", en: "Hollywood Walk of Fame" }
          ]
        },
        {
          name: { jp: "地元・屋内", en: "Local / indoor" },
          items: [
            { jp: "グレンデール・ギャラリア / アメリカーナ", en: "Glendale Galleria / Americana at Brand" }
          ]
        }
      ],
      eat: [
        {
          name: { jp: "グレンデールの日系・アジア料理", en: "Glendale Japanese/Asian options" },
          note: { jp: "グレンデールは日本食が充実", en: "Great Japanese/Asian dining in Glendale" },
          maps: "https://www.google.com/maps/dir/?api=1&origin=Hyatt%20Regency%20Los%20Angeles%20International%20Airport&destination=Glendale%2C%20CA&travelmode=driving"
        }
      ],
      see: [
        {
          name: { jp: "グリフィス天文台", en: "Griffith Observatory" },
          note: { jp: "子ども向け・LAの眺め", en: "Kid-friendly, LA views" },
          maps: "https://www.google.com/maps/dir/?api=1&origin=Glendale%2C%20CA&destination=Griffith%20Observatory%2C%20Los%20Angeles%2C%20CA&travelmode=driving"
        },
        {
          name: { jp: "アメリカーナ・アット・ブランド", en: "Americana at Brand" },
          note: { jp: "ショッピング＋飲食・ベビーカーOK", en: "Shopping + dining, stroller friendly" },
          maps: "https://www.google.com/maps/dir/?api=1&origin=Glendale%2C%20CA&destination=Americana%20at%20Brand%2C%20Glendale%2C%20CA&travelmode=driving"
        }
      ],
      routes: [
        {
          label: { jp: "LAX→グレンデール 道順", en: "LAX → Glendale directions" },
          url: "https://www.google.com/maps/dir/?api=1&origin=Hyatt%20Regency%20Los%20Angeles%20International%20Airport&destination=Glendale%2C%20CA&travelmode=driving"
        }
      ]
    },

    // ---------------------------------------------------------------
    // Day 11 — Sat Aug 22 — Los Angeles / Glendale free day
    // ---------------------------------------------------------------
    {
      id: "day11-glendale-2",
      date: "2026-08-22",
      weekday: { jp: "土", en: "Sat" },
      dayLabel: { jp: "11日目", en: "Day 11" },
      location: { jp: "ロサンゼルス / グレンデール", en: "Los Angeles / Glendale, CA" },
      theme: { jp: "LA自由日・グレンデール泊", en: "Free LA day, repeat overnight in Glendale" },
      lat: 34.1425, lon: -118.2551,
      alerts: [],
      programs: [
        {
          name: { jp: "ライト", en: "Light" },
          items: [
            { jp: "ゆっくり朝 → 近所の公園 → 家族で夕食", en: "Relaxed morning, local park, family dinner" }
          ]
        },
        {
          name: { jp: "フル", en: "Full" },
          items: [
            { jp: "サンタモニカ・ピア（短時間・象徴的）", en: "Santa Monica Pier (short, iconic)" }
          ]
        }
      ],
      eat: [
        {
          name: { jp: "グレンデール周辺", en: "Around Glendale" },
          note: { jp: "帰国前のゆったりディナー", en: "Relaxed dinner before the long flight home" },
          maps: "https://www.google.com/maps/dir/?api=1&origin=Glendale%2C%20CA&destination=Glendale%2C%20CA&travelmode=driving"
        }
      ],
      see: [
        {
          name: { jp: "サンタモニカ・ピア", en: "Santa Monica Pier" },
          note: { jp: "子ども向け・ビーチ", en: "Kid-friendly, beach" },
          maps: "https://www.google.com/maps/dir/?api=1&origin=Glendale%2C%20CA&destination=Santa%20Monica%20Pier%2C%20CA&travelmode=driving"
        }
      ],
      routes: []
    },

    // ---------------------------------------------------------------
    // Day 12 — Sun Aug 23 — Depart to Japan from LAX
    // ---------------------------------------------------------------
    {
      id: "day12-depart",
      date: "2026-08-23",
      weekday: { jp: "日", en: "Sun" },
      dayLabel: { jp: "12日目", en: "Day 12" },
      location: { jp: "LAX→日本", en: "LAX → Japan" },
      theme: { jp: "帰国", en: "Departure to Japan" },
      lat: 33.9416, lon: -118.4085,
      alerts: [],
      programs: [
        {
          name: { jp: "スタンダード", en: "Standard" },
          items: [
            { jp: "荷造り・朝食 → グレンデール→LAX（約30〜40分）", en: "Pack, breakfast, Glendale → LAX (≈30–40 min)" },
            { jp: "レンタカー返却 → チェックイン", en: "Return rental car, check in" }
          ]
        }
      ],
      eat: [],
      see: [],
      routes: [
        {
          label: { jp: "グレンデール→LAX 道順", en: "Glendale → LAX directions" },
          url: "https://www.google.com/maps/dir/?api=1&origin=Glendale%2C%20CA&destination=Los%20Angeles%20International%20Airport&travelmode=driving"
        }
      ]
    }
  ]
};