import { apiClient } from "../api/apiClient.js";
import { createApiError, getApiStatus } from "../api/apiError.js";
import { getCsrfToken } from "../auth/getCsrfToken.js";

export async function randomizeMealPlan({
  includeOwn,
  includeSaved,
  includePublic,
  count,
  excludedRecipeIds = [],
}) {
  const token = await getCsrfToken();

  try {
    const response = await apiClient.post(
      "/api/meal-plan/randomize",
      {
        includeOwn,
        includeSaved,
        includePublic,
        count,
        excludedRecipeIds,
      },
      {
        headers: {
          "X-CSRF-TOKEN": token,
        },
      },
    );

    return response.data.recipes;
  } catch (error) {
    if (getApiStatus(error) === 401) {
      throw new Error("Du måste vara inloggad för att slumpa planeringen.", {
        cause: error,
      });
    }

    throw createApiError(error, "Kunde inte slumpa planeringen.");
  }
}
