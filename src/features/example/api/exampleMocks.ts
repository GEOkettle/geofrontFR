export const exampleMockResponse = [
  {
    id: 'routing-boundary',
    title: 'Route Boundary',
    summary: 'Routes stay thin and delegate workflow logic to feature modules.',
    description:
      'This example demonstrates that route files should only define URL entrypoints, loader policy, and page composition. All workflow logic stays in feature code.',
    status: 'published',
  },
  {
    id: 'entity-parsing',
    title: 'Entity Parsing',
    summary: 'Entities own parsing, typing, and presentation-friendly rules.',
    description:
      'The entity layer validates remote payloads, produces typed domain objects, and exposes thin presentational components for display.',
    status: 'draft',
  },
  {
    id: 'shared-api-client',
    title: 'Shared API Client',
    summary: 'Shared HTTP infrastructure lives in shared/api and is reused.',
    description:
      'Feature API functions call the shared axios instance, normalize payloads through entity parsers, and hand typed data to hooks and route loaders.',
    status: 'archived',
  },
] as const
