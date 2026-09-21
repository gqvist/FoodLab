import { API_URL } from "./config.js";

export async function getCurrentUser() {
  const response = await fetch(`${API_URL}/api/auth/me`, {
    credentials: "include",
    cache: "no-store",
  });

  if (response.status === 401) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Kunde inte hämta användaren.");
  }

  return response.json();
}
