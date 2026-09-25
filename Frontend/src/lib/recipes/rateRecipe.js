import { apiClient } from "../api/apiClient.js";
import { createApiError, getApiStatus } from "../api/apiError.js";
import { getCsrfToken } from "../auth/getCsrfToken.js";

export async function rateRecipe(recipeId, value) {
  const token = await getCsrfToken();

  try {
    await apiClient.put(
      `/api/recipes/${encodeURIComponent(recipeId)}/rating`,
      {
        value,
      },
      {
        headers: {
          "X-CSRF-TOKEN": token,
        },
      },
    );
  } catch (error) {
    const status = getApiStatus(error);

    if (status === 401) {
      throw new Error("Du måste vara inloggad för att betygsätta recept.", {
        cause: error,
      });
    }

    if (status === 404) {
      throw new Error("Receptet finns inte eller är inte offentligt.", {
        cause: error,
      });
    }

    throw createApiError(error, "Kunde inte spara betyget.");
  }
}
