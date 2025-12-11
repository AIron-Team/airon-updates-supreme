import { relations } from "drizzle-orm";
import { index, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth";


export const contentSource = pgTable(
    "content_source",
    {
        id: text("id").primaryKey(),
        title: text("title").notNull(),
        category: text("category").notNull(),
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
        index("content_source_created_by_idx").on(table.createdBy),
        index("content_source_category_idx").on(table.category),
        index("content_source_created_at_idx").on(table.createdAt),
    ]
);

export const contentSourceRelations = relations(contentSource, ({ one }) => ({
    creator: one(user, {
        fields: [contentSource.createdBy],
        references: [user.id],
        relationName: "contentSourceCreator",
    }),
    modifier: one(user, {
        fields: [contentSource.modifiedBy],
        references: [user.id],
        relationName: "contentSourceModifier",
    }),
}));
