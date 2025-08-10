import { relations } from 'drizzle-orm'
import { integer, pgTable, text } from 'drizzle-orm/pg-core'
import { photos } from './photos.ts'
import { users } from './users.ts'

export const collections = pgTable('collections', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  ownerId: integer('owner_id').references(() => users.id, {
    onDelete: 'set null',
  }),
})

export const collectionsRelations = relations(collections, ({ one, many }) => ({
  owner: one(users, {
    fields: [collections.ownerId],
    references: [users.id],
  }),
  photos: many(photos),
}))
