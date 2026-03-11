import { createFileRoute } from '@tanstack/react-router'

import TasksKanban from '#/features/seed/pages/tasks/TasksKanban'

export const Route = createFileRoute('/_app/tasks/kanban')({
  component: TasksKanban,
})
