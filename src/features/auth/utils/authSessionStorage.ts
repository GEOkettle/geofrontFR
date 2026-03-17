const REFRESH_TOKEN_STORAGE_KEY = 'auth.refreshToken'

export function getRefreshTokenFromSessionStorage() {
  if (typeof window === 'undefined') {
    return null
  }

  return window.sessionStorage.getItem(REFRESH_TOKEN_STORAGE_KEY)
}

export function setRefreshTokenToSessionStorage(refreshToken: string) {
  if (typeof window === 'undefined') {
    return
  }

  window.sessionStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refreshToken)
}

export function removeRefreshTokenFromSessionStorage() {
  if (typeof window === 'undefined') {
    return
  }

  window.sessionStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY)
}
