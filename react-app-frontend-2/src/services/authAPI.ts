import axios from "axios";
import type {
  LoginCredentials,
  RegisterCredentials,
} from "../types";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const authApi = {
  login: (credentials: LoginCredentials) =>
    api.post("/user/signin", credentials),

  register: (credentials: RegisterCredentials) =>
    api.post("/user/signup", credentials),

  logout: () =>   
    api.post("/user/logout"),

  // getCurrentUser: () => 
  //   api.get("/user/me"),
    
  forgotPassword: (email: string) =>
    api.post("/user/forgot-password", { email }),

  resetPassword: (token: string, newPassword: string) =>
    api.post(`/user/reset-password/${token}`, { newPassword }),

  refreshSession: () =>
    api.post("/refresh-session"),

  getCurrentUser: () => api.get('/user/getCurrentUser'),
};