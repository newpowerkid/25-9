import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  integer,
  numeric,
  boolean as pgBoolean,
} from "drizzle-orm/pg-core";

export const categoryPriceEnum = pgEnum("category_price", [
  "Membership",
  "Lessons",
  "Etc",
]);

export const price = pgTable("price", {
  id: uuid("id").defaultRandom().primaryKey(),
  list: text("list"),
  noLessons: integer("no_lessons"),
  checkbox: pgBoolean("checkbox").notNull(),
  price: numeric("price", { precision: 12, scale: 2 }), // สำหรับเงิน
  durationMonths: integer("duration_months"),
  unlimited: pgBoolean("unlimited"),
  categoryPrice: categoryPriceEnum("category_price")
    .$default(() => "Etc")
    .notNull(),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});
