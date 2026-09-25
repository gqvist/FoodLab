import { apiClient } from "../api/apiClient.js";
import { createApiError } from "../api/apiError.js";
import { getCsrfToken } from "./getCsrfToken.js";

export async function register(email, password, confirmPassword) {
  const token = await getCsrfToken();

  try {
    const response = await apiClient.post(
      "/api/auth/register",
      { email, password, confirmPassword },
      {
        headers: {
          "X-CSRF-TOKEN": token,
        },
      },
    );

    return response.data;
  } catch (error) {
    throw createApiError(error, "Registreringen misslyckades.");
  }
}
