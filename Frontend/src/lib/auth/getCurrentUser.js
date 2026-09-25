import { apiClient } from "../api/apiClient.js";
import { createApiError, getApiStatus } from "../api/apiError.js";

export async function getCurrentUser() {
  try {
    const response = await apiClient.get("/api/auth/me", {
      headers: {
        "Cache-Control": "no-store",
      },
    });

    return response.data;
  } catch (error) {
    if (getApiStatus(error) === 401) {
      return null;
    }

    throw createApiError(error, "Kunde inte hämta användaren.");
  }
}
