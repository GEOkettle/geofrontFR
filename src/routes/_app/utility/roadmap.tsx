import { createFileRoute } from '@tanstack/react-router'

import Roadmap from '#/features/seed/pages/utility/Roadmap'

export const Route = createFileRoute('/_app/utility/roadmap')({
  component: Roadmap,
})
