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
import { kid } from "./kid.schema";
import { price } from "./price.schema";

export const paidByEnum = pgEnum("paid_by", ["Cash", "Card", "Transfer"]);

export const bill = pgTable("bill", {
  id: uuid("id").defaultRandom().primaryKey(),
  kidId: uuid("kid_id").references(() => kid.id, { onDelete: "cascade" }),
  paidBy: paidByEnum("paid_by")
    .$default(() => "Cash")
    .notNull(),
  reportId: uuid("report_id"),
  classBill: text("class_bill"),
  isPaid: pgBoolean("is_paid")
    .$default(() => false)
    .notNull(),
  totalPaid: numeric("total_paid", { precision: 12, scale: 2 })
    .$default(() => "0")
    .notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const billPrice = pgTable("bill_price", {
  id: uuid("id").defaultRandom().primaryKey(),
  billId: uuid("bill_id")
    .references(() => bill.id, { onDelete: "cascade" })
    .notNull(),
  priceId: uuid("price_id")
    .references(() => price.id, { onDelete: "cascade" })
    .notNull(),
  quantity: integer("quantity")
    .$default(() => 1)
    .notNull(),
  plusAndMinus: integer("plus_and_minus"),
  discountAmt: numeric("discount_amt", { precision: 12, scale: 2 }).$default(
    () => "0"
  ),
  discountPct: numeric("discount_pct", { precision: 5, scale: 2 }).$default(
    () => "0"
  ),
  startDate: timestamp("start_date"),
  expiryDate: timestamp("expiry_date"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const billBooking = pgTable("bill_booking", {
  id: uuid("id").defaultRandom().primaryKey(),
  kidId: uuid("kid_id")
    .references(() => kid.id, { onDelete: "cascade" })
    .notNull(),
  priceId: uuid("price_id")
    .references(() => price.id, { onDelete: "cascade" })
    .notNull(),
  billId: uuid("bill_id")
    .references(() => bill.id, { onDelete: "cascade" })
    .notNull(),
  remainingLessons: integer("remaining_lessons").$default(() => 0),
  expiryDate: timestamp("expiry_date"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});
