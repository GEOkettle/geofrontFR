import { createFileRoute } from '@tanstack/react-router'

import { ExampleDetailPage } from '#/features/example/components/ExampleDetailPage'
import { exampleDetailQueryOptions } from '#/features/example/hooks/exampleQueries'

export const Route = createFileRoute('/example/$exampleId')({
  loader: ({ context, params }) =>
    context.queryClient.ensureQueryData(
      exampleDetailQueryOptions(params.exampleId),
    ),
  component: ExampleDetailRoute,
})

function ExampleDetailRoute() {
  const { exampleId } = Route.useParams()

  return <ExampleDetailPage exampleId={exampleId} />
}
