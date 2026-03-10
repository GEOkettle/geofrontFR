import { useQuery } from '@tanstack/react-query'

import { exampleListQueryOptions } from '#/features/example/hooks/exampleQueries'

export function useExampleListQuery() {
  return useQuery(exampleListQueryOptions())
}
