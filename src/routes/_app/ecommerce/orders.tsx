import { createFileRoute } from '@tanstack/react-router'

import Orders from '#/features/seed/pages/ecommerce/Orders'

export const Route = createFileRoute('/_app/ecommerce/orders')({
  component: Orders,
})
