import { reset } from 'drizzle-seed'
import { hashPassword } from '@/utils/hash'
import { db } from '.'
import * as schema from './schema'
import { users } from './schema/users'

await reset(db, schema)

await db.insert(users).values({
  name: 'Admin',
  email: 'admin@photovault.com',
  passwordHash: await hashPassword('admin'),
  role: 'admin',
})

console.log('Database seeded successfully!')

process.exit()
