import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./Weather.css";
import { RefreshCw, TrendingUp, TrendingDown, Minus } from "lucide-react";

/* ── helpers ── */
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDayLabel(dateStr, idx) {
  if (idx === 0) return "Today";
  if (idx === 1) return "Tmrw";
  const d = new Date(dateStr);
  return DAY_NAMES[d.getDay()];
}

function getRainClass(pct) {
  if (pct >= 70) return "high-rain";
  if (pct >= 40) return "mid-rain";
  return "";
}

function getRainPctClass(pct) {
  if (pct >= 70) return "high";
  if (pct >= 40) return "mid";
  return "";
}

/* ── Price logic ── */
function getPriceSuggestion(forecastDays) {
  if (!forecastDays?.length) return null;
  const maxRain = Math.max(
    ...forecastDays.map((d) => d.day.daily_chance_of_rain),
  );
  const avgRain =
    forecastDays.reduce((s, d) => s + d.day.daily_chance_of_rain, 0) /
    forecastDays.length;

  if (maxRain >= 70 || avgRain >= 55) {
    return {
      type: "raise",
      label: "📈 Heavy rain ahead",
      reason:
        "Significant rainfall forecast over the next few days may disrupt supply and damage crops. Consider raising vegetable & perishable prices by 10–15%.",
      suggestedDelta: 12,
    };
  }
  if (avgRain >= 35) {
    return {
      type: "stable",
      label: "⛅ Moderate showers",
      reason:
        "Intermittent rain expected. Monitor conditions closely — a modest 5% buffer on perishables may be warranted.",
      suggestedDelta: 5,
    };
  }
  return {
    type: "lower",
    label: "✅ Clear weather ahead",
    reason:
      "Stable weather means good harvest conditions and steady supply. Competitive pricing will help you move more inventory.",
    suggestedDelta: -5,
  };
}

/* ── Component ── */
function Weather({ onPriceAdjust, onReset }) {
  const [stateName, setStateName] = useState("Bihar");
  const [district, setDistrict] = useState("Patna");
  const [weather, setWeather] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const [priceAdj, setPriceAdj] = useState(0); // % adjustment applied

  const locations = {
    Bihar: ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga"],
    Jharkhand: [
      "Ranchi",
      "Dhanbad",
      "Bokaro",
      "Deoghar",
      "Jamshedpur",
      "Hazaribagh",
      "Daltonganj",
    ],
  };

  const API_KEY = import.meta.env.VITE_WEATHER_API;

  const fetchWeather = useCallback(
    async (city) => {
      setSpinning(true);
      try {
        const res = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=5`,
        );
        setWeather(res.data);
        setPriceAdj(0); // reset price adj on new fetch
      } catch (err) {
        console.error(err.response?.data || err);
      } finally {
        setSpinning(false);
      }
    },
    [API_KEY],
  );

  useEffect(() => {
    fetchWeather(district);
  }, []);

  const suggestion = weather
    ? getPriceSuggestion(weather.forecast.forecastday)
    : null;

  const handleStateChange = (e) => {
    const s = e.target.value;
    setStateName(s);
    setDistrict(locations[s][0]);
  };

  const applyPrice = (delta) => {
    setPriceAdj((prev) => Math.round((prev + delta) * 10) / 10);
    onPriceAdjust?.(delta);
  };

  return (
    <div className="weather-section">
      <div className="weather-section-label">Smart Weather &amp; Pricing</div>

      <div className="weather-card">
        {/* ── Header ── */}
        <div className="weather-header">
          <div className="weather-header-left">
            <div className="weather-eyebrow">
              <span className="weather-eyebrow-dot" />
              Live Forecast
            </div>
            <h2 className="weather-location-title">
              <span className="pin-emoji">📍</span> {district}, {stateName}
            </h2>
          </div>

          <div className="weather-header-right">
            <select
              className="weather-select"
              value={stateName}
              onChange={handleStateChange}
            >
              {Object.keys(locations).map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>

            <select
              className="weather-select"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            >
              {locations[stateName].map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>

            <button
              className={`weather-refresh-btn ${spinning ? "spinning" : ""}`}
              onClick={() => fetchWeather(district)}
              disabled={spinning}
            >
              <RefreshCw size={14} />
              {spinning ? "Loading…" : "Refresh"}
            </button>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="weather-body">
          {!weather ? (
            <div className="weather-loading">
              <div className="weather-loading-icon">🌤️</div>
              Fetching weather data…
            </div>
          ) : (
            <>
              {/* Current conditions */}
              <div className="weather-current">
                <div className="weather-temp-block">
                  <div className="weather-temp">{weather.current.temp_c}°C</div>
                  <div className="weather-condition-text">
                    {weather.current.condition.text}
                  </div>
                  <div className="weather-feels">
                    Feels like {weather.current.feelslike_c}°C
                  </div>
                </div>
                <div className="weather-icon-wrap">
                  <img
                    src={weather.current.condition.icon}
                    alt="weather"
                    className="weather-icon"
                  />
                </div>
              </div>

              {/* Mini stat cards */}
              <div className="weather-stats">
                <div className="weather-mini-card">
                  <div className="weather-mini-label">☔ Rain Today</div>
                  <div className="weather-mini-value">
                    {weather.forecast.forecastday[0].day.daily_chance_of_rain}%
                  </div>
                </div>
                <div className="weather-mini-card">
                  <div className="weather-mini-label">💧 Humidity</div>
                  <div className="weather-mini-value">
                    {weather.current.humidity}%
                  </div>
                </div>
                <div className="weather-mini-card">
                  <div className="weather-mini-label">🌬 Wind</div>
                  <div className="weather-mini-value">
                    {weather.current.wind_kph}{" "}
                    <span style={{ fontSize: "13px", color: "#b09070" }}>
                      km/h
                    </span>
                  </div>
                </div>
                <div className="weather-mini-card">
                  <div className="weather-mini-label">👁 Visibility</div>
                  <div className="weather-mini-value">
                    {weather.current.vis_km}{" "}
                    <span style={{ fontSize: "13px", color: "#b09070" }}>
                      km
                    </span>
                  </div>
                </div>
                <div className="weather-mini-card">
                  <div className="weather-mini-label">🌡 UV Index</div>
                  <div className="weather-mini-value">{weather.current.uv}</div>
                </div>
              </div>

              {/* 5-Day Precipitation Forecast */}
              <div className="weather-forecast">
                <div className="weather-forecast-title">
                  Precipitation — Next {weather.forecast.forecastday.length}{" "}
                  Days
                </div>
                <div className="forecast-bars">
                  {weather.forecast.forecastday.map((day, idx) => {
                    const rainPct = day.day.daily_chance_of_rain;
                    const barH = Math.max(4, (rainPct / 100) * 70);
                    return (
                      <div className="forecast-day" key={day.date}>
                        <img
                          src={day.day.condition.icon}
                          alt={day.day.condition.text}
                          className="forecast-day-icon"
                        />
                        <div className="forecast-day-name">
                          {getDayLabel(day.date, idx)}
                        </div>
                        <div className="forecast-bar-track">
                          <div
                            className={`forecast-bar-fill ${getRainClass(rainPct)}`}
                            style={{
                              height: `${barH}px`,
                              "--bar-h": `${barH}px`,
                              "--bar-delay": `${idx * 0.1}s`,
                            }}
                          />
                        </div>
                        <div
                          className={`forecast-rain-pct ${getRainPctClass(rainPct)}`}
                        >
                          {rainPct}%
                        </div>
                        <div className="forecast-temp-range">
                          {day.day.maxtemp_c}° / {day.day.mintemp_c}°
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Price Adjustment Panel */}
              {suggestion && (
                <div className="weather-price-panel">
                  <div className="price-panel-header">
                    <div className="price-panel-title">
                      Smart Price Adjuster
                    </div>
                    <div
                      className={`price-suggestion-badge ${suggestion.type}`}
                    >
                      {suggestion.label}
                    </div>
                  </div>

                  <div className="price-panel-body">
                    <div className="price-adj-display">
                      <span className="price-adj-label">Adjustment</span>
                      <span
                        className={`price-adj-value ${
                          priceAdj > 0
                            ? "positive"
                            : priceAdj < 0
                              ? "negative"
                              : ""
                        }`}
                      >
                        {priceAdj > 0 ? "+" : ""}
                        {priceAdj}
                      </span>
                      <span className="price-adj-unit">%</span>
                    </div>

                    <div className="price-adj-buttons">
                      <button
                        className="price-btn raise"
                        onClick={() => applyPrice(5)}
                        title="Increase prices by 5%"
                      >
                        <TrendingUp size={14} />
                        +5% Raise
                      </button>
                      <button
                        className="price-btn raise"
                        onClick={() => applyPrice(10)}
                        title="Increase prices by 10%"
                      >
                        <TrendingUp size={14} />
                        +10% Raise
                      </button>
                      <button
                        className="price-btn lower"
                        onClick={() => applyPrice(-5)}
                        title="Decrease prices by 5%"
                      >
                        <TrendingDown size={14} />
                        −5% Lower
                      </button>
                      <button
                        className="price-btn lower"
                        onClick={() => applyPrice(-10)}
                        title="Decrease prices by 10%"
                      >
                        <TrendingDown size={14} />
                        −10% Lower
                      </button>
                      {priceAdj !== 0 && (
                        <button
                          className="price-btn reset"
                          onClick={() => {
                            setPriceAdj(0);
                            onReset?.(); // ← resets multiplier in store to 1
                          }}
                        >
                          <Minus size={14} />
                          Reset
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="price-reason">{suggestion.reason}</div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Weather;
