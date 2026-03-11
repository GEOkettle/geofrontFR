import { createFileRoute } from '@tanstack/react-router'

import Calendar from '#/features/seed/pages/Calendar'

export const Route = createFileRoute('/_app/calendar')({
  component: Calendar,
})
