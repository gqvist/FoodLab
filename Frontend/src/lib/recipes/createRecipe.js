import { apiClient } from "../api/apiClient.js";
import { createApiError, getApiStatus } from "../api/apiError.js";
import { getCsrfToken } from "../auth/getCsrfToken.js";

export async function createRecipe(recipe) {
  const token = await getCsrfToken();

  try {
    const response = await apiClient.post("/api/recipes", recipe, {
      headers: {
        "X-CSRF-TOKEN": token,
      },
    });

    return response.data;
  } catch (error) {
    if (getApiStatus(error) === 401) {
      throw new Error("Du måste vara inloggad för att skapa ett recept.", {
        cause: error,
      });
    }

    throw createApiError(error, "Kunde inte skapa receptet.");
  }
}
