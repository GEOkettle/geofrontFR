import { z } from 'zod'

export const exampleFilterSchema = z.object({
  searchTerm: z.string().default(''),
  status: z.enum(['all', 'draft', 'published', 'archived']).default('all'),
})

export type ExampleFilterValues = z.infer<typeof exampleFilterSchema>
