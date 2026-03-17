import { QueryClient } from '@tanstack/react-query'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import type { AuthUser } from '#/features/auth/api/types/authTypes'
import { ensureCurrentUser } from '#/features/auth/utils/ensureCurrentUser'

const meQueryKey = ['auth', 'me'] as const
const mockQueryFn = vi.fn()

vi.mock('#/features/auth/hooks/authQueries', () => ({
  meQueryOptions: () => ({
    queryKey: meQueryKey,
    queryFn: mockQueryFn,
  }),
}))

describe('ensureCurrentUser', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = new QueryClient()
    mockQueryFn.mockReset()
  })

  it('returns the cached user without fetching again', async () => {
    const cachedUser: AuthUser = {
      uid: 'cached-user',
      email: 'cached@example.com',
      nickname: 'Cached User',
    }

    queryClient.setQueryData(meQueryKey, cachedUser)

    const result = await ensureCurrentUser(queryClient)

    expect(result).toEqual(cachedUser)
    expect(mockQueryFn).not.toHaveBeenCalled()
  })

  it('returns null when the auth query resolves with 401', async () => {
    mockQueryFn.mockRejectedValue({
      code: 'api_error',
      message: 'Unauthorized',
      status: 401,
    })

    const result = await ensureCurrentUser(queryClient)

    expect(result).toBeNull()
    expect(queryClient.getQueryData(meQueryKey)).toBeUndefined()
  })

  it('rethrows non-auth errors', async () => {
    const apiError = {
      code: 'api_error',
      message: 'Server exploded',
      status: 500,
    }

    mockQueryFn.mockRejectedValue(apiError)

    await expect(ensureCurrentUser(queryClient)).rejects.toBe(apiError)
  })
})
