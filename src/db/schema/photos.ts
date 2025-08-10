import { relations } from 'drizzle-orm'
import { integer, pgTable, text } from 'drizzle-orm/pg-core'
import { collections } from './collections'

export const photos = pgTable('photos', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  key: text().notNull(),
  collectionId: integer('collection_id').references(() => collections.id, {
    onDelete: 'set null',
  }),
})

export const photosRelations = relations(photos, ({ one }) => ({
  collection: one(collections, {
    fields: [photos.collectionId],
    references: [collections.id],
  }),
}))
