import { API_URL } from "../auth/config.js";

export async function getSavedRecipes() {
  const response = await fetch(`${API_URL}/api/recipes/saved`, {
    credentials: "include",
    cache: "no-store",
  });

  if (response.status === 401) {
    throw new Error("Du måste vara inloggad för att se sparade recept.");
  }

  if (!response.ok) {
    throw new Error("Kunde inte hämta sparade recept.");
  }

  return response.json();
}
