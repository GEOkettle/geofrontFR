import type { ExampleStatus } from '#/entities/example/types/example'

const statusClassName: Record<ExampleStatus, string> = {
  draft:
    'border-[rgba(203,140,42,0.28)] bg-[rgba(250,192,61,0.18)] text-[rgb(135,88,20)]',
  published:
    'border-[rgba(33,145,98,0.22)] bg-[rgba(52,211,153,0.16)] text-[rgb(21,101,67)]',
  archived:
    'border-[rgba(90,107,122,0.2)] bg-[rgba(148,163,184,0.14)] text-[rgb(73,85,99)]',
}

export function ExampleStatusBadge({ status }: { status: ExampleStatus }) {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${statusClassName[status]}`}
    >
      {status}
    </span>
  )
}
