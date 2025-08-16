import type { SignOptions, SignPayloadType } from '@fastify/jwt'
import { app } from '@/app'

export async function jwtSign(
  payload: SignPayloadType,
  options?: Partial<SignOptions>
) {
  const token = app.jwt.sign(payload, options)
  return token
}
