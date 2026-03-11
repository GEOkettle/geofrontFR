import { createFileRoute } from '@tanstack/react-router'

import Inbox from '#/features/seed/pages/Inbox'

export const Route = createFileRoute('/_app/inbox')({
  component: Inbox,
})
