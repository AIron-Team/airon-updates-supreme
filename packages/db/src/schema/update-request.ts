import { relations } from "drizzle-orm";
import { index, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth";
import { contentSource } from "./content-source";


export const updateRequest = pgTable(
    "update_request",
    {
        id: text("id").primaryKey(),
        contentSourceId: text("content_source_id").references(() => contentSource.id, {
            onDelete: "set null",
        }),
        category: text("category"),
        from: text("from").notNull(), // stored as datetime string
        type: text("type").notNull(),
        status: text("status").notNull().default("PENDING"), // PENDING, PROCESSING, PROCESSED, FAILED
        createdBy: text("created_by")
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
        createdAt: timestamp("created_at").notNull(),
    },
    (table) => [
        index("update_request_content_source_id_idx").on(table.contentSourceId),
        index("update_request_category_idx").on(table.category),
        index("update_request_status_idx").on(table.status),
        index("update_request_created_by_idx").on(table.createdBy),
        index("update_request_created_at_idx").on(table.createdAt),
    ]
);

export const updateRequestRelations = relations(updateRequest, ({ one }) => ({
    contentSource: one(contentSource, {
        fields: [updateRequest.contentSourceId],
        references: [contentSource.id],
    }),
    creator: one(user, {
        fields: [updateRequest.createdBy],
        references: [user.id],
    }),
}));
