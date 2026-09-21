import { API_URL } from "./config.js";

export async function register(email, password, confirmPassword) {
  const csrfResponse = await fetch(`${API_URL}/api/auth/csrf`, {
    credentials: "include",
    cache: "no-store",
  });

  if (!csrfResponse.ok) {
    throw new Error("Kunde inte förbereda registreringen.");
  }

  const { token } = await csrfResponse.json();

  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": token,
    },
    body: JSON.stringify({ email, password, confirmPassword }),
  });

  if (!response.ok) {
    const problem = await response.json().catch(() => null);

    const messages = problem?.errors
      ? Object.values(problem.errors).flat().join(" ")
      : null;

    throw new Error(
      messages || problem?.detail || "Registreringen misslyckades."
    );
  }

  return response.json();
}
