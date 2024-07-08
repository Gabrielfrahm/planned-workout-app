import { MMKVStorage } from "@/store/mmkv.store";
import axios, { AxiosError } from "axios";
import { err } from "react-native-svg";

console.log(process.env.EXPO_PUBLIC_API_URL);
const api = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_API_URL}`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptador para adicionar token de autenticação a cada requisição
api.interceptors.request.use((config) => {
  const token = MMKVStorage.getString("auth");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptador para tratar erros de resposta
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error instanceof AxiosError) {
      if (error.response?.status === 500) {
        Promise.reject(new Error("Server Error"));
      }
    }
    if (error.response) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  },
);

export default api;
