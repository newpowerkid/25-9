import { categoryPriceEnum } from '@repo/db/schemas'
import { t } from 'elysia'

export const createPrice = t.Object({
  list: t.Optional(t.String()),
  noLessons: t.Optional(t.Number()),
  checkbox: t.Boolean(),
  price: t.Optional(t.String()),
  durationMonths: t.Optional(t.Number()),
  unlimited: t.Optional(t.Boolean()),
  categoryPrice: t.Optional(
    t.Union([
      t.Literal(categoryPriceEnum.enumValues[0]),
      t.Literal(categoryPriceEnum.enumValues[1]),
      t.Literal(categoryPriceEnum.enumValues[2]),
    ])
  ),
})

export type createPrice = typeof createPrice.static

export const updatePrice = t.Optional(
  t.Object({
    list: t.Optional(t.String()),
    noLessons: t.Optional(t.Number()),
    checkbox: t.Optional(t.Boolean()),
    price: t.Optional(t.String()),
    durationMonths: t.Optional(t.Number()),
    unlimited: t.Optional(t.Boolean()),
    categoryPrice: t.Optional(
      t.Union([
        t.Literal(categoryPriceEnum.enumValues[0]),
        t.Literal(categoryPriceEnum.enumValues[1]),
        t.Literal(categoryPriceEnum.enumValues[2]),
      ])
    ),
  })
)

export type updatePrice = typeof updatePrice.static