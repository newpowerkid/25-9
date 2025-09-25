import { db } from '@repo/db'
import { price } from '@repo/db/schemas'
import { asc, eq } from 'drizzle-orm'

import type { createPrice, updatePrice } from './models'

export const Prices = {
  getAllPrices: async () => {
    return await db.query.price.findMany({
      orderBy: [asc(price.createdAt)],
    })
  },

  getPrice: async (priceId: string) => {
    return await db.query.price.findFirst({ where: eq(price.id, priceId) })
  },

  createPrice: async (priceData: createPrice) => {
    return await db.insert(price).values(priceData)
  },

  updatePrice: async (priceId: string, priceData: updatePrice) => {
    return await db.update(price).set(priceData).where(eq(price.id, priceId))
  },

  deletePrice: async (priceId: string) => {
    return await db.delete(price).where(eq(price.id, priceId))
  },
}