import { getRequestHeader } from '@tanstack/react-start/server'

import type { AuthUser } from '#/features/auth/api/types/authTypes'
import { isBearerAuthMode } from '#/features/auth/utils/authMode'
import { createServerApiClient } from '#/server/api/createServerApiClient'
import { normalizeApiError } from '#/shared/api/normalizeApiError'
import type { AppApiError } from '#/shared/api/types'

export async function getRequestCurrentUser(): Promise<AuthUser | null> {
  if (isBearerAuthMode()) {
    const { getCurrentUserFromBearerSession } =
      await import('#/server/auth/bearerAuth')

    return getCurrentUserFromBearerSession()
  }

  const cookieHeader = getRequestHeader('cookie')
  const apiClient = createServerApiClient({ cookieHeader })

  try {
    const response = await apiClient.get<AuthUser>('/auth/me')
    return response.data
  } catch (error) {
    const apiError: AppApiError = normalizeApiError(error)

    if (apiError.status === 401) {
      return null
    }

    throw error
  }
}
