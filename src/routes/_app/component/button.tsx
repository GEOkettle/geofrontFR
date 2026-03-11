import { createFileRoute } from '@tanstack/react-router'

import ButtonPage from '#/features/seed/pages/component/ButtonPage'

export const Route = createFileRoute('/_app/component/button')({
  component: ButtonPage,
})
