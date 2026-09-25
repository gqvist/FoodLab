import axios from "axios";

export function getApiStatus(error) {
  return axios.isAxiosError(error) ? error.response?.status : undefined;
}

export function getApiErrorMessage(error, fallbackMessage) {
  if (!axios.isAxiosError(error)) {
    return error instanceof Error ? error.message : fallbackMessage;
  }

  const problem = error.response?.data;

  const validationErrors = problem?.errors
    ? Object.values(problem.errors).flat().join(" ")
    : null;

  return (
    validationErrors || problem?.message || problem?.detail || fallbackMessage
  );
}

export function createApiError(error, fallbackMessage) {
  return new Error(getApiErrorMessage(error, fallbackMessage), {
    cause: error,
  });
}
