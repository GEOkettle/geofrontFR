import { createFileRoute } from '@tanstack/react-router'

import AvatarPage from '#/features/seed/pages/component/AvatarPage'

export const Route = createFileRoute('/_app/component/avatar')({
  component: AvatarPage,
})
