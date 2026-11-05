import Cookies from "js-cookie";

const AUTH_KEY = "isAuth";

export function setAuth() {
  Cookies.set(AUTH_KEY, "true", { expires: 1 });
}

export function isAuthenticated() {
  return Cookies.get(AUTH_KEY) === "true";
}

export function logout() {
  Cookies.remove(AUTH_KEY);
}
