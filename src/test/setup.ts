import { reset } from 'drizzle-seed'
import { app } from '@/app'
import { db } from '@/database'
import * as schema from '../database/schema'

beforeAll(async () => {
  await app.ready()
})

afterAll(async () => {
  await reset(db, schema)
})
