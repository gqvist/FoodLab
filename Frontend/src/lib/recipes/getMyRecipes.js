import { apiClient } from "../api/apiClient.js";
import { createApiError, getApiStatus } from "../api/apiError.js";

export async function getMyRecipes() {
  try {
    const response = await apiClient.get("/api/recipes/mine", {
      headers: {
        "Cache-Control": "no-store",
      },
    });

    return response.data;
  } catch (error) {
    if (getApiStatus(error) === 401) {
      throw new Error("Du måste vara inloggad för att se dina recept.", {
        cause: error,
      });
    }

    throw createApiError(error, "Kunde inte hämta dina recept.");
  }
}
