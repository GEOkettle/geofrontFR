import axios from 'axios'

import { serverEnv } from '#/server/config/env'

type CreateServerApiClientOptions = {
  cookieHeader?: string
  headers?: Record<string, string>
}

export function createServerApiClient(options?: CreateServerApiClientOptions) {
  return axios.create({
    baseURL: serverEnv.API_BASE_URL || undefined,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.cookieHeader ? { cookie: options.cookieHeader } : {}),
      ...(options?.headers ?? {}),
    },
    withCredentials: true,
    // TODO: 서버 호출이 늘어나면 interceptor와 공통 에러 정규화를 추가한다.
  })
}
