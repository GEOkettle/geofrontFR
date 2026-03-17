import { publicEnv } from '#/app/config/public-env'

export function isBearerAuthMode() {
  return publicEnv.VITE_AUTH_MODE === 'bearer'
}

export function isCookieAuthMode() {
  return publicEnv.VITE_AUTH_MODE === 'cookie'
}
