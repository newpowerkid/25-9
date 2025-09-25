import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "./auth.schema";

export const titleKidEnum = pgEnum("kid_title", ["Master", "Miss"]);

export const typeKidEnum = pgEnum("type_kid", [
  "Lifetime",
  "Membership",
  "Spacial",
  "Birthday",
  "Private",
  "Other",
]);

export const nationalityEnum = pgEnum("nationality", [
  // Asia
  "Thai",
  "Japanese",
  "Korean",
  "Chinese",
  "Indian",
  "OtherAsian",

  // Middle East
  "Israel",
  "OtherMiddleEast",

  // Europe (สามารถระบุประเทศหลัก ๆ หรือใช้ continent)
  "UK",
  "Germany",
  "France",
  "Italy",
  "Spain",
  "OtherEurope",

  // Africa
  "Egypt",
  "SouthAfrica",
  "OtherAfrica",

  // Americas
  "USA",
  "Canada",
  "Brazil",
  "Argentina",
  "OtherNorthAmerica",
  "OtherSouthAmerica",

  // Oceania
  "Australia",
  "NewZealand",
  "OtherOceania",

  // Other / fallback
  "Other",
]);

export const socialMediaEnum = pgEnum("social_media", ["Yes", "No"]);

export const kid = pgTable("kid", {
  id: uuid("id").defaultRandom().primaryKey(),
  studentId: text("student_id"),
  nickName: text("nick_name"),
  identity: text("identity"),
  title: titleKidEnum("title")
    .$default(() => "Master")
    .notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  birthDay: timestamp("birth_day"),
  comment: text("comment"),
  nationality: nationalityEnum("nationality")
    .$default(() => "Thai")
    .notNull(),
  socialMedia: socialMediaEnum("social_media")
    .$default(() => "No")
    .notNull(),
  kidType: typeKidEnum("kid_type")
    .$default(() => "Other")
    .notNull(),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const userKids = pgTable("user_kid", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").references(() => user.id, { onDelete: "set null" }),
  kidId: uuid("kid_id").references(() => kid.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});
