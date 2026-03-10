import { createFileRoute } from '@tanstack/react-router'
import { SimpleFormPage } from '#/features/demo/components/SimpleFormPage'

export const Route = createFileRoute('/demo/form/simple')({
  component: SimpleFormPage,
})
