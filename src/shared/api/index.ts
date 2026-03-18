export { apiClient } from '#/shared/api/apiClient'
export {
  attachApiErrorInterceptor,
  createBaseApiClient,
} from '#/shared/api/axiosUtils'
export { axiosInstance } from '#/shared/api/axiosInstance'
export { isAxiosLikeError } from '#/shared/api/isAxiosLikeError'
export { normalizeApiError } from '#/shared/api/normalizeApiError'
export type { AppApiError } from '#/shared/api/types'
