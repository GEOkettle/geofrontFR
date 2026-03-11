import { createFileRoute } from '@tanstack/react-router'

import Signup from '#/features/seed/pages/Signup'

export const Route = createFileRoute('/signup')({
  component: Signup,
})
