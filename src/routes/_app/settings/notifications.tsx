import { createFileRoute } from '@tanstack/react-router'

import Notifications from '#/features/seed/pages/settings/Notifications'

export const Route = createFileRoute('/_app/settings/notifications')({
  component: Notifications,
})
