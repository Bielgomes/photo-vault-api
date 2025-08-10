import { drizzle } from 'drizzle-orm/node-postgres'
import { env } from '@/env.ts'

import { collectionsSchema, photosSchema, usersSchema } from './schema'

export const db = drizzle(env.DATABASE_URL, {
  schema: {
    ...collectionsSchema,
    ...photosSchema,
    ...usersSchema,
  },
})
