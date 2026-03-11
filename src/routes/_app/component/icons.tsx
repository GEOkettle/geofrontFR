import { createFileRoute } from '@tanstack/react-router'

import IconsPage from '#/features/seed/pages/component/IconsPage'

export const Route = createFileRoute('/_app/component/icons')({
  component: IconsPage,
})
