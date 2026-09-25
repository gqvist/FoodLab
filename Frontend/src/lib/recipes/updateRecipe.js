import { apiClient } from "../api/apiClient.js";
import { createApiError, getApiStatus } from "../api/apiError.js";
import { getCsrfToken } from "../auth/getCsrfToken.js";

export async function updateRecipe(recipeId, recipe) {
  const token = await getCsrfToken();

  try {
    const response = await apiClient.put(
      `/api/recipes/${encodeURIComponent(recipeId)}`,
      recipe,
      {
        headers: {
          "X-CSRF-TOKEN": token,
        },
      },
    );

    return response.data;
  } catch (error) {
    const status = getApiStatus(error);

    if (status === 401) {
      throw new Error("Du måste vara inloggad för att redigera recept.", {
        cause: error,
      });
    }

    if (status === 404) {
      throw new Error("Receptet hittades inte eller tillhör inte dig.", {
        cause: error,
      });
    }

    throw createApiError(error, "Kunde inte uppdatera receptet.");
  }
}
