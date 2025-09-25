import { paidByEnum } from '@repo/db/schemas'
import { t } from 'elysia'

export const createBill = t.Object({
  kidId: t.Optional(t.String()),
  paidBy: t.Optional(
    t.Union([
      t.Literal(paidByEnum.enumValues[0]),
      t.Literal(paidByEnum.enumValues[1]),
      t.Literal(paidByEnum.enumValues[2]),
    ])
  ),
  reportId: t.Optional(t.String()),
  classBill: t.Optional(t.String()),
  isPaid: t.Optional(t.Boolean()),
  totalPaid: t.Optional(t.String()),
  comment: t.Optional(t.String()),
})

export type createBill = typeof createBill.static

export const updateBill = t.Optional(
  t.Object({
    kidId: t.Optional(t.String()),
    paidBy: t.Optional(
      t.Union([
        t.Literal(paidByEnum.enumValues[0]),
        t.Literal(paidByEnum.enumValues[1]),
        t.Literal(paidByEnum.enumValues[2]),
      ])
    ),
    reportId: t.Optional(t.String()),
    classBill: t.Optional(t.String()),
    isPaid: t.Optional(t.Boolean()),
    totalPaid: t.Optional(t.String()),
    comment: t.Optional(t.String()),
  })
)

export type updateBill = typeof updateBill.static

export const createBillPrice = t.Object({
  billId: t.String(),
  priceId: t.String(),
  quantity: t.Optional(t.Number()),
  plusAndMinus: t.Optional(t.Number()),
  discountAmt: t.Optional(t.String()),
  discountPct: t.Optional(t.String()),
  startDate: t.Optional(t.Date()),
  expiryDate: t.Optional(t.Date()),
})

export type createBillPrice = typeof createBillPrice.static

export const createBillBooking = t.Object({
  kidId: t.String(),
  priceId: t.String(),
  billId: t.String(),
  remainingLessons: t.Optional(t.Number()),
  expiryDate: t.Optional(t.Date()),
})

export type createBillBooking = typeof createBillBooking.static