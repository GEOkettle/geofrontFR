import { createFileRoute } from '@tanstack/react-router'

import TooltipPage from '#/features/seed/pages/component/TooltipPage'

export const Route = createFileRoute('/_app/component/tooltip')({
  component: TooltipPage,
})
