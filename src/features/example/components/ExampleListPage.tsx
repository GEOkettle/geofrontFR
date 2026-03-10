import { Link } from '@tanstack/react-router'

import { ExampleSummaryCard } from '#/entities/example/ui/ExampleSummaryCard'
import { Input } from '#/components/ui/Input'
import * as Select from '#/components/ui/Select'
import { useExampleListQuery } from '#/features/example/hooks/useExampleListQuery'
import { useExampleFilterStore } from '#/features/example/store/useExampleFilterStore'
import { filterExamples } from '#/features/example/utils/filterExamples'

export function ExampleListPage() {
  const { data = [] } = useExampleListQuery()
  const searchTerm = useExampleFilterStore((state) => state.searchTerm)
  const status = useExampleFilterStore((state) => state.status)
  const setSearchTerm = useExampleFilterStore((state) => state.setSearchTerm)
  const setStatus = useExampleFilterStore((state) => state.setStatus)

  const visibleExamples = filterExamples(data, { searchTerm, status })

  return (
    <main className="page-wrap px-4 py-12">
      <section className="island-shell rounded-[2rem] p-6 sm:p-8">
        <p className="island-kicker mb-2">Example Module</p>
        <h1 className="display-title mb-3 text-4xl font-bold text-[var(--sea-ink)] sm:text-5xl">
          Route entry, feature workflow, entity parsing.
        </h1>
        <p className="mb-8 max-w-3xl text-base leading-7 text-[var(--sea-ink-soft)]">
          This page shows the intended flow: the route preloads query data, the
          feature hook reads TanStack Query state, and the entity layer handles
          parsing and presentation.
        </p>

        <div className="mb-8 grid gap-4 md:grid-cols-[minmax(0,1fr)_220px]">
          <label className="space-y-2">
            <span className="text-sm font-semibold text-[var(--sea-ink)]">
              Search examples
            </span>
            <Input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by title or summary"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-[var(--sea-ink)]">
              Status
            </span>
            <Select.Select value={status} onValueChange={setStatus}>
              <Select.SelectTrigger className="w-full bg-white/50">
                <Select.SelectValue placeholder="Filter by status" />
              </Select.SelectTrigger>
              <Select.SelectContent>
                <Select.SelectItem value="all">All</Select.SelectItem>
                <Select.SelectItem value="draft">Draft</Select.SelectItem>
                <Select.SelectItem value="published">Published</Select.SelectItem>
                <Select.SelectItem value="archived">Archived</Select.SelectItem>
              </Select.SelectContent>
            </Select.Select>
          </label>
        </div>

        <div className="grid gap-4">
          {visibleExamples.map((example) => (
            <Link
              key={example.id}
              to="/example/$exampleId"
              params={{ exampleId: example.id }}
              className="no-underline"
            >
              <ExampleSummaryCard example={example} />
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
