import { createFileRoute } from '@tanstack/react-router'

import Billing from '#/features/seed/pages/settings/Billing'

export const Route = createFileRoute('/_app/settings/billing')({
  component: Billing,
})
