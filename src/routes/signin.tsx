import { createFileRoute } from '@tanstack/react-router'

import Signin from '#/features/seed/pages/Signin'

export const Route = createFileRoute('/signin')({
  component: Signin,
})
