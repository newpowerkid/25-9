import { statusEnum } from '@repo/db/schemas'
import { t } from 'elysia'

export const createBooking = t.Object({
  kidId: t.Optional(t.String()),
  billBookingId: t.Optional(t.String()),
  use: t.Optional(t.Boolean()),
  comment: t.Optional(t.String()),
  dateBooking: t.Date(),
  timeBooking: t.Optional(t.String()),
  classBooking: t.Optional(t.String()),
  status: t.Optional(
    t.Union([
      t.Literal(statusEnum.enumValues[0]),
      t.Literal(statusEnum.enumValues[1]),
      t.Literal(statusEnum.enumValues[2]),
    ])
  ),
})

export type createBooking = typeof createBooking.static

export const updateBooking = t.Optional(
  t.Object({
    kidId: t.Optional(t.String()),
    billBookingId: t.Optional(t.String()),
    use: t.Optional(t.Boolean()),
    comment: t.Optional(t.String()),
    dateBooking: t.Optional(t.Date()),
    timeBooking: t.Optional(t.String()),
    classBooking: t.Optional(t.String()),
    status: t.Optional(
      t.Union([
        t.Literal(statusEnum.enumValues[0]),
        t.Literal(statusEnum.enumValues[1]),
        t.Literal(statusEnum.enumValues[2]),
      ])
    ),
  })
)

export type updateBooking = typeof updateBooking.static