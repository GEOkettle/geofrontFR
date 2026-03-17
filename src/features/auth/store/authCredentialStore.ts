import { create } from 'zustand'

// for bearer mode
interface AuthCredentialState {
  accessToken: string | null
  tokenExpires: number | null
  tokenType: string | null
  setCredentials: (input: {
    accessToken: string
    tokenExpires: number | null
    tokenType: string | null
  }) => void
  clearCredentials: () => void
}

export const useAuthCredentialStore = create<AuthCredentialState>((set) => ({
  accessToken: null,
  tokenExpires: null,
  tokenType: null,
  setCredentials: ({ accessToken, tokenExpires, tokenType }) =>
    set({
      accessToken,
      tokenExpires,
      tokenType,
    }),
  clearCredentials: () =>
    set({
      accessToken: null,
      tokenExpires: null,
      tokenType: null,
    }),
}))
