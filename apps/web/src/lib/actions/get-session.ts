"use server";

import { auth } from "@repo/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { db } from "@repo/db";
import { eq } from "drizzle-orm";
import { user } from "@repo/db/schemas";

// ดึง session + user (รวม role จริง)
export const getSession = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return null;
  }

  try {
    // query เฉพาะ fields ที่จำเป็น เพื่อความปลอดภัยและประสิทธิภาพ
    const [u] = await db
      .select({
        id: user.id,
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified,
        image: user.image,
        role: user.role,
        title: user.title,
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        mobile: user.mobile,
        openForm: user.openForm,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      })
      .from(user)
      .where(eq(user.id, session.session.userId));

    if (!u) {
      return null;
    }

    return {
      ...session,
      user: u,
    } as const;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
});

// ใช้ใน layout/page และ redirect ถ้าไม่ได้ login
export const getSessionOrRedirect = cache(async () => {
  const data = await getSession();

  if (!data) {
    redirect("/auth/login");
  }

  return data;
});
