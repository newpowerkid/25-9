import { db } from '@repo/db'
import { banner } from '@repo/db/schemas'
import { asc, eq } from 'drizzle-orm'

import type { createBanner, updateBanner } from './models'

export const Banners = {
  getAllBanners: async () => {
    return await db.query.banner.findMany({
      orderBy: [asc(banner.createdAt)],
    })
  },

  getBanner: async (bannerId: string) => {
    return await db.query.banner.findFirst({ where: eq(banner.id, bannerId) })
  },

  createBanner: async (bannerData: createBanner) => {
    return await db.insert(banner).values(bannerData)
  },

  updateBanner: async (bannerId: string, bannerData: updateBanner) => {
    return await db.update(banner).set(bannerData).where(eq(banner.id, bannerId))
  },

  deleteBanner: async (bannerId: string) => {
    return await db.delete(banner).where(eq(banner.id, bannerId))
  },
}