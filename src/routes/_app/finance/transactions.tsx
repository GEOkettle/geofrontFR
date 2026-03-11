import { createFileRoute } from '@tanstack/react-router'

import Transactions from '#/features/seed/pages/finance/Transactions'

export const Route = createFileRoute('/_app/finance/transactions')({
  component: Transactions,
})
