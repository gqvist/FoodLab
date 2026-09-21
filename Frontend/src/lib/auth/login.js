import { API_URL } from "./config.js";

export async function login(email, password) {
  // Hämtar CSRF token före man skickar login request.
  const csrfResponse = await fetch(`${API_URL}/api/auth/csrf`, {
    credentials: "include",
    cache: "no-store",
  });

  if (!csrfResponse.ok) {
    throw new Error("Could not prepare login. Please try again.");
  }

  const { token } = await csrfResponse.json();

  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": token,
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Fel e-post eller lösenord");
    }

    throw new Error("Inloggningen misslyckades");
  }

  return response.json();
}
