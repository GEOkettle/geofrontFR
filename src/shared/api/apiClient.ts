import type { AxiosRequestConfig } from 'axios'

import { axiosInstance } from '#/shared/api/axiosInstance'

export const apiClient = {
  async get<TResponse>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<TResponse> {
    const response = await axiosInstance.get<TResponse>(url, config)
    return response.data
  },

  async post<TResponse, TRequest = unknown>(
    url: string,
    data?: TRequest,
    config?: AxiosRequestConfig<TRequest>,
  ): Promise<TResponse> {
    const response = await axiosInstance.post<TResponse>(url, data, config)
    return response.data
  },

  async patch<TResponse, TRequest = unknown>(
    url: string,
    data?: TRequest,
    config?: AxiosRequestConfig<TRequest>,
  ): Promise<TResponse> {
    const response = await axiosInstance.patch<TResponse>(url, data, config)
    return response.data
  },

  async put<TResponse, TRequest = unknown>(
    url: string,
    data?: TRequest,
    config?: AxiosRequestConfig<TRequest>,
  ): Promise<TResponse> {
    const response = await axiosInstance.put<TResponse>(url, data, config)
    return response.data
  },

  async delete<TResponse>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<TResponse> {
    const response = await axiosInstance.delete<TResponse>(url, config)
    return response.data
  },
}
