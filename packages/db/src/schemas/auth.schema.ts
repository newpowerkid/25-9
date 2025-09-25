import { boolean, pgTable, pgEnum, text, timestamp } from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", [
  "User",
  "Admin",
  "Customer",
  "Owner",
]);

export const openFormEnum = pgEnum("open_form", ["Open", "Close"]);

export const titleEnum = pgEnum("title", ["Mr", "Ms", "Mrs", "Miss"]);

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  title: titleEnum("title")
    .$default(() => "Mr")
    .notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  address: text("address"),
  mobile: text("mobile"),
  role: userRoleEnum("role")
    .$default(() => "User")
    .notNull(),
  openForm: openFormEnum("open_form")
    .$default(() => "Close")
    .notNull(),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  token: text("token").notNull().unique(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),

  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  idToken: text("id_token"),
  scope: text("scope"),
  password: text("password"),
  accessToken: text("access_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),

  refreshToken: text("refresh_token"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),

  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),

  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  expiresAt: timestamp("expires_at").notNull(),
});
