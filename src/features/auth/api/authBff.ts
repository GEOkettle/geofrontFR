import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

import type { AuthUser } from '#/features/auth/api/types/authTypes'

const signinInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export const bffSignin = createServerFn({ method: 'POST' })
  .inputValidator(signinInputSchema)
  .handler(async ({ data }): Promise<void> => {
    const { signinWithBearerSession } = await import('#/server/auth/bearerAuth')

    return signinWithBearerSession(data.email, data.password)
  })

export const bffSignout = createServerFn({ method: 'POST' }).handler(
  async (): Promise<void> => {
    const { signoutBearerSession } = await import('#/server/auth/bearerAuth')

    return signoutBearerSession()
  },
)

export const bffRefresh = createServerFn({ method: 'POST' }).handler(
  async (): Promise<void> => {
    const { refreshBearerSession } = await import('#/server/auth/bearerAuth')

    return refreshBearerSession()
  },
)

export const bffGetCurrentUser = createServerFn({ method: 'GET' }).handler(
  async (): Promise<AuthUser> => {
    const { getCurrentUserFromBearerSession } =
      await import('#/server/auth/bearerAuth')

    const user = await getCurrentUserFromBearerSession()

    if (!user) {
      throw {
        code: 'api_error',
        message: 'Unauthorized',
        status: 401,
      }
    }

    return user
  },
)
