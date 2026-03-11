import { createFileRoute } from '@tanstack/react-router'

import Customers from '#/features/seed/pages/ecommerce/Customers'

export const Route = createFileRoute('/_app/ecommerce/customers')({
  component: Customers,
})
