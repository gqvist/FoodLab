import axios from "axios";

import { API_URL } from "../auth/config.js";

// All feature-specific API modules use this client so URL and credential behavior stay consistent.
export const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});
