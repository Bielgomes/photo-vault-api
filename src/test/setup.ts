import { reset } from 'drizzle-seed'
import { app } from '@/app'
import { db } from '@/db'
import * as schema from '../db/schema'

beforeAll(async () => {
  await app.ready()
})

afterAll(async () => {
  await reset(db, schema)
})
