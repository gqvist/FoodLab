import { apiClient } from "../api/apiClient.js";
import { createApiError, getApiStatus } from "../api/apiError.js";
import { getCsrfToken } from "./getCsrfToken.js";

// Signs out the user and treats an already expired session as successfully logged out.
export async function logout() {
  const token = await getCsrfToken();

  try {
    await apiClient.post("/api/auth/logout", null, {
      headers: {
        "X-CSRF-TOKEN": token,
      },
    });
  } catch (error) {
    if (getApiStatus(error) === 401) {
      return;
    }

    throw createApiError(error, "Kunde inte logga ut. Försök igen.");
  }
}
