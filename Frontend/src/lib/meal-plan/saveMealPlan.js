import { apiClient } from "../api/apiClient.js";
import { createApiError, getApiStatus } from "../api/apiError.js";
import { getCsrfToken } from "../auth/getCsrfToken.js";

export async function saveMealPlan(days) {
  const token = await getCsrfToken();

  try {
    const response = await apiClient.put(
      "/api/meal-plan",
      {
        days: days.map((day) => ({
          dayOfWeek: day.dayOfWeek,
          recipeId: day.recipe?.id ?? null,
        })),
      },
      {
        headers: {
          "X-CSRF-TOKEN": token,
        },
      },
    );

    return response.data;
  } catch (error) {
    if (getApiStatus(error) === 401) {
      throw new Error("Du måste vara inloggad för att spara planeringen.", {
        cause: error,
      });
    }

    if (getApiStatus(error) === 404) {
      throw new Error(
        "Ett eller flera recept finns inte längre tillgängliga.",
        {
          cause: error,
        },
      );
    }

    throw createApiError(error, "Kunde inte spara planeringen.");
  }
}
