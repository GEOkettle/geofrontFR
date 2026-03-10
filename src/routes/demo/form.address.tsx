import { createFileRoute } from '@tanstack/react-router'
import { AddressFormPage } from '#/features/demo/components/AddressFormPage'

export const Route = createFileRoute('/demo/form/address')({
  component: AddressFormPage,
})
