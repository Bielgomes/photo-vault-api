import { reset } from 'drizzle-seed'
import { app } from '@/app'
import { db } from '@/database'
import * as schema from '../database/schema'

beforeAll(async () => {
  await app.ready()
})

afterEach(async () => {
  await reset(db, schema)
})
