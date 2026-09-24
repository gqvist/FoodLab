import { API_URL } from "../auth/config.js";

export async function createRecipe(recipe) {
  const csrfResponse = await fetch(`${API_URL}/api/auth/csrf`, {
    credentials: "include",
    cache: "no-store",
  });

  if (!csrfResponse.ok) {
    throw new Error("Kunde inte förbereda receptet.");
  }

  const { token } = await csrfResponse.json();

  const response = await fetch(`${API_URL}/api/recipes`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": token,
    },
    body: JSON.stringify(recipe),
  });

  if (response.status === 401) {
    throw new Error("Du måste vara inloggad för att skapa ett recept.");
  }

  if (!response.ok) {
    const problem = await response.json().catch(() => null);

    const validationErrors = problem?.errors
      ? Object.values(problem.errors).flat().join(" ")
      : null;

    throw new Error(
      validationErrors || problem?.detail || "Kunde inte skapa receptet.",
    );
  }

  return response.json();
}
