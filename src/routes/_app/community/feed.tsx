import { createFileRoute } from '@tanstack/react-router'

import Feed from '#/features/seed/pages/community/Feed'

export const Route = createFileRoute('/_app/community/feed')({
  component: Feed,
})
