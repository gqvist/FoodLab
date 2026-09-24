import { API_URL } from "../auth/config.js";

export async function getMyRecipes() {
  const response = await fetch(`${API_URL}/api/recipes/mine`, {
    credentials: "include",
    cache: "no-store",
  });

  if (response.status === 401) {
    throw new Error("Du måste vara inloggad för att se dina recept.");
  }

  if (!response.ok) {
    throw new Error("Kunde inte hämta dina recept.");
  }

  return response.json();
}
