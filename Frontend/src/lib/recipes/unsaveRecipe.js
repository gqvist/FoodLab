import { API_URL } from "../auth/config.js";

export async function unsaveRecipe(recipeId) {
  const csrfResponse = await fetch(`${API_URL}/api/auth/csrf`, {
    credentials: "include",
    cache: "no-store",
  });

  if (!csrfResponse.ok) {
    throw new Error("Kunde inte förbereda borttagningen.");
  }

  const { token } = await csrfResponse.json();

  const response = await fetch(
    `${API_URL}/api/recipes/${encodeURIComponent(recipeId)}/saved`,
    {
      method: "DELETE",
      credentials: "include",
      headers: {
        "X-CSRF-TOKEN": token,
      },
    },
  );

  if (response.status === 401) {
    throw new Error("Du måste vara inloggad för att ändra sparade recept.");
  }

  if (!response.ok) {
    const problem = await response.json().catch(() => null);

    throw new Error(
      problem?.message ||
        problem?.detail ||
        "Kunde inte ta bort det sparade receptet.",
    );
  }
}
