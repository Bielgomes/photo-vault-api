import { compare, hash } from 'bcrypt'

export async function hashPassword(password: string) {
  const passwordHash = await hash(password, 6)
  return passwordHash
}

export async function comparePassword(passwordHash: string, password: string) {
  const doesPasswordsMatch = await compare(passwordHash, password)
  return doesPasswordsMatch
}
