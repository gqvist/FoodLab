import { apiClient } from "../api/apiClient.js";
import { createApiError, getApiStatus } from "../api/apiError.js";

export async function getRecipeById(id) {
  try {
    const response = await apiClient.get(
      `/api/recipes/${encodeURIComponent(id)}`,
      {
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );

    return response.data;
  } catch (error) {
    if (getApiStatus(error) === 404) {
      return null;
    }

    throw createApiError(error, "Kunde inte hämta receptet.");
  }
}
