import { faker } from '@faker-js/faker'
import { users } from 'drizzle/schema'
import { db } from '@/lib/drizzle'
import { hashPassword } from '@/utils/hash'
import { jwtSign } from '../jwt'

export async function makeUser(role?: 'admin' | 'user') {
  const passwordBeforeHash = faker.internet.password()

  const result = await db
    .insert(users)
    .values({
      name: faker.internet.username(),
      email: faker.internet.email(),
      passwordHash: await hashPassword(passwordBeforeHash),
      role,
    })
    .returning()

  return {
    user: result[0],
    passwordBeforeHash,
  }
}

export async function makeUserAndAuthenticate(role?: 'admin' | 'user') {
  const { user } = await makeUser(role)

  const token = await jwtSign(
    {
      role: user.role,
    },
    {
      sub: user.id,
    }
  )

  return {
    user,
    token,
  }
}
