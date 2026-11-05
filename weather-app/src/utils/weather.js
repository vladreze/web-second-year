const KYIV = { latitude: 50.45, longitude: 30.52 };

const WEATHER_CODES = {
  0: { label: "Ясно", icon: "☀️" },
  1: { label: "Переважно ясно", icon: "🌤️" },
  2: { label: "Мінлива хмарність", icon: "⛅" },
  3: { label: "Хмарно", icon: "☁️" },
  45: { label: "Туман", icon: "🌫️" },
  48: { label: "Паморозь", icon: "🌫️" },
  51: { label: "Легка мряка", icon: "🌦️" },
  53: { label: "Мряка", icon: "🌦️" },
  55: { label: "Сильна мряка", icon: "🌦️" },
  56: { label: "Легка крижана мряка", icon: "🌧️" },
  57: { label: "Сильна крижана мряка", icon: "🌧️" },
  61: { label: "Невеликий дощ", icon: "🌧️" },
  63: { label: "Дощ", icon: "🌧️" },
  65: { label: "Сильний дощ", icon: "🌧️" },
  66: { label: "Легкий крижаний дощ", icon: "🌧️" },
  67: { label: "Сильний крижаний дощ", icon: "🌧️" },
  71: { label: "Невеликий сніг", icon: "🌨️" },
  73: { label: "Сніг", icon: "🌨️" },
  75: { label: "Сильний сніг", icon: "❄️" },
  77: { label: "Снігові зерна", icon: "❄️" },
  80: { label: "Невелика злива", icon: "🌦️" },
  81: { label: "Злива", icon: "🌧️" },
  82: { label: "Дуже сильна злива", icon: "⛈️" },
  85: { label: "Невеликий снігопад", icon: "🌨️" },
  86: { label: "Сильний снігопад", icon: "❄️" },
  95: { label: "Гроза", icon: "⛈️" },
  96: { label: "Гроза з невеликим градом", icon: "⛈️" },
  97: { label: "Сильна гроза", icon: "⛈️" },
  99: { label: "Сильна гроза з градом", icon: "⛈️" },
};

export function describeWeather(code) {
  return WEATHER_CODES[code] || { label: "Невідомо", icon: "❓" };
}

export { KYIV };

export async function fetchForecast({ latitude, longitude }) {
  const params = new URLSearchParams({
    latitude,
    longitude,
    daily: [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "wind_speed_10m_max",
      "precipitation_sum",
    ].join(","),
    timezone: "auto",
    forecast_days: 5,
  });

  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?${params}`,
  );
  if (!response.ok) {
    throw new Error("Помилка сервера погоди");
  }

  const data = await response.json();
  const daily = data.daily;

  return daily.time.map((date, i) => ({
    date,
    code: daily.weather_code[i],
    max: daily.temperature_2m_max[i],
    min: daily.temperature_2m_min[i],
    wind: daily.wind_speed_10m_max[i],
    rain: daily.precipitation_sum[i],
  }));
}
