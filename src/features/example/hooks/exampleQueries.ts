import { queryOptions } from '@tanstack/react-query'

import { getExampleDetail } from '#/features/example/api/getExampleDetail'
import { getExampleList } from '#/features/example/api/getExampleList'

export function exampleListQueryOptions() {
  return queryOptions({
    queryKey: ['example', 'list'],
    queryFn: getExampleList,
  })
}

export function exampleDetailQueryOptions(exampleId: string) {
  return queryOptions({
    queryKey: ['example', 'detail', exampleId],
    queryFn: () => getExampleDetail(exampleId),
  })
}
