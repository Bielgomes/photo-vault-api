import cors from '@fastify/cors'
import swagger from '@fastify/swagger'
import scalarFastifyApiReference from '@scalar/fastify-api-reference'
import fastify from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { env } from './env.ts'
import { registerRoute } from './routes/register.ts'

const app = fastify({
  logger: {
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(cors, {
  origin: true,
})

app
  .register(swagger, {
    openapi: {
      openapi: '3.0.0',
      info: {
        title: 'Photo Vault',
        description: 'Photo Vault API Documentation',
        version: '1.0.0',
      },
      servers: [
        {
          url: `http://localhost:${env.PORT}`,
        },
      ],
    },
    transform: jsonSchemaTransform,
  })
  .withTypeProvider<ZodTypeProvider>()

await app.register(scalarFastifyApiReference, {
  routePrefix: '/docs',
  configuration: {
    theme: 'kepler',
  },
})

await app.register(registerRoute)

app.setErrorHandler((error, _request, reply) => {
  if (error.validation) {
    return reply.status(400).send({
      message: error.message,
    })
  }

  if (env.NODE_ENV !== 'production') {
    app.log.error(error)
  } else {
    app.log.error({ message: error.message, stack: error.stack })
  }

  return reply.status(500).send({ message: 'Internal server error' })
})

export { app }
