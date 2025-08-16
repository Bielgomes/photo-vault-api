import { users } from 'drizzle/schema'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/drizzle'
import { comparePassword } from '@/utils/hash'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

interface AuthenticateUserInput {
  email: string
  password: string
}

export async function authenticateUser({
  email,
  password,
}: AuthenticateUserInput) {
  const userWithEmail = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1)

  if (userWithEmail.length <= 0) {
    throw new InvalidCredentialsError()
  }

  const user = userWithEmail[0]
  const doesPasswordsMatch = await comparePassword(password, user.passwordHash)

  if (!doesPasswordsMatch) {
    throw new InvalidCredentialsError()
  }

  return user
}
