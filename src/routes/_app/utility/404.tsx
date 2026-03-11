import { createFileRoute } from '@tanstack/react-router'

import PageNotFound from '#/features/seed/pages/utility/PageNotFound'

export const Route = createFileRoute('/_app/utility/404')({
  component: PageNotFound,
})
