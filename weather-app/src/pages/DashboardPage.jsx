import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";
import { getPosition } from "../utils/geolocation";
import { fetchForecast } from "../utils/weather";
import Loader from "../components/Loader";
import WeatherCard from "../components/WeatherCard";

function DashboardPage() {
  const navigate = useNavigate();
  const [days, setDays] = useState([]);
  const [place, setPlace] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const position = await getPosition();
        setPlace(position.isFallback ? "Київ" : "Ваше місцезнаходження");

        const forecast = await fetchForecast(position);
        setDays(forecast);
      } catch (err) {
        setError("Не вдалося завантажити погоду. Спробуйте пізніше.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Погода: {place}</h1>
        <button onClick={handleLogout}>Вийти</button>
      </header>

      {loading && <Loader />}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <div className="weather-list">
          {days.map((day) => (
            <WeatherCard key={day.date} {...day} />
          ))}
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
