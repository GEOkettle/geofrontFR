import { createFileRoute } from '@tanstack/react-router'

import ForumPost from '#/features/seed/pages/community/ForumPost'

export const Route = createFileRoute('/_app/community/forum-post')({
  component: ForumPost,
})
