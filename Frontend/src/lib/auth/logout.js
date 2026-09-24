import { API_URL } from "./config.js";

export async function logout() {
  const csrfResponse = await fetch(`${API_URL}/api/auth/csrf`, {
    credentials: "include",
    cache: "no-store",
  });

  if (!csrfResponse.ok) {
    throw new Error("Kunde inte förbereda utloggningen.");
  }

  const { token } = await csrfResponse.json();

  const response = await fetch(`${API_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
    headers: {
      "X-CSRF-TOKEN": token,
    },
  });

  // Hanterar om din session redan avslutats
  if (!response.ok && response.status !== 401) {
    throw new Error("Kunde inte logga ut. Försök igen.");
  }
}
