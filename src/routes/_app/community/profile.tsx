import { createFileRoute } from '@tanstack/react-router'

import Profile from '#/features/seed/pages/community/Profile'

export const Route = createFileRoute('/_app/community/profile')({
  component: Profile,
})
