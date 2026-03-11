import { createFileRoute } from '@tanstack/react-router'

import UsersTabs from '#/features/seed/pages/community/UsersTabs'

export const Route = createFileRoute('/_app/community/users-tabs')({
  component: UsersTabs,
})
