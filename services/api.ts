import axios, { AxiosRequestConfig } from "axios";

const BASE_URL = `/api`;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});



export const api = {
  get: <T>(endpoint: string, config?: AxiosRequestConfig) =>
    axiosInstance.get<T>(endpoint, config).then((res: any) => res.data),

  post: <T>(endpoint: string, data: any, config?: AxiosRequestConfig) =>
    axiosInstance.post<T>(endpoint, data, config).then((res: any) => res.data),

  put: <T>(endpoint: string, data: any, config?: AxiosRequestConfig) =>
    axiosInstance.put<T>(endpoint, data, config).then((res: any) => res.data),

  patch: <T>(endpoint: string, data: any, config?: AxiosRequestConfig) =>
    axiosInstance.patch<T>(endpoint, data, config).then((res: any) => res.data),

  delete: <T>(endpoint: string, config?: AxiosRequestConfig) =>
    axiosInstance.delete<T>(endpoint, config).then((res: any) => res.data),
};
