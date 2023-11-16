import axios, { AxiosError } from "axios";
import { refresh } from "./services/auth-service";

export const api = axios.create({
  baseURL: "http://localhost:5033/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem("refresh");

      if (refreshToken) {
        const tokens = await refresh(refreshToken);
        localStorage.setItem("token", tokens.accessToken);
        localStorage.setItem("refresh", tokens.refreshToken);
      }
    }
    throw error;
  }
);
