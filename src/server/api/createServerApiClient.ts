import { serverEnv } from '#/server/config/env'
import {
  attachApiErrorInterceptor,
  createBaseApiClient,
} from '#/shared/api/axiosUtils'

type CreateServerApiClientOptions = {
  cookieHeader?: string
  headers?: Record<string, string>
}

export function createServerApiClient(options?: CreateServerApiClientOptions) {
  return attachApiErrorInterceptor(
    createBaseApiClient({
      baseURL: serverEnv.API_BASE_URL || undefined,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.cookieHeader ? { cookie: options.cookieHeader } : {}),
        ...(options?.headers ?? {}),
      },
      withCredentials: true,
    }),
  )
}
