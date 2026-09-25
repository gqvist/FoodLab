import { apiClient } from "../api/apiClient.js";
import { createApiError, getApiStatus } from "../api/apiError.js";

export async function getShoppingList() {
  try {
    const response = await apiClient.get("/api/meal-plan/shopping-list", {
      headers: {
        "Cache-Control": "no-store",
      },
    });

    return response.data.items;
  } catch (error) {
    if (getApiStatus(error) === 401) {
      throw new Error("Du måste vara inloggad för att se inköpslistan.", {
        cause: error,
      });
    }

    throw createApiError(error, "Kunde inte hämta inköpslistan.");
  }
}
