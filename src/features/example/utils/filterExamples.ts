import type { Example } from '#/entities/example/types/example'
import type { ExampleFilterValues } from '#/features/example/schemas/exampleFilterSchema'

export function filterExamples(
  examples: Example[],
  filters: ExampleFilterValues,
) {
  const normalizedSearch = filters.searchTerm.trim().toLowerCase()

  return examples.filter((example) => {
    const matchesStatus =
      filters.status === 'all' || example.status === filters.status
    const matchesSearch =
      normalizedSearch.length === 0 ||
      example.title.toLowerCase().includes(normalizedSearch) ||
      example.summary.toLowerCase().includes(normalizedSearch)

    return matchesStatus && matchesSearch
  })
}
