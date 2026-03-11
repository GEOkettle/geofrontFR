import { createFileRoute } from '@tanstack/react-router'

import Onboarding01 from '#/features/seed/pages/Onboarding01'

export const Route = createFileRoute('/onboarding-01')({
  component: Onboarding01,
})
