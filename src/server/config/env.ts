import { config as loadDotEnv } from 'dotenv'
import { z } from 'zod'

loadDotEnv({ path: '.env' })

if (process.env.NODE_ENV === 'development') {
  loadDotEnv({ path: '.env.development', override: true })
}

const serverEnvSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  API_BASE_URL: z.string().url().optional(),
  SESSION_SECRET: z.string().min(1).optional(),
})

export const serverEnv = serverEnvSchema.parse(process.env)
