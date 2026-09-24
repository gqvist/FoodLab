import { API_URL } from "../auth/config.js";

export async function getPublicRecipes() {
  const response = await fetch(`${API_URL}/api/recipes`, {
    credentials: "include",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Kunde inte hämta recepten.");
  }

  return response.json();
}
