import { createFileRoute } from '@tanstack/react-router'

import AccordionPage from '#/features/seed/pages/component/AccordionPage'

export const Route = createFileRoute('/_app/component/accordion')({
  component: AccordionPage,
})
