import { createFileRoute } from '@tanstack/react-router'

import Shop from '#/features/seed/pages/ecommerce/Shop'

export const Route = createFileRoute('/_app/ecommerce/shop')({
  component: Shop,
})
