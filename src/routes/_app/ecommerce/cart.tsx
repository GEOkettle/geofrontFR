import { createFileRoute } from '@tanstack/react-router'

import Cart from '#/features/seed/pages/ecommerce/Cart'

export const Route = createFileRoute('/_app/ecommerce/cart')({
  component: Cart,
})
