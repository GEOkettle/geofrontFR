import axios from 'axios'
import type {AxiosInstance, AxiosRequestConfig} from 'axios';

import { normalizeApiError } from '#/shared/api/normalizeApiError'

export function createBaseApiClient(
  config?: AxiosRequestConfig,
): AxiosInstance {
  return axios.create(config)
}

export function attachApiErrorInterceptor(
  client: AxiosInstance,
): AxiosInstance {
  client.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(normalizeApiError(error)),
  )

  return client
}
