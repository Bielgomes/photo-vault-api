import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { authenticateUser } from '@/functions/authenticate-user'
import { BaseError } from '@/functions/errors/base-error'

export const loginRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/login',
    {
      schema: {
        description: 'Authenticate a user',
        tags: ['users'],
        body: z.object({
          email: z.email(),
          password: z.string(),
        }),
        response: {
          200: z.object({
            token: z.string(),
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      try {
        const { email, password } = request.body

        const user = await authenticateUser({ email, password })
        const token = await reply.jwtSign(
          {
            role: user.role,
          },
          {
            sign: {
              sub: user.id,
            },
          }
        )

        return reply.status(200).send({ token })
      } catch (err) {
        if (err instanceof BaseError) {
          switch (err.constructor.name) {
            case 'InvalidCredentialsError':
              return reply.status(400).send({ message: 'Invalid credentials' })
            default:
              throw err
          }
        }

        throw err
      }
    }
  )
}
