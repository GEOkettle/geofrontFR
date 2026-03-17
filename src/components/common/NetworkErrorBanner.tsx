import { Button } from '#/components/ui/Button'

type NetworkErrorBannerProps = {
  message?: string
  onRetry?: () => void
}

export default function NetworkErrorBanner({
  message = 'Unable to reach the authentication server. Please try again in a moment.',
  onRetry,
}: NetworkErrorBannerProps) {
  return (
    <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 shadow-xs dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-100">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200">
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-4"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M18 10A8 8 0 114.94 3.94 8 8 0 0118 10zm-8-4a1 1 0 00-1 1v3a1 1 0 102 0V7a1 1 0 00-1-1zm0 8.25a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold">Network issue detected</p>
          <p className="mt-1 text-amber-800/90 dark:text-amber-100/85">
            {message}
          </p>
          {onRetry ? (
            <div className="mt-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="border-amber-300 bg-white/80 text-amber-900 hover:bg-amber-100 dark:border-amber-400/30 dark:bg-amber-500/10 dark:text-amber-100 dark:hover:bg-amber-500/20"
                onClick={onRetry}
              >
                Try Again
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
