import { createFileRoute } from '@tanstack/react-router'

import Faqs from '#/features/seed/pages/utility/Faqs'

export const Route = createFileRoute('/_app/utility/faqs')({
  component: Faqs,
})
