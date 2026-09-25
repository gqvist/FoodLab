import axios from "axios";

import { API_URL } from "../auth/config.js";

export const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});
