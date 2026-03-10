import axios from 'axios'

import type { AppApiError } from '#/shared/api/types'

export function normalizeApiError(error: unknown): AppApiError {
  // HTTP response failures, network issues, timeouts, and other axios-level errors.
  if (axios.isAxiosError(error)) {
    const responseData = error.response?.data as
      | {
          message?: string
          code?: string
          details?: unknown
          fieldErrors?: Record<string, string>
        }
      | undefined

    return {
      code: responseData?.code || 'api_error',
      message:
        responseData?.message ||
        error.message ||
        'An unexpected API error occurred.',
      status: error.response?.status,
      details: responseData?.details,
      fieldErrors: responseData?.fieldErrors,
    }
  }

  // Non-axios runtime errors thrown from client code or response handling.
  if (error instanceof Error) {
    return {
      code: 'unknown_error',
      message: error.message,
    }
  }

  // Final fallback for non-Error throw values.
  return {
    code: 'unknown_error',
    message: 'An unknown error occurred.',
    details: error,
  }
}
