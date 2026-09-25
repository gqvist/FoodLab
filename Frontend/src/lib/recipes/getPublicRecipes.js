import { apiClient } from "../api/apiClient.js";
import { createApiError } from "../api/apiError.js";

export async function getPublicRecipes() {
  try {
    const response = await apiClient.get("/api/recipes", {
      headers: {
        "Cache-Control": "no-store",
      },
    });

    return response.data;
  } catch (error) {
    throw createApiError(error, "Kunde inte hämta recepten.");
  }
}
