import { createFileRoute } from '@tanstack/react-router'

import Messages from '#/features/seed/pages/Messages'

export const Route = createFileRoute('/_app/messages')({
  component: Messages,
})
