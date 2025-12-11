import { relations } from "drizzle-orm";
import { index, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth";
import { contentSource } from "./content-source";


export const content = pgTable(
    "content",
    {
        id: text("id").primaryKey(),
        contentSourceId: text("content_source_id")
            .notNull()
            .references(() => contentSource.id, { onDelete: "cascade" }),
        title: text("title").notNull(),
        text: text("text").notNull(),
        url: text("url"),
        createdBy: text("created_by")
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
        modifiedBy: text("modified_by")
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
        createdAt: timestamp("created_at").notNull(),
        modifiedAt: timestamp("modified_at").notNull(),
    },
    (table) => [
        index("content_content_source_id_idx").on(table.contentSourceId),
        index("content_created_by_idx").on(table.createdBy),
        index("content_created_at_idx").on(table.createdAt),
    ]
);

export const contentRelations = relations(content, ({ one }) => ({
    contentSource: one(contentSource, {
        fields: [content.contentSourceId],
        references: [contentSource.id],
    }),
    creator: one(user, {
        fields: [content.createdBy],
        references: [user.id],
        relationName: "contentCreator",
    }),
    modifier: one(user, {
        fields: [content.modifiedBy],
        references: [user.id],
        relationName: "contentModifier",
    }),
}));
