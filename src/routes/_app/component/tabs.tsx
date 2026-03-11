import { createFileRoute } from '@tanstack/react-router'

import TabsPage from '#/features/seed/pages/component/TabsPage'

export const Route = createFileRoute('/_app/component/tabs')({
  component: TabsPage,
})
