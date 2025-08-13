import { eq } from 'drizzle-orm'
import { db } from '@/database'
import { users } from '@/database/schema/users'
import { hashPassword } from '@/utils/hash'
import { EmailAlreadyExistsError } from './errors/email-already-exists-error'

interface CreateUserInput {
  name: string
  email: string
  password: string
}

export async function createUser({ name, email, password }: CreateUserInput) {
  const existingUser = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email))
    .limit(1)

  if (existingUser.length > 0) {
    throw new EmailAlreadyExistsError()
  }

  const passwordHash = await hashPassword(password)

  await db.insert(users).values({
    name,
    email,
    passwordHash,
  })
}
