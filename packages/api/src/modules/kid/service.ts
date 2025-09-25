import { db } from '@repo/db'
import { kid, userKids } from '@repo/db/schemas'
import { asc, eq } from 'drizzle-orm'

import type { createKid, updateKid, createUserKid } from './models'

export const Kids = {
  getAllKids: async () => {
    return await db.query.kid.findMany({
      orderBy: [asc(kid.createdAt)],
    })
  },

  getUserKids: async (userId: string) => {
    return await db.query.userKids.findMany({
      where: eq(userKids.userId, userId),
      with: {
        kid: true,
      },
      orderBy: [asc(userKids.createdAt)],
    })
  },

  getKid: async (kidId: string) => {
    return await db.query.kid.findFirst({ where: eq(kid.id, kidId) })
  },

  createKid: async (kidData: createKid) => {
    return await db.insert(kid).values(kidData)
  },

  updateKid: async (kidId: string, kidData: updateKid) => {
    return await db.update(kid).set(kidData).where(eq(kid.id, kidId))
  },

  deleteKid: async (kidId: string) => {
    return await db.delete(kid).where(eq(kid.id, kidId))
  },

  createUserKid: async (userId: string, userKidData: createUserKid) => {
    return await db.insert(userKids).values({ userId, ...userKidData })
  },

  deleteUserKid: async (userId: string, kidId: string) => {
    return await db.delete(userKids).where(
      eq(userKids.userId, userId) && eq(userKids.kidId, kidId)
    )
  },
}