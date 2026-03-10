export interface AppApiError {
  code: string
  message: string
  status?: number
  details?: unknown
  fieldErrors?: Record<string, string>
}
