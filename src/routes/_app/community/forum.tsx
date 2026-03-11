import { createFileRoute } from '@tanstack/react-router'

import Forum from '#/features/seed/pages/community/Forum'

export const Route = createFileRoute('/_app/community/forum')({
  component: Forum,
})
