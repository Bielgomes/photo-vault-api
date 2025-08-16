import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { createUser } from '@/functions/create-user'
import { BaseError } from '@/functions/errors/base-error'

export const registerRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/users',
    {
      schema: {
        description: 'Register a new user account',
        tags: ['users'],
        body: z.object({
          email: z.email(),
          name: z.string().min(1, 'Name must have 1 character'),
          password: z.string(),
        }),
        response: {
          201: z.null().describe('User successfully registered'),
          400: z.object({
            message: z.string(),
          }),
          409: z.object({
            message: z.literal('Email already exists'),
          }),
        },
      },
    },
    async (request, reply) => {
      try {
        const { name, email, password } = request.body

        await createUser({ name, email, password })

        return reply.status(201).send()
      } catch (err) {
        if (err instanceof BaseError) {
          switch (err.constructor.name) {
            case 'EmailAlreadyExistsError':
              return reply.status(409).send({ message: 'Email already exists' })
            default:
              throw err
          }
        }

        throw err
      }
    }
  )
}
