import { createFileRoute } from '@tanstack/react-router'

import MeetupsPost from '#/features/seed/pages/community/MeetupsPost'

export const Route = createFileRoute('/_app/community/meetups-post')({
  component: MeetupsPost,
})
