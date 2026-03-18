type AxiosLikeError = {
  isAxiosError?: boolean
  message?: string
  response?: {
    status?: number
    data?: unknown
  }
}

export function isAxiosLikeError(error: unknown): error is AxiosLikeError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'isAxiosError' in error &&
    (error as AxiosLikeError).isAxiosError === true
  )
}
