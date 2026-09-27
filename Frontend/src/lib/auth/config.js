// Reads the environment-specific backend URL and falls back to the local development API.
export const API_URL = import.meta.env.VITE_API_URL ?? "https://localhost:7079";
