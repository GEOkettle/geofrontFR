import { createFileRoute, redirect } from '@tanstack/react-router'

import { normalizeApiError } from '#/shared/api/normalizeApiError'
import { ensureCurrentUser } from '#/features/auth/utils/ensureCurrentUser'
import Signup from '#/features/seed/pages/Signup'

function SignupRouteError({ error }: { error: unknown }) {
  const apiError = normalizeApiError(error)

  return (
    <Signup
      initialNetworkError={
        apiError.message || 'Unable to reach the authentication server.'
      }
    />
  )
}

export const Route = createFileRoute('/signup')({
  ssr: false,
  beforeLoad: async ({ context }) => {
    const user = await ensureCurrentUser(context.queryClient)

    if (user) {
      throw redirect({ to: '/' })
    }
  },
  errorComponent: SignupRouteError,
  component: Signup,
})
