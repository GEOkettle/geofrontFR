import { createFileRoute } from '@tanstack/react-router'

import { ExampleListPage } from '#/features/example/components/ExampleListPage'
import { exampleListQueryOptions } from '#/features/example/hooks/exampleQueries'

export const Route = createFileRoute('/example/')({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(exampleListQueryOptions()),
  component: ExampleListPage,
})
