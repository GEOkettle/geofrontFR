import { createFileRoute } from '@tanstack/react-router'
import { TanStackQueryPage } from '#/features/demo/components/TanStackQueryPage'

export const Route = createFileRoute('/demo/tanstack-query')({
  component: TanStackQueryPage,
})
