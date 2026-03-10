import { z } from 'zod'

const publicEnvSchema = z.object({
  VITE_APP_NAME: z.string().min(1).default('geofrontFR Seed'),
  VITE_APP_DESCRIPTION: z
    .string()
    .min(1)
    .default('A frontend architecture seed built on TanStack Start.'),
  VITE_DOCS_URL: z.string().url().default('https://tanstack.com/start'),
  VITE_API_BASE_URL: z.string().url().optional().or(z.literal('')),
})

export const publicEnv = publicEnvSchema.parse(import.meta.env)
