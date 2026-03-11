import { createFileRoute } from '@tanstack/react-router'

import DropdownPage from '#/features/seed/pages/component/DropdownPage'

export const Route = createFileRoute('/_app/component/dropdown')({
  component: DropdownPage,
})
