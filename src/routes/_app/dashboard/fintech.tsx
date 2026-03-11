import { createFileRoute } from '@tanstack/react-router'

import Fintech from '#/features/seed/pages/Fintech'

export const Route = createFileRoute('/_app/dashboard/fintech')({
  component: Fintech,
})
