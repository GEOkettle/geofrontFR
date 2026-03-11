import { createFileRoute } from '@tanstack/react-router'

import JobListing from '#/features/seed/pages/job/JobListing'

export const Route = createFileRoute('/_app/job/job-listing')({
  component: JobListing,
})
