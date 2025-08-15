import { relations } from 'drizzle-orm'
import { pgTable, text, uuid } from 'drizzle-orm/pg-core'
import { collections } from './collections'

export const photos = pgTable('photos', {
  id: uuid().primaryKey().defaultRandom(),
  key: text().notNull(),
  collectionId: uuid('collection_id').references(() => collections.id, {
    onDelete: 'set null',
  }),
})

export const photosRelations = relations(photos, ({ one }) => ({
  collection: one(collections, {
    fields: [photos.collectionId],
    references: [collections.id],
  }),
}))
