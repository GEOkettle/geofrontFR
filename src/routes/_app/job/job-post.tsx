import { createFileRoute } from '@tanstack/react-router'

import JobPost from '#/features/seed/pages/job/JobPost'

export const Route = createFileRoute('/_app/job/job-post')({
  component: JobPost,
})
