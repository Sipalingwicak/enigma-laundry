import axios from "axios";
import { redirect } from "react-router";
import { toast } from "sonner";
import { redirectToLogin } from "../utils/authRedirect";

// Base URL tanpa slash awal, endpoint akan di-append pada pemanggilan (misal: '/users')
const API_BASE_URL = "/api/v1";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Set default header Authorization dengan Bearer token jika tersedia di localStorage
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Jika token tidak valid atau expired, hapus token dari localStorage
      localStorage.removeItem("token");
      toast.error("Session expired, please login again");
      // Redirect ke halaman login atau lakukan tindakan lain sesuai kebutuhan
      redirectToLogin();
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
