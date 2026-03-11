import { createFileRoute } from '@tanstack/react-router'

import Plans from '#/features/seed/pages/settings/Plans'

export const Route = createFileRoute('/_app/settings/plans')({
  component: Plans,
})
