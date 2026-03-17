import { Button } from '#/components/ui/Button'
import { normalizeApiError } from '#/shared/api/normalizeApiError'
import { Link } from '#/shared/lib/seed-router'

type NetworkErrorPageProps = {
  error: unknown
  reset?: () => void
}

export default function NetworkErrorPage({
  error,
  reset,
}: NetworkErrorPageProps) {
  const apiError = normalizeApiError(error)

  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-950">
      <section className="w-full max-w-xl rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-200">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="size-7"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v4m0 3h.01M4.93 19h14.14c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.2 16c-.77 1.33.19 3 1.73 3z"
            />
          </svg>
        </div>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-700 dark:text-amber-300">
          Network Error
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-gray-900 dark:text-gray-50">
          We could not reach the server.
        </h1>
        <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
          {apiError.message ||
            'The request did not reach the API server. Check the server status, local network, or CORS configuration and try again.'}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {reset ? (
            <Button type="button" onClick={reset}>
              Try Again
            </Button>
          ) : null}
          <Button variant="outline" asChild>
            <Link to="/signin">Go To Sign In</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
