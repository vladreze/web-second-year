import { KYIV } from "./weather";

export function getPosition() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({ ...KYIV, isFallback: true });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) =>
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          isFallback: false,
        }),
      () => resolve({ ...KYIV, isFallback: true }),
      { timeout: 5000 },
    );
  });
}
