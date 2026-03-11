import { createFileRoute } from '@tanstack/react-router'

import Feedback from '#/features/seed/pages/settings/Feedback'

export const Route = createFileRoute('/_app/settings/feedback')({
  component: Feedback,
})
