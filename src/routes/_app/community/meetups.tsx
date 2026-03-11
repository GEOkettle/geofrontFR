import { createFileRoute } from '@tanstack/react-router'

import Meetups from '#/features/seed/pages/community/Meetups'

export const Route = createFileRoute('/_app/community/meetups')({
  component: Meetups,
})
