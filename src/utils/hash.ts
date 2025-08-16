import { compare, hash } from 'bcrypt'

export async function hashPassword(password: string) {
  const passwordHash = await hash(password, 6)
  return passwordHash
}

export async function comparePassword(password: string, passwordHash: string) {
  const doesPasswordsMatch = await compare(password, passwordHash)
  return doesPasswordsMatch
}
