import { createFileRoute } from '@tanstack/react-router'

import EmptyState from '#/features/seed/pages/utility/EmptyState'

export const Route = createFileRoute('/_app/utility/empty-state')({
  component: EmptyState,
})
