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
  API_BASE_URL: z.string().url().optional().or(z.literal('')),
  SESSION_SECRET: z.string().min(1).optional(),
  AUTH_SESSION_COOKIE_NAME: z.string().optional(),
  AUTH_SESSION_TTL_SECONDS: z.coerce
    .number()
    .int()
    .positive()
    .default(60 * 60 * 24 * 7),
  REDIS_HOST: z.string().min(1).default('127.0.0.1'),
  REDIS_PORT: z.coerce.number().int().positive().default(6379),
  REDIS_USERNAME: z.string().optional(),
  REDIS_PASSWORD: z.string().optional(),
  REDIS_DATABASE: z.coerce.number().int().nonnegative().default(0),
  REDIS_KEY_PREFIX: z.string().default('geofrontfr'),
})

export const serverEnv = serverEnvSchema.parse(process.env)
