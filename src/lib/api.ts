import { MMKVStorage } from "@/store/mmkv.store";
import axios from "axios";

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
    console.log(error);
    // if (error.response.status === 401) {
    //   return error;
    // }
    return Promise.reject(error);
  },
);

export default api;
