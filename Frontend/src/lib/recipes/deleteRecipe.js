import { apiClient } from "../api/apiClient.js";
import { createApiError, getApiStatus } from "../api/apiError.js";
import { getCsrfToken } from "../auth/getCsrfToken.js";

export async function deleteRecipe(recipeId) {
  const token = await getCsrfToken();

  try {
    await apiClient.delete(`/api/recipes/${encodeURIComponent(recipeId)}`, {
      headers: {
        "X-CSRF-TOKEN": token,
      },
    });
  } catch (error) {
    const status = getApiStatus(error);

    if (status === 401) {
      throw new Error("Du måste vara inloggad för att ta bort recept.", {
        cause: error,
      });
    }

    if (status === 404) {
      throw new Error("Receptet hittades inte eller tillhör inte dig.", {
        cause: error,
      });
    }

    throw createApiError(error, "Kunde inte ta bort receptet.");
  }
}
