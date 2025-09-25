import { t } from 'elysia'

export const createBanner = t.Object({
  title: t.Optional(t.String()),
  imageString: t.String(),
  description: t.Optional(t.String()),
})

export type createBanner = typeof createBanner.static

export const updateBanner = t.Optional(
  t.Object({
    title: t.Optional(t.String()),
    imageString: t.Optional(t.String()),
    description: t.Optional(t.String()),
  })
)

export type updateBanner = typeof updateBanner.static