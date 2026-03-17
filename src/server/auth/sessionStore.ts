import {
  deleteCookie,
  getCookie,
  setCookie,
} from '@tanstack/react-start/server'
import { z } from 'zod'

import { serverEnv } from '#/server/config/env'
import { getRedisClient } from '#/server/lib/redis'

type BearerAuthSession = {
  accessToken: string
  refreshToken: string
  tokenExpires: number | null
  tokenType: string
}

const sessionCookie = serverEnv.AUTH_SESSION_COOKIE_NAME || 'gf_auth_session'
const sessionTtlSeconds = serverEnv.AUTH_SESSION_TTL_SECONDS
const redisKeyPrefix = `${serverEnv.REDIS_KEY_PREFIX}:auth-session`

const bearerAuthSessionSchema = z.object({
  accessToken: z.string().min(1),
  refreshToken: z.string().min(1),
  tokenExpires: z.number().nullable(),
  tokenType: z.string().min(1),
})

function getCookieOptions(maxAge?: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    ...(typeof maxAge === 'number' ? { maxAge } : {}),
  }
}

function getSessionKey(sessionId: string) {
  return `${redisKeyPrefix}:${sessionId}`
}

function serializeSession(session: BearerAuthSession) {
  return JSON.stringify(session)
}

function parseSession(rawSession: string): BearerAuthSession | null {
  try {
    return bearerAuthSessionSchema.parse(JSON.parse(rawSession))
  } catch {
    return null
  }
}

export async function createAuthSession(session: BearerAuthSession) {
  const sessionId = crypto.randomUUID()
  const redisClient = await getRedisClient()

  await redisClient.set(getSessionKey(sessionId), serializeSession(session), {
    EX: sessionTtlSeconds,
  })
  setCookie(sessionCookie, sessionId, getCookieOptions(sessionTtlSeconds))

  return sessionId
}

export function getAuthSessionId() {
  return getCookie(sessionCookie)
}

export async function getAuthSession(sessionId: string) {
  const redisClient = await getRedisClient()
  const rawSession = await redisClient.get(getSessionKey(sessionId))

  if (!rawSession) {
    return null
  }

  const session = parseSession(rawSession)

  if (session) {
    return session
  }

  await redisClient.del(getSessionKey(sessionId))
  return null
}

export async function updateAuthSession(
  sessionId: string,
  session: BearerAuthSession,
) {
  const redisClient = await getRedisClient()

  await redisClient.set(getSessionKey(sessionId), serializeSession(session), {
    EX: sessionTtlSeconds,
  })
  setCookie(sessionCookie, sessionId, getCookieOptions(sessionTtlSeconds))
}

export async function clearAuthSession(sessionId?: string | null) {
  if (sessionId) {
    const redisClient = await getRedisClient()
    await redisClient.del(getSessionKey(sessionId))
  }

  deleteCookie(sessionCookie, getCookieOptions())
}

export type { BearerAuthSession }
