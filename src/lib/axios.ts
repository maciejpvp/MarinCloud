import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://3ro86jk312.execute-api.eu-central-1.amazonaws.com/prod",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("idToken");

  if (token) {
    config.headers.Authorization = `${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("idToken");
      window.location.href = "/login"; // Redirect to login page
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
