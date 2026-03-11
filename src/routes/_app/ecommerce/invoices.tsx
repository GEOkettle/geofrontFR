import { createFileRoute } from '@tanstack/react-router'

import Invoices from '#/features/seed/pages/ecommerce/Invoices'

export const Route = createFileRoute('/_app/ecommerce/invoices')({
  component: Invoices,
})
