import type { QueryClient } from '@tanstack/react-query'

import type { AuthUser } from '#/features/auth/api/types/authTypes'
import { meQueryOptions } from '#/features/auth/hooks/authQueries'
import type { AppApiError } from '#/shared/api/types'

export async function ensureCurrentUser(
  queryClient: QueryClient,
): Promise<AuthUser | null> {
  const cachedUser = queryClient.getQueryData<AuthUser>(
    meQueryOptions().queryKey,
  )

  if (cachedUser) {
    return cachedUser
  }

  try {
    return await queryClient.fetchQuery(meQueryOptions())
  } catch (error) {
    const apiError = error as AppApiError

    if (apiError.status === 401) {
      queryClient.removeQueries({
        queryKey: meQueryOptions().queryKey,
      })

      return null
    }

    throw error
  }
}
