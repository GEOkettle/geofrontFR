import { apiClient } from '#/shared/api/apiClient'

import type {
  AuthUser,
  SigninRequest,
} from '#/features/auth/api/types/authTypes'
import { isBearerAuthMode } from '#/features/auth/utils/authMode'

export async function getCurrentUser() {
  if (isBearerAuthMode()) {
    const { bffGetCurrentUser } = await import('#/features/auth/api/authBff')

    return bffGetCurrentUser()
  }

  return apiClient.get<AuthUser>('/auth/me')
}

export async function signin(input: SigninRequest): Promise<void> {
  if (isBearerAuthMode()) {
    const { bffSignin } = await import('#/features/auth/api/authBff')

    return bffSignin({ data: input })
  }

  await apiClient.post('/auth/email/login', input)
}

export async function signout() {
  if (isBearerAuthMode()) {
    const { bffSignout } = await import('#/features/auth/api/authBff')

    return bffSignout()
  }

  return apiClient.post<void>('/auth/logout')
}

export async function refresh(): Promise<void> {
  if (isBearerAuthMode()) {
    const { bffRefresh } = await import('#/features/auth/api/authBff')

    return bffRefresh()
  }

  await apiClient.post('/auth/refresh')
}
