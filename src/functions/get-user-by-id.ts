import { users } from 'drizzle/schema'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/drizzle'
import { UserNotFoundError } from './errors/user-not-found-error'

interface GetUserByIdInput {
  id: string
}

export async function getUserById({ id }: GetUserByIdInput) {
  const result = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
    })
    .from(users)
    .where(eq(users.id, id))
    .limit(1)

  if (result.length <= 0) {
    throw new UserNotFoundError()
  }

  return result[0]
}
