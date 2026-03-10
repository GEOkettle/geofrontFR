import { Link } from '@tanstack/react-router'

import { ExampleStatusBadge } from '#/entities/example/ui/ExampleStatusBadge'
import { useExampleDetailQuery } from '#/features/example/hooks/useExampleDetailQuery'

export function ExampleDetailPage({ exampleId }: { exampleId: string }) {
  const { data: example } = useExampleDetailQuery(exampleId)

  if (!example) {
    return null
  }

  return (
    <main className="page-wrap px-4 py-12">
      <section className="island-shell rounded-[2rem] p-6 sm:p-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <p className="island-kicker m-0">Example Detail</p>
          <ExampleStatusBadge status={example.status} />
        </div>

        <h1 className="display-title mb-4 text-4xl font-bold text-[var(--sea-ink)] sm:text-5xl">
          {example.title}
        </h1>
        <p className="mb-4 text-lg text-[var(--sea-ink-soft)]">
          {example.summary}
        </p>
        <p className="mb-8 max-w-3xl leading-8 text-[var(--sea-ink-soft)]">
          {example.description}
        </p>

        <Link
          to="/example"
          className="inline-flex rounded-full border border-[rgba(50,143,151,0.3)] bg-[rgba(79,184,178,0.14)] px-5 py-2.5 text-sm font-semibold text-[var(--lagoon-deep)] no-underline transition hover:-translate-y-0.5 hover:bg-[rgba(79,184,178,0.24)]"
        >
          Back to Example List
        </Link>
      </section>
    </main>
  )
}
