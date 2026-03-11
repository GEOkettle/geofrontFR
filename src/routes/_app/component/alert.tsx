import { createFileRoute } from '@tanstack/react-router'

import AlertPage from '#/features/seed/pages/component/AlertPage'

export const Route = createFileRoute('/_app/component/alert')({
  component: AlertPage,
})
