import { z } from 'zod'

export const exampleStatusSchema = z.enum(['draft', 'published', 'archived'])

export const exampleSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  description: z.string().min(1),
  status: exampleStatusSchema,
})

export const exampleListSchema = z.array(exampleSchema)

export type ExampleEntity = z.infer<typeof exampleSchema>
