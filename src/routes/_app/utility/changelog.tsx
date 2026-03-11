import { createFileRoute } from '@tanstack/react-router'

import Changelog from '#/features/seed/pages/utility/Changelog'

export const Route = createFileRoute('/_app/utility/changelog')({
  component: Changelog,
})
