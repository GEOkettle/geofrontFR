import { createFileRoute } from '@tanstack/react-router'

import Account from '#/features/seed/pages/settings/Account'

export const Route = createFileRoute('/_app/settings/account')({
  component: Account,
})
