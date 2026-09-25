import { apiClient } from "../api/apiClient.js";
import { createApiError, getApiStatus } from "../api/apiError.js";
import { getCsrfToken } from "./getCsrfToken.js";

export async function login(email, password) {
  const token = await getCsrfToken();

  try {
    const response = await apiClient.post(
      "/api/auth/login",
      { email, password },
      {
        headers: {
          "X-CSRF-TOKEN": token,
        },
      },
    );

    return response.data;
  } catch (error) {
    if (getApiStatus(error) === 401) {
      throw new Error("Fel e-post eller lösenord.", { cause: error });
    }

    throw createApiError(error, "Inloggningen misslyckades.");
  }
}
