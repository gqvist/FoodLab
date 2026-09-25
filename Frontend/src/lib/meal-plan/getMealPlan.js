import { apiClient } from "../api/apiClient.js";
import { createApiError, getApiStatus } from "../api/apiError.js";

export async function getMealPlan() {
  try {
    const response = await apiClient.get("/api/meal-plan", {
      headers: {
        "Cache-Control": "no-store",
      },
    });

    return response.data;
  } catch (error) {
    if (getApiStatus(error) === 401) {
      throw new Error("Du måste vara inloggad för att se din planering.", {
        cause: error,
      });
    }

    throw createApiError(error, "Kunde inte hämta planeringen.");
  }
}
