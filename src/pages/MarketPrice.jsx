import React, { useEffect, useState } from "react";
import "./MarketPrice.css";

const priorityStates = [
  "Jharkhand",
  "Bihar",
  "West Bengal",
  "Odisha",
  "Chhattisgarh",
  "Uttar Pradesh",
];

const CROP_EMOJI = {
  rice: "🌾",
  wheat: "🌽",
  onion: "🧅",
  tomato: "🍅",
  potato: "🥔",
  garlic: "🧄",
  ginger: "🫚",
  banana: "🍌",
  mango: "🥭",
  apple: "🍎",
  lemon: "🍋",
  orange: "🍊",
  maize: "🌽",
  soyabean: "🫘",
  cotton: "🪴",
  groundnut: "🥜",
  mustard: "🌿",
  sugarcane: "🎋",
  chilli: "🌶️",
  cabbage: "🥬",
  cauliflower: "🥦",
  brinjal: "🍆",
  pea: "🫛",
};

function getCropEmoji(name = "") {
  const lower = name.toLowerCase();
  for (const [key, val] of Object.entries(CROP_EMOJI)) {
    if (lower.includes(key)) return val;
  }
  return "🌱";
}

const SkeletonRows = () =>
  Array.from({ length: 8 }).map((_, i) => (
    <tr key={i} className="mkt-skeleton-row">
      {[40, 80, 60, 90, 60, 70].map((w, j) => (
        <td key={j}>
          <div className="mkt-skel" style={{ width: `${w}%` }} />
        </td>
      ))}
    </tr>
  ));

const MarketTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [visible, setVisible] = useState(10);

  const API =
    "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070" +
    "?api-key=579b464db66ec23bdd0000015a8ffff6e17a49c37904d14c3df313ea" +
    "&format=json&limit=5000";

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((result) => {
        setData(result.records || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const states = [...new Set(data.map((item) => item.state))];
  const sortedStates = [
    ...priorityStates.filter((s) => states.includes(s)),
    ...states.filter((s) => !priorityStates.includes(s)),
  ];

  const districts = [
    ...new Set(
      data.filter((item) => item.state === state).map((item) => item.district),
    ),
  ];

  const filteredData = data.filter(
    (item) =>
      (!state || item.state === state) &&
      (!district || item.district === district),
  );

  const avgPrice = filteredData.length
    ? Math.round(
        filteredData.reduce((s, r) => s + Number(r.modal_price), 0) /
          filteredData.length,
      )
    : 0;

  return (
    <div className="mkt-root">
      {/* ── Hero ── */}
      <div className="mkt-hero">
        <div className="mkt-eyebrow">
          <span className="mkt-eyebrow-dot" />
          Live · data.gov.in
        </div>
        <h1 className="mkt-title">
          Mandi <span>Price</span> Tracker
        </h1>
        <p className="mkt-subtitle">
          Real-time agricultural commodity prices from APMC markets across India
        </p>
        <div className="mkt-stats">
          <div className="mkt-stat">
            <div className="mkt-stat-value">
              {loading ? "—" : data.length.toLocaleString()}
            </div>
            <div className="mkt-stat-label">Total Records</div>
          </div>
          <div className="mkt-stat-sep" />
          <div className="mkt-stat">
            <div className="mkt-stat-value">
              {loading ? "—" : filteredData.length.toLocaleString()}
            </div>
            <div className="mkt-stat-label">Showing</div>
          </div>
          <div className="mkt-stat-sep" />
          <div className="mkt-stat">
            <div className="mkt-stat-value">
              {loading ? "—" : `₹${avgPrice.toLocaleString("en-IN")}`}
            </div>
            <div className="mkt-stat-label">Avg Price / qtl</div>
          </div>
          <div className="mkt-stat-sep" />
          <div className="mkt-stat">
            <div className="mkt-stat-value">
              {loading ? "—" : sortedStates.length}
            </div>
            <div className="mkt-stat-label">States</div>
          </div>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="mkt-filters">
        <div className="mkt-filter-card">
          <span className="mkt-filter-label">Filter by</span>

          <div className="mkt-select-wrap">
            <select
              className="mkt-select"
              value={state}
              onChange={(e) => {
                setState(e.target.value);
                setDistrict("");
              }}
            >
              <option value="">All States</option>
              {sortedStates.map((s, i) => (
                <option key={i} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="mkt-select-wrap">
            <select
              className="mkt-select"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              disabled={!state}
            >
              <option value="">All Districts</option>
              {districts.map((d, i) => (
                <option key={i} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div className="mkt-count-badge">
            {loading ? "Loading…" : `${filteredData.length} records`}
          </div>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="mkt-table-wrap">
        <div className="mkt-table-box">
          <table className="mkt-table">
            <thead>
              <tr>
                <th>Commodity</th>
                <th>Modal Price</th>
                <th>Market</th>
                <th>State</th>
                <th>Min – Max</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <SkeletonRows />
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan={6}>
                    <div className="mkt-empty">
                      <div className="mkt-empty-icon">🌾</div>
                      <div className="mkt-empty-text">
                        No records found for the selected filters.
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                <>
                  {filteredData.slice(0, visible).map((item, i) => (
                    <tr
                      key={i}
                      style={{ animationDelay: `${Math.min(i * 20, 500)}ms` }}
                    >
                      <td>
                        <div className="mkt-crop">
                          <div className="mkt-crop-icon">
                            {getCropEmoji(item.commodity)}
                          </div>
                          <div>
                            <div className="mkt-crop-name">
                              {item.commodity}
                            </div>
                            <div className="mkt-crop-meta">
                              {item.variety} · {item.grade}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="mkt-price">
                          <div className="mkt-price-main">
                            ₹{Number(item.modal_price).toLocaleString("en-IN")}
                          </div>
                          <div className="mkt-price-unit">per quintal</div>
                        </div>
                      </td>
                      <td>
                        <div className="mkt-market-name">{item.market}</div>
                        <div className="mkt-market-dist">{item.district}</div>
                      </td>
                      <td>
                        <span className="mkt-state-badge">{item.state}</span>
                      </td>
                      <td>
                        <div className="mkt-range">
                          ₹{Number(item.min_price).toLocaleString("en-IN")}
                          <span className="mkt-range-sep">–</span>₹
                          {Number(item.max_price).toLocaleString("en-IN")}
                        </div>
                      </td>
                      <td>
                        <div className="mkt-date">
                          {item.arrival_date || "—"}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {visible < filteredData.length && (
                    <tr>
                      <td colSpan={6} style={{ textAlign: "center" }}>
                        <button
                          className="view-more-btn"
                          onClick={() => setVisible((prev) => prev + 10)}
                        >
                          View More
                        </button>
                      </td>
                    </tr>
                  )}
                </>
              )}
            </tbody>
          </table>
        </div>

        <div className="mkt-footer">
          Data sourced from data.gov.in · Ministry of Agriculture &amp; Farmers
          Welfare · Prices in ₹ / quintal
        </div>
      </div>
    </div>
  );
};

export default MarketTable;
