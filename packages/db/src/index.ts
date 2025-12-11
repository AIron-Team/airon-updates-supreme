import { drizzle } from "drizzle-orm/node-postgres";
import * as authSchema from "./schema/auth";
import * as contentSourceSchema from "./schema/content-source";
import * as contentSchema from "./schema/content";
import * as updateRequestSchema from "./schema/update-request";
import * as updateRequestContentProcessedSchema from "./schema/update-request-content-processed";

const schema = {
    ...authSchema,
    ...contentSourceSchema,
    ...contentSchema,
    ...updateRequestSchema,
    ...updateRequestContentProcessedSchema,
};

export const db = drizzle(process.env.DATABASE_URL || "", { schema });

// Export schema for use in other packages
export * from "./schema/auth";
export * from "./schema/content-source";
export * from "./schema/content";
export * from "./schema/update-request";
export * from "./schema/update-request-content-processed";
