import { createServerOnlyFn } from '@tanstack/react-start'
import { redirect } from '@tanstack/react-router'

export const requireUser = createServerOnlyFn(async () => {
  const { getRequestCurrentUser } =
    await import('#/server/auth/getRequestCurrentUser')
  const user = await getRequestCurrentUser()

  if (!user) {
    throw redirect({ to: '/signin' })
  }

  return user
})
