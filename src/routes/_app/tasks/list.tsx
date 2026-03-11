import { createFileRoute } from '@tanstack/react-router'

import TasksList from '#/features/seed/pages/tasks/TasksList'

export const Route = createFileRoute('/_app/tasks/list')({
  component: TasksList,
})
