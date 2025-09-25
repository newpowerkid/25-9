import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const banner = pgTable("banner", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title"),
  imageString: text("image_string").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});
