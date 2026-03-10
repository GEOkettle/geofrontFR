import axios from 'axios'

import { publicEnv } from '#/app/config/public-env'
import { normalizeApiError } from '#/shared/api/normalizeApiError'

export const axiosInstance = axios.create({
  baseURL: publicEnv.VITE_API_BASE_URL || undefined,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use((config) => {
  if (import.meta.env.DEV) {
    console.info('[shared/api] request', {
      method: config.method,
      baseURL: config.baseURL,
      url: config.url,
      params: config.params,
      data: config.data,
    })
  }

  return config
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const normalizedError = normalizeApiError(error)

    if (import.meta.env.DEV) {
      console.error('[shared/api] raw request error', error)
      console.error('[shared/api] normalized request error', normalizedError)
    }

    return Promise.reject(normalizedError)
  },
)
