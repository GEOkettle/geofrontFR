export interface AuthFile {
  id: number
}

export enum AuthRoleEnum {
  superAdmin = 0,
  admin = 1,
  user = 2,
  parent = 3,
  academy = 4,
}

export interface AuthRole {
  id: number
  name?: string | null
}

export enum AuthStatusEnum {
  active = 1,
  inactive = 2,
}

export interface AuthStatus {
  id: number | string
  name?: string | null
}

export interface AuthUser {
  uid: string
  email: string | null
  provider?: string
  socialId?: string | null
  nickname: string | null
  ph?: string | null
  regionCode?: string | null
  addr?: string | null
  zipCode?: string | null
  lat?: string | null
  lng?: string | null
  photo?: AuthFile | null
  role?: AuthRole | null
  status?: AuthStatus | null
}

export interface SigninRequest {
  email: string
  password: string
}

// External API auth token response.
export interface AuthTokenResponse {
  token: string
  refreshToken: string
  tokenExpires: number
  tokenType: string
  // user?: AuthUser
}
