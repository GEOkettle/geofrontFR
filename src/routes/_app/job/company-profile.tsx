import { createFileRoute } from '@tanstack/react-router'

import CompanyProfile from '#/features/seed/pages/job/CompanyProfile'

export const Route = createFileRoute('/_app/job/company-profile')({
  component: CompanyProfile,
})
