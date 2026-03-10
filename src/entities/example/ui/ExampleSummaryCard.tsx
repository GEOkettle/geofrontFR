import type { Example } from '#/entities/example/types/example'
import { ExampleStatusBadge } from '#/entities/example/ui/ExampleStatusBadge'

export function ExampleSummaryCard({ example }: { example: Example }) {
  return (
    <article className="island-shell rounded-2xl p-5 transition hover:-translate-y-0.5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="m-0 text-lg font-semibold text-[var(--sea-ink)]">
          {example.title}
        </h2>
        <ExampleStatusBadge status={example.status} />
      </div>
      <p className="m-0 text-sm leading-6 text-[var(--sea-ink-soft)]">
        {example.summary}
      </p>
    </article>
  )
}
