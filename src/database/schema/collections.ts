import { relations } from 'drizzle-orm'
import { pgTable, text, uuid } from 'drizzle-orm/pg-core'
import { photos } from './photos'
import { users } from './users'

export const collections = pgTable('collections', {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  ownerId: uuid('owner_id').references(() => users.id, {
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
