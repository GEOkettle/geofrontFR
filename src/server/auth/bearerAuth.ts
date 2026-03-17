import type {
  AuthTokenResponse,
  AuthUser,
} from '#/features/auth/api/types/authTypes'
import { createServerApiClient } from '#/server/api/createServerApiClient'
import {
  clearAuthSession,
  createAuthSession,
  getAuthSession,
  getAuthSessionId,
  updateAuthSession,
} from '#/server/auth/sessionStore'
import type { BearerAuthSession } from '#/server/auth/sessionStore'
import { normalizeApiError } from '#/shared/api/normalizeApiError'
import type { AppApiError } from '#/shared/api/types'

function createUnauthorizedError(message = 'Unauthorized'): AppApiError {
  return {
    code: 'api_error',
    message,
    status: 401,
  }
}

function getAuthorizationHeader(session: BearerAuthSession) {
  return `${session.tokenType || 'Bearer'} ${session.accessToken}`
}

function assertValidSigninResponse(response: AuthTokenResponse) {
  if (!response.token || !response.refreshToken) {
    throw createUnauthorizedError('Missing bearer tokens in auth response.')
  }
}

async function requestCurrentUser(session: BearerAuthSession) {
  const apiClient = createServerApiClient({
    headers: {
      Authorization: getAuthorizationHeader(session),
    },
  })

  const response = await apiClient.get<AuthUser>('/auth/me')
  return response.data
}

export async function signinWithBearerSession(email: string, password: string) {
  const apiClient = createServerApiClient()
  const response = await apiClient.post<AuthTokenResponse>(
    '/auth/mo/email/login',
    {
      email,
      password,
    },
  )

  assertValidSigninResponse(response.data)

  await createAuthSession({
    accessToken: response.data.token,
    refreshToken: response.data.refreshToken,
    tokenExpires: response.data.tokenExpires,
    tokenType: response.data.tokenType,
  })

  return
}

export async function refreshBearerSession() {
  const sessionId = getAuthSessionId()

  if (!sessionId) {
    throw createUnauthorizedError()
  }

  const session = await getAuthSession(sessionId)

  if (!session) {
    await clearAuthSession(sessionId)
    throw createUnauthorizedError()
  }

  const apiClient = createServerApiClient({
    headers: {
      'x-refresh-token': session.refreshToken,
    },
  })

  const response = await apiClient.post<AuthTokenResponse>('/auth/mo/refresh')

  if (!response.data.token) {
    await clearAuthSession(sessionId)
    throw createUnauthorizedError('Missing refreshed access token.')
  }

  const nextSession: BearerAuthSession = {
    accessToken: response.data.token,
    refreshToken: response.data.refreshToken,
    tokenExpires: response.data.tokenExpires,
    tokenType: response.data.tokenType,
  }

  await updateAuthSession(sessionId, nextSession)

  return
}

export async function getCurrentUserFromBearerSession(): Promise<AuthUser | null> {
  const sessionId = getAuthSessionId()

  if (!sessionId) {
    return null
  }

  const session = await getAuthSession(sessionId)

  if (!session) {
    await clearAuthSession(sessionId)
    return null
  }

  try {
    return await requestCurrentUser(session)
  } catch (error) {
    const apiError = normalizeApiError(error)

    if (apiError.status !== 401) {
      throw error
    }
  }

  try {
    await refreshBearerSession()
  } catch {
    await clearAuthSession(sessionId)
    return null
  }

  const refreshedSession = await getAuthSession(sessionId)

  if (!refreshedSession) {
    return null
  }

  try {
    return await requestCurrentUser(refreshedSession)
  } catch (error) {
    const apiError = normalizeApiError(error)

    if (apiError.status === 401) {
      await clearAuthSession(sessionId)
      return null
    }

    throw error
  }
}

export async function signoutBearerSession() {
  const sessionId = getAuthSessionId()
  const session = sessionId ? await getAuthSession(sessionId) : null

  if (session) {
    const apiClient = createServerApiClient({
      headers: {
        Authorization: getAuthorizationHeader(session),
        'x-refresh-token': session.refreshToken,
      },
    })

    try {
      await apiClient.post('/auth/logout')
    } catch (error) {
      const apiError = normalizeApiError(error)

      if (apiError.status !== 401 && apiError.status !== 403) {
        await clearAuthSession(sessionId)
        return
      }
    }
  }

  await clearAuthSession(sessionId)

  return
}
