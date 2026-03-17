import axios from 'axios'

import { publicEnv } from '#/app/config/public-env'
import { useAuthCredentialStore } from '#/features/auth/store/authCredentialStore'
import {
  isBearerAuthMode,
  isCookieAuthMode,
} from '#/features/auth/utils/authMode'
import { normalizeApiError } from '#/shared/api/normalizeApiError'

export const axiosInstance = axios.create({
  baseURL: publicEnv.VITE_API_BASE_URL || undefined,
  withCredentials: isCookieAuthMode(),
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use((config) => {
  if (isBearerAuthMode()) {
    const accessToken = useAuthCredentialStore.getState().accessToken
    const tokenType = useAuthCredentialStore.getState().tokenType || 'Bearer'

    if (accessToken) {
      config.headers.set('Authorization', `${tokenType} ${accessToken}`)
    }
  }

  if (import.meta.env.DEV) {
    // console.info('[shared/api] request', {
    //   method: config.method,
    //   baseURL: config.baseURL,
    //   url: config.url,
    //   params: config.params,
    //   data: config.data,
    // })
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
