import { Button } from '#/components/ui/Button'
import NetworkErrorPage from '#/components/common/NetworkErrorPage'
import { normalizeApiError } from '#/shared/api/normalizeApiError'

type RootErrorPageProps = {
  error: unknown
  reset?: () => void
}

function isNetworkLikeError(error: unknown) {
  const apiError = normalizeApiError(error)

  return (
    apiError.status == null &&
    /network error|failed to fetch|load failed/i.test(apiError.message)
  )
}

export default function RootErrorPage({ error, reset }: RootErrorPageProps) {
  if (isNetworkLikeError(error)) {
    return <NetworkErrorPage error={error} reset={reset} />
  }

  const apiError = normalizeApiError(error)

  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-950">
      <section className="w-full max-w-xl rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gray-500 dark:text-gray-400">
          Application Error
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-gray-900 dark:text-gray-50">
          Something went wrong.
        </h1>
        <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
          {apiError.message ||
            'An unexpected error occurred while rendering this route.'}
        </p>
        {reset ? (
          <div className="mt-8">
            <Button type="button" onClick={reset}>
              Try Again
            </Button>
          </div>
        ) : null}
      </section>
    </main>
  )
}
