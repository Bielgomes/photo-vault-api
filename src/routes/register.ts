import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { createUser } from '@/functions/create-user'
import { BaseError } from '@/functions/errors/base-error'

const registerBodySchema = z.object({
  email: z.email(),
  name: z.string(),
  password: z.string(),
})

const registerSuccessResponseSchema = z.null()

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
