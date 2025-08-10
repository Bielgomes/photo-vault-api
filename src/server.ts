import { app } from './app.ts'
import { env } from './env.ts'

try {
  await app.listen({ host: env.HOST, port: env.PORT })
  app.log.info(`Docs: http://${env.HOST}:${env.PORT}/docs`)
} catch (err) {
  app.log.error(err)
  process.exit(1)
}
