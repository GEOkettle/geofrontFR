import { createFileRoute } from '@tanstack/react-router'

import Campaigns from '#/features/seed/pages/Campaigns'

export const Route = createFileRoute('/_app/campaigns')({
  component: Campaigns,
})
