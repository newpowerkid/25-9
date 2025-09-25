import { db } from '@repo/db'
import { booking } from '@repo/db/schemas'
import { asc, eq } from 'drizzle-orm'

import type { createBooking, updateBooking } from './models'

export const Bookings = {
  getAllBookings: async () => {
    return await db.query.booking.findMany({
      orderBy: [asc(booking.createdAt)],
      with: {
        kid: true,
        billBooking: true,
      },
    })
  },

  getBooking: async (bookingId: string) => {
    return await db.query.booking.findFirst({ 
      where: eq(booking.id, bookingId),
      with: {
        kid: true,
        billBooking: true,
      },
    })
  },

  getBookingsByKid: async (kidId: string) => {
    return await db.query.booking.findMany({
      where: eq(booking.kidId, kidId),
      orderBy: [asc(booking.dateBooking)],
      with: {
        kid: true,
        billBooking: true,
      },
    })
  },

  createBooking: async (bookingData: createBooking) => {
    return await db.insert(booking).values(bookingData)
  },

  updateBooking: async (bookingId: string, bookingData: updateBooking) => {
    return await db.update(booking).set(bookingData).where(eq(booking.id, bookingId))
  },

  deleteBooking: async (bookingId: string) => {
    return await db.delete(booking).where(eq(booking.id, bookingId))
  },
}