import { queryOptions } from '@tanstack/react-query'

import { getCurrentUser } from '#/features/auth/api/authApi'

export const authQueryKeys = {
  me: ['auth', 'me'] as const,
}

export function meQueryOptions() {
  return queryOptions({
    queryKey: authQueryKeys.me,
    queryFn: getCurrentUser,
    retry: false,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  })
}
