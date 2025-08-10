import { hashPassword } from '@/utils/hash'
import { db } from '.'
import { collections } from './schema/collections'
import { photos } from './schema/photos'
import { users } from './schema/users'

await db.delete(users)
await db.delete(collections)
await db.delete(photos)

await db.insert(users).values({
  name: 'Admin',
  email: 'admin@photovault.com',
  passwordHash: await hashPassword('admin'),
  role: 'admin',
})

console.log('Database seeded!')
process.exit()
