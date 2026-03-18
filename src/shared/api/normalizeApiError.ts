import axios from 'axios'

import { isAxiosLikeError } from '#/shared/api/isAxiosLikeError'
import type { AppApiError } from '#/shared/api/types'

const NETWORK_ERROR_MESSAGE_PATTERN =
  /network error|failed to fetch|load failed|econnrefused|econnreset|enotfound|etimedout|socket hang up|timeout/i

function isNetworkLikeMessage(message?: string) {
  return Boolean(message && NETWORK_ERROR_MESSAGE_PATTERN.test(message))
}

function isAppApiError(error: unknown): error is AppApiError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    'message' in error &&
    typeof (error as AppApiError).code === 'string' &&
    typeof (error as AppApiError).message === 'string'
  )
}

export function normalizeApiError(error: unknown): AppApiError {
  if (isAppApiError(error)) {
    return error
  }

  // HTTP response failures, network issues, timeouts, and other axios-level errors.
  if (axios.isAxiosError(error) || isAxiosLikeError(error)) {
    const responseData = error.response?.data as
      | {
          message?: string
          code?: string
          details?: unknown
          fieldErrors?: Record<string, string>
        }
      | undefined

    if (!error.response && isNetworkLikeMessage(error.message)) {
      return {
        code: 'network_error',
        message: error.message || 'A network error occurred.',
        status: undefined,
        details: responseData?.details,
        fieldErrors: responseData?.fieldErrors,
      }
    }

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
    if (isNetworkLikeMessage(error.message)) {
      return {
        code: 'network_error',
        message: error.message,
      }
    }

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
