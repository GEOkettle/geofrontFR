import { useQuery } from '@tanstack/react-query'

import { exampleDetailQueryOptions } from '#/features/example/hooks/exampleQueries'

export function useExampleDetailQuery(exampleId: string) {
  return useQuery(exampleDetailQueryOptions(exampleId))
}
