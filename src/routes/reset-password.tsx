import { createFileRoute } from '@tanstack/react-router'

import ResetPassword from '#/features/seed/pages/ResetPassword'

export const Route = createFileRoute('/reset-password')({
  component: ResetPassword,
  ssr: false,
})
