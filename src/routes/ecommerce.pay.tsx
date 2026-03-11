import { createFileRoute } from '@tanstack/react-router'

import Pay from '#/features/seed/pages/ecommerce/Pay'

export const Route = createFileRoute('/ecommerce/pay')({
  component: Pay,
})
