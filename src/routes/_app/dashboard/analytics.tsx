import { createFileRoute } from '@tanstack/react-router'

import Analytics from '#/features/seed/pages/Analytics'

export const Route = createFileRoute('/_app/dashboard/analytics')({
  component: Analytics,
})
