import { createFileRoute } from '@tanstack/react-router'

import UsersTiles from '#/features/seed/pages/community/UsersTiles'

export const Route = createFileRoute('/_app/community/users-tiles')({
  component: UsersTiles,
})
