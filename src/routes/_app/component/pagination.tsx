import { createFileRoute } from '@tanstack/react-router'

import PaginationPage from '#/features/seed/pages/component/PaginationPage'

export const Route = createFileRoute('/_app/component/pagination')({
  component: PaginationPage,
})
