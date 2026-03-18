import { publicEnv } from '#/app/config/public-env'
import { useAuthCredentialStore } from '#/features/auth/store/authCredentialStore'
import {
  isBearerAuthMode,
  isCookieAuthMode,
} from '#/features/auth/utils/authMode'
import {
  attachApiErrorInterceptor,
  createBaseApiClient,
} from '#/shared/api/axiosUtils'

export const axiosInstance = attachApiErrorInterceptor(
  createBaseApiClient({
    baseURL: publicEnv.VITE_API_BASE_URL || undefined,
    withCredentials: isCookieAuthMode(),
    headers: {
      'Content-Type': 'application/json',
    },
  }),
)

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
