import { createFileRoute } from '@tanstack/react-router'

import Apps from '#/features/seed/pages/settings/Apps'

export const Route = createFileRoute('/_app/settings/apps')({
  component: Apps,
})
