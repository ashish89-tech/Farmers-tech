import React, { useEffect, useState } from "react";

const priorityStates = [
  "Jharkhand", "Bihar", "West Bengal",
  "Odisha", "Chhattisgarh", "Uttar Pradesh"
];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Mono:wght@400;500&family=Nunito:wght@400;500;600;700&display=swap');

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes shimmer {
    0%   { background-position: -600px 0; }
    100% { background-position: 600px 0; }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  @keyframes rowIn {
    from { opacity: 0; transform: translateX(-10px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.4; }
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .mkt-root {
    min-height: 100vh;
    background: #0d1a0e;
    background-image:
      radial-gradient(ellipse 80% 50% at 50% -10%, #1a3a1c 0%, transparent 60%),
      url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.015'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    font-family: 'Nunito', sans-serif;
    color: #e8f0e9;
    padding-bottom: 80px;
  }

  /* ── Hero Header ── */
  .mkt-hero {
    position: relative;
    padding: 60px 40px 48px;
    text-align: center;
    overflow: hidden;
  }
  .mkt-hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #1a4a1e 0%, #0d2e10 50%, #0a1e0b 100%);
    z-index: 0;
  }
  .mkt-hero::after {
    content: '🌾';
    position: absolute;
    font-size: 220px;
    opacity: 0.04;
    top: -20px;
    right: -20px;
    line-height: 1;
    z-index: 0;
  }
  .mkt-hero > * { position: relative; z-index: 1; }

  .mkt-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(134,188,82,0.15);
    border: 1px solid rgba(134,188,82,0.3);
    border-radius: 100px;
    padding: 5px 16px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #86bc52;
    margin-bottom: 20px;
    animation: fadeUp 0.5s ease both;
  }
  .mkt-eyebrow-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #86bc52;
    animation: pulse 2s ease infinite;
  }

  .mkt-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(36px, 6vw, 72px);
    font-weight: 900;
    line-height: 1.05;
    letter-spacing: -0.02em;
    color: #f0f7e8;
    animation: fadeUp 0.6s 0.1s ease both;
  }
  .mkt-title span {
    background: linear-gradient(135deg, #86bc52 0%, #c8e87a 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .mkt-subtitle {
    margin-top: 14px;
    font-size: 15px;
    color: #7a9e7e;
    letter-spacing: 0.01em;
    animation: fadeUp 0.6s 0.2s ease both;
  }

  .mkt-stats {
    display: flex;
    justify-content: center;
    gap: 32px;
    margin-top: 32px;
    animation: fadeUp 0.6s 0.3s ease both;
    flex-wrap: wrap;
  }
  .mkt-stat {
    text-align: center;
  }
  .mkt-stat-value {
    font-family: 'DM Mono', monospace;
    font-size: 28px;
    font-weight: 500;
    color: #86bc52;
    line-height: 1;
  }
  .mkt-stat-label {
    font-size: 11px;
    color: #5a7a5e;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-top: 4px;
  }
  .mkt-stat-sep {
    width: 1px;
    height: 40px;
    background: #1e3a20;
    align-self: center;
  }

  /* ── Filter bar ── */
  .mkt-filters {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 24px;
    animation: fadeUp 0.6s 0.4s ease both;
  }
  .mkt-filter-card {
    background: #111f12;
    border: 1px solid #1e3520;
    border-radius: 18px;
    padding: 20px 24px;
    display: flex;
    gap: 14px;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 28px;
    box-shadow: 0 4px 30px rgba(0,0,0,0.4);
  }
  .mkt-filter-label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #4a6a4e;
    white-space: nowrap;
  }
  .mkt-select-wrap {
    position: relative;
    flex: 1;
    min-width: 180px;
  }
  .mkt-select-wrap::after {
    content: '▾';
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: #86bc52;
    font-size: 12px;
    pointer-events: none;
  }
  .mkt-select {
    width: 100%;
    appearance: none;
    background: #0d1a0e;
    border: 1.5px solid #1e3520;
    border-radius: 10px;
    padding: 11px 36px 11px 14px;
    font-family: 'Nunito', sans-serif;
    font-size: 14px;
    font-weight: 600;
    color: #c8deca;
    cursor: pointer;
    transition: border-color 0.2s, box-shadow 0.2s;
    outline: none;
  }
  .mkt-select:focus {
    border-color: #86bc52;
    box-shadow: 0 0 0 3px rgba(134,188,82,0.15);
  }
  .mkt-count-badge {
    margin-left: auto;
    background: linear-gradient(135deg, #1a3a1c, #0f2410);
    border: 1px solid #2a4a2c;
    border-radius: 100px;
    padding: 6px 16px;
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    color: #86bc52;
    white-space: nowrap;
  }

  /* ── Table container ── */
  .mkt-table-wrap {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 24px;
    animation: fadeUp 0.6s 0.5s ease both;
  }
  .mkt-table-box {
    background: #0f1d10;
    border: 1px solid #1a3020;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(134,188,82,0.05);
  }
  .mkt-table {
    width: 100%;
    border-collapse: collapse;
  }

  /* ── Table head ── */
  .mkt-table thead tr {
    background: linear-gradient(90deg, #142416 0%, #1a3020 100%);
    border-bottom: 2px solid #2a4a2e;
  }
  .mkt-table th {
    padding: 16px 18px;
    text-align: left;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #5a8a5e;
  }
  .mkt-table th:first-child { padding-left: 24px; }
  .mkt-table th:last-child  { padding-right: 24px; }

  /* ── Table rows ── */
  .mkt-table tbody tr {
    border-bottom: 1px solid #141f15;
    transition: background 0.15s;
    animation: rowIn 0.3s ease both;
  }
  .mkt-table tbody tr:last-child { border-bottom: none; }
  .mkt-table tbody tr:hover {
    background: rgba(134,188,82,0.05);
    cursor: pointer;
  }
  .mkt-table td {
    padding: 15px 18px;
    font-size: 14px;
    vertical-align: middle;
  }
  .mkt-table td:first-child { padding-left: 24px; }
  .mkt-table td:last-child  { padding-right: 24px; }

  /* ── Crop cell ── */
  .mkt-crop {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .mkt-crop-icon {
    width: 34px;
    height: 34px;
    border-radius: 10px;
    background: linear-gradient(135deg, #1a3a1e, #253d27);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    flex-shrink: 0;
    border: 1px solid #2a4e2e;
  }
  .mkt-crop-name {
    font-weight: 700;
    color: #e0ede2;
    font-size: 14px;
  }

  /* ── Price cell ── */
  .mkt-price {
    display: flex;
    flex-direction: column;
    gap: 1px;
  }
  .mkt-price-main {
    font-family: 'DM Mono', monospace;
    font-size: 16px;
    font-weight: 500;
    color: #86bc52;
    letter-spacing: -0.02em;
  }
  .mkt-price-unit {
    font-size: 10px;
    color: #3a5a3e;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  /* ── Market cell ── */
  .mkt-market-name {
    font-weight: 600;
    color: #c0d8c2;
    font-size: 13px;
  }
  .mkt-market-dist {
    font-size: 11px;
    color: #4a6a4e;
    margin-top: 2px;
  }

  /* ── State badge ── */
  .mkt-state-badge {
    display: inline-block;
    padding: 4px 10px;
    border-radius: 100px;
    font-size: 11px;
    font-weight: 700;
    background: rgba(134,188,82,0.1);
    color: #86bc52;
    border: 1px solid rgba(134,188,82,0.2);
    white-space: nowrap;
  }

  /* ── Date cell ── */
  .mkt-date {
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    color: #3a5a3e;
  }

  /* ── Loading skeleton ── */
  .mkt-skeleton-row td {
    padding: 18px;
  }
  .mkt-skel {
    height: 16px;
    border-radius: 8px;
    background: linear-gradient(90deg, #141f15 25%, #1a2e1c 50%, #141f15 75%);
    background-size: 600px 100%;
    animation: shimmer 1.5s infinite;
  }

  /* ── Empty state ── */
  .mkt-empty {
    text-align: center;
    padding: 80px 20px;
  }
  .mkt-empty-icon {
    font-size: 56px;
    margin-bottom: 16px;
    opacity: 0.4;
  }
  .mkt-empty-text {
    color: #3a5a3e;
    font-size: 15px;
  }

  /* ── Footer ── */
  .mkt-footer {
    text-align: center;
    margin-top: 40px;
    font-size: 12px;
    color: #2a4a2e;
    letter-spacing: 0.05em;
    max-width: 1100px;
    margin-left: auto;
    margin-right: auto;
    padding: 0 24px;
  }

  @media (max-width: 700px) {
    .mkt-hero { padding: 40px 20px 36px; }
    .mkt-filters, .mkt-table-wrap { padding: 0 12px; }
    .mkt-table td, .mkt-table th { padding: 12px 10px; font-size: 12px; }
    .mkt-table td:first-child, .mkt-table th:first-child { padding-left: 14px; }
    .mkt-stats { gap: 16px; }
    .mkt-stat-sep { display: none; }
  }
`;

const CROP_EMOJI = {
  rice: "🌾", wheat: "🌽", onion: "🧅", tomato: "🍅", potato: "🥔",
  garlic: "🧄", ginger: "🫚", banana: "🍌", mango: "🥭", apple: "🍎",
  lemon: "🍋", orange: "🍊", maize: "🌽", soyabean: "🫘", cotton: "🪴",
  groundnut: "🥜", mustard: "🌿", sugarcane: "🎋", chilli: "🌶️",
  cabbage: "🥬", cauliflower: "🥦", brinjal: "🍆", pea: "🫛",
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
        <td key={j}><div className="mkt-skel" style={{ width: `${w}%` }} /></td>
      ))}
    </tr>
  ));

const MarketTable = () => {
  const [data, setData]         = useState([]);
  const [loading, setLoading]   = useState(true);
  const [state, setState]       = useState("");
  const [district, setDistrict] = useState("");

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
      data.filter((item) => item.state === state).map((item) => item.district)
    ),
  ];

  const filteredData = data.filter(
    (item) =>
      (!state    || item.state    === state) &&
      (!district || item.district === district)
  );

  const avgPrice = filteredData.length
    ? Math.round(filteredData.reduce((s, r) => s + Number(r.modal_price), 0) / filteredData.length)
    : 0;

  return (
    <>
      <style>{css}</style>
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
                onChange={(e) => { setState(e.target.value); setDistrict(""); }}
              >
                <option value="">All States</option>
                {sortedStates.map((s, i) => <option key={i} value={s}>{s}</option>)}
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
                {districts.map((d, i) => <option key={i} value={d}>{d}</option>)}
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
                        <div className="mkt-empty-text">No records found for the selected filters.</div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredData.map((item, i) => (
                    <tr key={i} style={{ animationDelay: `${Math.min(i * 20, 500)}ms` }}>
                      <td>
                        <div className="mkt-crop">
                          <div className="mkt-crop-icon">{getCropEmoji(item.commodity)}</div>
                          <div>
                            <div className="mkt-crop-name">{item.commodity}</div>
                            <div style={{ fontSize: 11, color: "#3a5a3e", marginTop: 1 }}>
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
                        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#5a8a5e" }}>
                          ₹{Number(item.min_price).toLocaleString("en-IN")}
                          <span style={{ color: "#2a4a2e", margin: "0 4px" }}>–</span>
                          ₹{Number(item.max_price).toLocaleString("en-IN")}
                        </div>
                      </td>
                      <td>
                        <div className="mkt-date">{item.arrival_date || "—"}</div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="mkt-footer">
            Data sourced from data.gov.in · Ministry of Agriculture &amp; Farmers Welfare · Prices in ₹ / quintal
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketTable;