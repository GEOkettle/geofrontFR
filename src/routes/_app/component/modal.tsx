import { createFileRoute } from '@tanstack/react-router'

import ModalPage from '#/features/seed/pages/component/ModalPage'

export const Route = createFileRoute('/_app/component/modal')({
  component: ModalPage,
})
