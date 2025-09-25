import { db } from '@repo/db'
import { bill, billPrice, billBooking } from '@repo/db/schemas'
import { asc, eq } from 'drizzle-orm'

import type { createBill, updateBill, createBillPrice, createBillBooking } from './models'

export const Bills = {
  getAllBills: async () => {
    return await db.query.bill.findMany({
      orderBy: [asc(bill.createdAt)],
      with: {
        kid: true,
      },
    })
  },

  getBill: async (billId: string) => {
    return await db.query.bill.findFirst({ 
      where: eq(bill.id, billId),
      with: {
        kid: true,
      },
    })
  },

  getBillsByKid: async (kidId: string) => {
    return await db.query.bill.findMany({
      where: eq(bill.kidId, kidId),
      orderBy: [asc(bill.createdAt)],
      with: {
        kid: true,
      },
    })
  },

  createBill: async (billData: createBill) => {
    return await db.insert(bill).values(billData)
  },

  updateBill: async (billId: string, billData: updateBill) => {
    return await db.update(bill).set(billData).where(eq(bill.id, billId))
  },

  deleteBill: async (billId: string) => {
    return await db.delete(bill).where(eq(bill.id, billId))
  },

  // Bill Price operations
  getBillPrices: async (billId: string) => {
    return await db.query.billPrice.findMany({
      where: eq(billPrice.billId, billId),
      with: {
        bill: true,
        price: true,
      },
    })
  },

  createBillPrice: async (billPriceData: createBillPrice) => {
    return await db.insert(billPrice).values(billPriceData)
  },

  deleteBillPrice: async (billPriceId: string) => {
    return await db.delete(billPrice).where(eq(billPrice.id, billPriceId))
  },

  // Bill Booking operations
  getBillBookings: async (billId: string) => {
    return await db.query.billBooking.findMany({
      where: eq(billBooking.billId, billId),
      with: {
        kid: true,
        price: true,
        bill: true,
      },
    })
  },

  createBillBooking: async (billBookingData: createBillBooking) => {
    return await db.insert(billBooking).values(billBookingData)
  },

  deleteBillBooking: async (billBookingId: string) => {
    return await db.delete(billBooking).where(eq(billBooking.id, billBookingId))
  },
}