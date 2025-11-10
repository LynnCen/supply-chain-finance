import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
} from 'axios';
import { API_BASE_URL } from '@/config';
import type { ApiResponse } from '@/types/common';

// 创建axios实例
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 可以在这里添加token等
    return config;
  },
  (error: unknown) => {
    return Promise.reject(error);
  }
);

// 响应拦截器 - 智能处理不同响应类型
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 如果是 blob 类型，直接返回 response.data（Blob）
    if (response.config.responseType === 'blob') {
      return response.data;
    }
    // 否则返回 ApiResponse 格式的 response.data
    return response.data;
  },
  (error: unknown) => {
    return Promise.reject(error);
  }
);

// 类型安全的 Request 接口
interface Request {
  get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>>;
  post<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>>;
  put<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>>;
  delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>>;
  patch<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>>;
  // 专门处理 Blob 下载的方法
  getBlob(url: string, config?: AxiosRequestConfig): Promise<Blob>;
}

/**
 * 创建类型安全的 request 对象
 *
 * 由于响应拦截器返回 response.data，实际返回类型与 axios 原生类型不同
 * 这里通过 unknown 中转来确保类型安全，避免 TypeScript 的类型检查错误
 */
const request: Request = {
  get: <T = unknown>(url: string, config?: AxiosRequestConfig) => {
    return axiosInstance.get(url, config) as unknown as Promise<ApiResponse<T>>;
  },
  post: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) => {
    return axiosInstance.post(url, data, config) as unknown as Promise<ApiResponse<T>>;
  },
  put: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) => {
    return axiosInstance.put(url, data, config) as unknown as Promise<ApiResponse<T>>;
  },
  delete: <T = unknown>(url: string, config?: AxiosRequestConfig) => {
    return axiosInstance.delete(url, config) as unknown as Promise<ApiResponse<T>>;
  },
  patch: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) => {
    return axiosInstance.patch(url, data, config) as unknown as Promise<ApiResponse<T>>;
  },
  getBlob: (url: string, config?: AxiosRequestConfig) => {
    return axiosInstance.get(url, { ...config, responseType: 'blob' }) as unknown as Promise<Blob>;
  },
};

export default request;
