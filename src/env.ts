import 'dotenv/config'
import z from 'zod'

export const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  JWT_SECRET: z.string(),
  HOST: z.string().default('0.0.0.0'),
  PORT: z.coerce.number().default(3333),
  CLOUDFLARE_ENDPOINT: z.url(),
  CLOUDFLARE_ACCESS_KEY_ID: z.string(),
  CLOUDFLARE_SECRET_ACCESS_KEY: z.string(),
  DATABASE_URL: z.url(),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error(
    '❌ Invalid environment variables: ',
    z.prettifyError(_env.error)
  )

  throw Error('Invalid environment variables')
}

export const env = _env.data
