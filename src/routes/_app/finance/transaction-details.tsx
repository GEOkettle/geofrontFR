import { createFileRoute } from '@tanstack/react-router'

import TransactionDetails from '#/features/seed/pages/finance/TransactionDetails'

export const Route = createFileRoute('/_app/finance/transaction-details')({
  component: TransactionDetails,
})
