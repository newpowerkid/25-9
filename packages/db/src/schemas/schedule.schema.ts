import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const classNameEnum = pgEnum("class_name", [
  "Bugs",
  "Birds",
  "Beasts",
  "SuperBeasts",
  "FunnyBugs",
  "GiggleWorms",
  "GoodFriends",
  "FlipsHotshots",
]);

export const daysEnum = pgEnum("days", [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]);

export const schedules = pgTable("schedule", {
  id: uuid("id").defaultRandom().primaryKey(),
  classesName: classNameEnum("classes_name")
    .$default(() => "Bugs")
    .notNull(),
  ages: text("ages"),
  monday: text("monday"),
  tuesday: text("tuesday"),
  wednesday: text("wednesday"),
  thursday: text("thursday"),
  friday: text("friday"),
  saturday: text("saturday"),
  sunday: text("sunday"),
  days: daysEnum("days")
    .$default(() => "Monday")
    .notNull(),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});
