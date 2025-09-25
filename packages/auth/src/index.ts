import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { genericOAuth } from "better-auth/plugins";
import { db } from "@repo/db";
// ───────────────────────────────
// BETTER AUTH CONFIGURATION
// ───────────────────────────────
export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg" }),

  // Session configuration
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },

  // Enable email/password authentication
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // ตั้งเป็น true ถ้าต้องการ verify email
  },

  // OAuth providers
  plugins: [
    genericOAuth({
      config: [
        {
          providerId: "line",
          clientId: process.env.LINE_CLIENT_ID!,
          clientSecret: process.env.LINE_CLIENT_SECRET!,
          redirectURI: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/auth/callback/line`,
          authorizationUrl: "https://access.line.me/oauth2/v2.1/authorize",
          tokenUrl: "https://api.line.me/oauth2/v2.1/token",
          userInfoUrl: "https://api.line.me/v2/profile",
          scopes: ["openid", "profile", "email"],
          authorizationUrlParams: { prompt: "consent" },
        },
      ],
    }),
  ],

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      accessType: "offline",
      prompt: "select_account+consent",
    },
  },

  // Custom callbacks
  callbacks: {
    // ────────────────
    // SIGN IN CALLBACK
    // ────────────────
    async signIn({ user, account }: { user: any; account: any }) {
      if (!account) return false;

      // กรณีมี email (Google, อื่นๆ)
      if (user.email) {
        // Better Auth จะจัดการ user creation อัตโนมัติ
        // แต่เราสามารถ customize ได้ผ่าน user.additionalFields
        return true;
      }

      // กรณีไม่มี email (เช่น LINE)
      // Better Auth จะจัดการ account linking อัตโนมัติ
      return true;
    },
  },

  // Secret key
  secret: process.env.BETTER_AUTH_SECRET,
});
