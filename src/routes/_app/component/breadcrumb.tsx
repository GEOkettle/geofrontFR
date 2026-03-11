import { createFileRoute } from '@tanstack/react-router'

import BreadcrumbPage from '#/features/seed/pages/component/BreadcrumbPage'

export const Route = createFileRoute('/_app/component/breadcrumb')({
  component: BreadcrumbPage,
})
