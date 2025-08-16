import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { BaseError } from '@/functions/errors/base-error'
import { getUserById } from '@/functions/get-user-by-id'
import { verifyJWT } from '../middlewares/verify-jwt'

export const profileRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/me',
    {
      onRequest: [verifyJWT],
      schema: {
        description: 'Authenticate a user',
        tags: ['users'],
        security: [
          {
            bearerAuth: [],
          },
        ],
        response: {
          200: z.object({
            id: z.uuid(),
            name: z.string(),
            email: z.email(),
            role: z.enum(['admin', 'user']),
          }),
          400: z.object({
            message: z.literal('User not found'),
          }),
        },
      },
    },
    async (request, reply) => {
      try {
        const user = await getUserById({ id: request.user.sub })
        return reply.status(200).send(user)
      } catch (err) {
        if (err instanceof BaseError) {
          switch (err.constructor.name) {
            case 'UserNotFoundError':
              return reply.status(400).send({ message: 'User not found' })
            default:
              throw err
          }
        }

        throw err
      }
    }
  )
}
