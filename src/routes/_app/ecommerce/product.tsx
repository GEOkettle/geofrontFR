import { createFileRoute } from '@tanstack/react-router'

import Product from '#/features/seed/pages/ecommerce/Product'

export const Route = createFileRoute('/_app/ecommerce/product')({
  component: Product,
})
