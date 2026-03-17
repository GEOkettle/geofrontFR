import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { refresh, signin, signout } from '#/features/auth/api/authApi'
import type { SigninRequest } from '#/features/auth/api/types/authTypes'
import {
  authQueryKeys,
  meQueryOptions,
} from '#/features/auth/hooks/authQueries'
import { useAuthCredentialStore } from '#/features/auth/store/authCredentialStore'
import { removeRefreshTokenFromSessionStorage } from '#/features/auth/utils/authSessionStorage'

export function useCurrentUserQuery() {
  return useQuery(meQueryOptions())
}

export function useSigninMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: SigninRequest) => signin(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: authQueryKeys.me,
      })
    },
  })
}

export function useSignoutMutation() {
  const queryClient = useQueryClient()
  const clearCredentials = useAuthCredentialStore(
    (state) => state.clearCredentials,
  )

  return useMutation({
    mutationFn: signout,
    onSuccess: async () => {
      clearCredentials()
      removeRefreshTokenFromSessionStorage()
      queryClient.removeQueries({
        queryKey: authQueryKeys.me,
      })
    },
  })
}

export function useRefreshMutation() {
  const queryClient = useQueryClient()
  const clearCredentials = useAuthCredentialStore(
    (state) => state.clearCredentials,
  )

  return useMutation({
    mutationFn: refresh,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: authQueryKeys.me,
      })
    },
    onError: () => {
      clearCredentials()
      removeRefreshTokenFromSessionStorage()
    },
  })
}
