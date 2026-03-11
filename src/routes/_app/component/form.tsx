import { createFileRoute } from '@tanstack/react-router'

import FormPage from '#/features/seed/pages/component/FormPage'

export const Route = createFileRoute('/_app/component/form')({
  component: FormPage,
})
