import { createFileRoute } from '@tanstack/react-router'

import Dashboard from '#/features/seed/pages/Dashboard'

export const Route = createFileRoute('/_app/')({
  component: Dashboard,
})
