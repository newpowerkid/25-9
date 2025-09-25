import {
  pgTable,
  uuid,
  text,
  timestamp,
  boolean as pgBoolean,
  pgEnum,
} from "drizzle-orm/pg-core";
import { kid } from "./kid.schema";
import { billBooking } from "./bill.schema";

export const statusEnum = pgEnum("status", [
  "Pending",
  "Confirmed",
  "Cancelled",
]);

export const booking = pgTable("booking", {
  id: uuid("id").defaultRandom().primaryKey(),
  kidId: uuid("kid_id").references(() => kid.id, { onDelete: "cascade" }),
  billBookingId: uuid("bill_booking_id").references(() => billBooking.id, {
    onDelete: "cascade",
  }),
  use: pgBoolean("use"),
  comment: text("comment"),
  dateBooking: timestamp("date_booking").notNull(),
  timeBooking: text("time_booking"),
  classBooking: text("class_booking"),
  status: statusEnum("status")
    .$default(() => "Pending")
    .notNull(),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});
