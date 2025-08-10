import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { createUser } from '@/functions/create-user'
import { BaseError } from '@/functions/errors/base-error'

const registerBodySchema = z.object({
  email: z.email(),
  name: z.string(),
  password: z.string(),
})

const registerSuccessResponseSchema = z.object({
  user: z.object({
    id: z.number(),
    name: z.string(),
    email: z.email(),
    role: z.enum(['admin', 'user']),
    createdAt: z.date(),
  }),
})

const registerBadRequestResponseSchema = z.object({
  message: z.string(),
})

const registerConflictResponseSchema = z.object({
  message: z.literal('Email already exists'),
})

export const registerRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/users',
    {
      schema: {
        description: 'Register a new user account',
        tags: ['users'],
        body: registerBodySchema,
        response: {
          201: registerSuccessResponseSchema,
          400: registerBadRequestResponseSchema,
          409: registerConflictResponseSchema,
        },
      },
    },
    async (request, reply) => {
      try {
        const { name, email, password } = request.body

        const { user } = await createUser({ name, email, password })

        return reply.status(201).send({ user })
      } catch (error) {
        if (error instanceof BaseError) {
          switch (error.constructor.name) {
            case 'EmailAlreadyExistsError':
              return reply.status(409).send({ message: 'Email already exists' })
            default:
              throw error
          }
        }
      }
    }
  )
}
