import { createFileRoute } from '@tanstack/react-router'

import CreditCards from '#/features/seed/pages/finance/CreditCards'

export const Route = createFileRoute('/_app/finance/cards')({
  component: CreditCards,
})
