import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAuth } from "../utils/auth";

const CORRECT_LOGIN = "mark5";
const CORRECT_PASSWORD = "mark5";

function LoginPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login === "" || password === "") {
      setError("Введіть логін і пароль");
      return;
    }
    if (login !== CORRECT_LOGIN) {
      setError("Неправильний логін");
      return;
    }
    if (password !== CORRECT_PASSWORD) {
      setError("Неправильний пароль");
      return;
    }

    setError("");
    setAuth();
    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={login}
        placeholder="Login"
        onChange={(e) => setLogin(e.target.value)}
      />
      <input
        type="password"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Увійти</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

export default LoginPage;
