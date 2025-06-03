import axios from "axios";

import { useAuthStore } from "@/store/authStore";

const axiosInstance = axios.create({
  baseURL: "https://3ro86jk312.execute-api.eu-central-1.amazonaws.com/prod",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const idToken = useAuthStore.getState().idToken;

  if (idToken) {
    config.headers.Authorization = `${idToken}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // window.location.href = "/login"; // Redirect to login page
      const login = useAuthStore.getState().login;

      login();
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
