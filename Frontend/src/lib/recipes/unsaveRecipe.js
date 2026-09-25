import { apiClient } from "../api/apiClient.js";
import { createApiError, getApiStatus } from "../api/apiError.js";
import { getCsrfToken } from "../auth/getCsrfToken.js";

export async function unsaveRecipe(recipeId) {
  const token = await getCsrfToken();

  try {
    await apiClient.delete(
      `/api/recipes/${encodeURIComponent(recipeId)}/saved`,
      {
        headers: {
          "X-CSRF-TOKEN": token,
        },
      },
    );
  } catch (error) {
    if (getApiStatus(error) === 401) {
      throw new Error("Du måste vara inloggad för att ändra sparade recept.", {
        cause: error,
      });
    }

    throw createApiError(error, "Kunde inte ta bort det sparade receptet.");
  }
}
