import { apiClient } from "../api/apiClient.js";

export async function getCsrfToken() {
  let response;

  try {
    response = await apiClient.get("/api/auth/csrf", {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch {
    throw new Error("Något gick fel. Försök igen.");
  }

  const { token } = response.data;

  if (!token) {
    throw new Error("Servern gav ingen säkerhetstoken.");
  }

  return token;
}
