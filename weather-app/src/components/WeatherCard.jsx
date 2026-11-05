import { describeWeather } from "../utils/weather";

function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString("uk-UA", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

function WeatherCard({ date, code, max, min, wind, rain }) {
  const { label, icon } = describeWeather(code);

  return (
    <div className="weather-card">
      <h3>{formatDate(date)}</h3>
      <div className="weather-icon">{icon}</div>
      <p className="weather-label">{label}</p>
      <p>Макс: {Math.round(max)}°C</p>
      <p>Мін: {Math.round(min)}°C</p>
      <p>Вітер: {Math.round(wind)} км/год</p>
      <p>Опади: {rain} мм</p>
    </div>
  );
}

export default WeatherCard;
