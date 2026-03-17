import { describe, expect, it } from 'vitest'

import { normalizeApiError } from '#/shared/api/normalizeApiError'

describe('normalizeApiError', () => {
  it('normalizes axios-style response errors', () => {
    const error = {
      isAxiosError: true,
      message: 'Request failed with status code 401',
      response: {
        status: 401,
        data: {
          code: 'unauthorized',
          message: 'Unauthorized',
          details: { reason: 'missing_cookie' },
          fieldErrors: {
            email: 'Email is required.',
          },
        },
      },
    }

    expect(normalizeApiError(error)).toEqual({
      code: 'unauthorized',
      message: 'Unauthorized',
      status: 401,
      details: { reason: 'missing_cookie' },
      fieldErrors: {
        email: 'Email is required.',
      },
    })
  })

  it('falls back to axios error message for network failures', () => {
    const error = {
      isAxiosError: true,
      message: 'Network Error',
      response: undefined,
    }

    expect(normalizeApiError(error)).toEqual({
      code: 'api_error',
      message: 'Network Error',
      status: undefined,
      details: undefined,
      fieldErrors: undefined,
    })
  })

  it('normalizes generic runtime errors', () => {
    const error = new Error('Something unexpected happened')

    expect(normalizeApiError(error)).toEqual({
      code: 'unknown_error',
      message: 'Something unexpected happened',
    })
  })
})
