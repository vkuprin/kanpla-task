// @ts-nocheck
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export type RequestConfig<TData = unknown> = AxiosRequestConfig & {
  headers?: Record<string, string>;
  signal?: AbortSignal;
  data?: TData;
};

export type ResponseConfig<TData = unknown> = {
  data: TData;
  status: number;
  headers: Record<string, string>;
  statusText: string;
  config: AxiosRequestConfig;
};

export type ResponseErrorConfig<TError = unknown> = {
  error: TError;
  response?: AxiosResponse<TError>;
};

const client = axios.create({
  baseURL: "https://kanpla-code-challenge.up.railway.app",
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use((config) => {
  const token = process.env.EXPO_PUBLIC_API_KEY;
  if (token) {
    config.headers["x-auth-user"] = token;
  }
  return config;
});

export default client;
