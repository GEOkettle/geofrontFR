import { createFileRoute, redirect } from '@tanstack/react-router'

import { normalizeApiError } from '#/shared/api/normalizeApiError'
import { ensureCurrentUser } from '#/features/auth/utils/ensureCurrentUser'
import Signin from '#/features/seed/pages/Signin'

function SigninRouteError({ error }: { error: unknown }) {
  const apiError = normalizeApiError(error)

  return (
    <Signin
      initialNetworkError={
        apiError.message || 'Unable to reach the authentication server.'
      }
    />
  )
}

export const Route = createFileRoute('/signin')({
  ssr: false,
  beforeLoad: async ({ context }) => {
    const user = await ensureCurrentUser(context.queryClient)

    if (user) {
      throw redirect({ to: '/' })
    }
  },
  errorComponent: SigninRouteError,
  component: Signin,
})
