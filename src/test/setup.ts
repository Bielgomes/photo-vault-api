import { reset } from 'drizzle-seed'
import { app } from '@/app'
import { db } from '@/lib/drizzle'
import * as schema from '../../drizzle/schema'

beforeAll(async () => {
  await app.ready()
})

afterEach(async () => {
  await reset(db, schema)
})
