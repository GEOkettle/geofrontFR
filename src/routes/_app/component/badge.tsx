import { createFileRoute } from '@tanstack/react-router'

import BadgePage from '#/features/seed/pages/component/BadgePage'

export const Route = createFileRoute('/_app/component/badge')({
  component: BadgePage,
})
