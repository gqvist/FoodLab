import { API_URL } from "../auth/config.js";

export async function getRecipeById(id) {
  const response = await fetch(
    `${API_URL}/api/recipes/${encodeURIComponent(id)}`,
    {
      credentials: "include",
      cache: "no-store",
    },
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Kunde inte hämta receptet.");
  }

  return response.json();
}
