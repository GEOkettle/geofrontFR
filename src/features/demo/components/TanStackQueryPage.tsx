import { useQuery } from '@tanstack/react-query'

import { DemoSurface } from '#/features/demo/components/DemoSurface'

export function TanStackQueryPage() {
  const { data } = useQuery({
    queryKey: ['demo-users'],
    queryFn: () =>
      Promise.resolve([
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' },
      ]),
    initialData: [],
  })

  return (
    <DemoSurface
      title="TanStack Query"
      gradient="radial-gradient(50% 50% at 95% 5%, #f4a460 0%, #8b4513 70%, #1a0f0a 100%)"
    >
      <p className="mb-4 text-sm text-white/75">
        Example feature state stays inside the feature module while the route
        remains a thin entrypoint.
      </p>
      <ul className="mb-4 space-y-2">
        {data.map((user) => (
          <li
            key={user.id}
            className="rounded-lg border border-white/20 bg-white/10 p-3 shadow-md backdrop-blur-sm"
          >
            <span className="text-lg text-white">{user.name}</span>
          </li>
        ))}
      </ul>
    </DemoSurface>
  )
}
