import { relations } from "drizzle-orm";
import { index, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { updateRequest } from "./update-request";
import { content } from "./content";

export const updateRequestContentProcessed = pgTable(
    "update_request_content_processed",
    {
        id: text("id").primaryKey(),
        updateRequestId: text("update_request_id")
            .notNull()
            .references(() => updateRequest.id, { onDelete: "cascade" }),
        contentId: text("content_id")
            .notNull()
            .references(() => content.id, { onDelete: "cascade" }),
        processedText: text("processed_text").notNull(),
        createdAt: timestamp("created_at").notNull(),
    },
    (table) => [
        index("update_request_content_processed_update_request_id_idx").on(
            table.updateRequestId
        ),
        index("update_request_content_processed_content_id_idx").on(table.contentId),
        index("update_request_content_processed_created_at_idx").on(table.createdAt),
    ]
);

export const updateRequestContentProcessedRelations = relations(
    updateRequestContentProcessed,
    ({ one }) => ({
        updateRequest: one(updateRequest, {
            fields: [updateRequestContentProcessed.updateRequestId],
            references: [updateRequest.id],
        }),
        content: one(content, {
            fields: [updateRequestContentProcessed.contentId],
            references: [content.id],
        }),
    })
);
