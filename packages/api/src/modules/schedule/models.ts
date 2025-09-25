import { classNameEnum, daysEnum } from '@repo/db/schemas'
import { t } from 'elysia'

export const createSchedule = t.Object({
  classesName: t.Optional(
    t.Union([
      t.Literal(classNameEnum.enumValues[0]),
      t.Literal(classNameEnum.enumValues[1]),
      t.Literal(classNameEnum.enumValues[2]),
      t.Literal(classNameEnum.enumValues[3]),
      t.Literal(classNameEnum.enumValues[4]),
      t.Literal(classNameEnum.enumValues[5]),
      t.Literal(classNameEnum.enumValues[6]),
      t.Literal(classNameEnum.enumValues[7]),
    ])
  ),
  ages: t.Optional(t.String()),
  monday: t.Optional(t.String()),
  tuesday: t.Optional(t.String()),
  wednesday: t.Optional(t.String()),
  thursday: t.Optional(t.String()),
  friday: t.Optional(t.String()),
  saturday: t.Optional(t.String()),
  sunday: t.Optional(t.String()),
  days: t.Optional(
    t.Union([
      t.Literal(daysEnum.enumValues[0]),
      t.Literal(daysEnum.enumValues[1]),
      t.Literal(daysEnum.enumValues[2]),
      t.Literal(daysEnum.enumValues[3]),
      t.Literal(daysEnum.enumValues[4]),
      t.Literal(daysEnum.enumValues[5]),
      t.Literal(daysEnum.enumValues[6]),
    ])
  ),
})

export type createSchedule = typeof createSchedule.static

export const updateSchedule = t.Optional(
  t.Object({
    classesName: t.Optional(
      t.Union([
        t.Literal(classNameEnum.enumValues[0]),
        t.Literal(classNameEnum.enumValues[1]),
        t.Literal(classNameEnum.enumValues[2]),
        t.Literal(classNameEnum.enumValues[3]),
        t.Literal(classNameEnum.enumValues[4]),
        t.Literal(classNameEnum.enumValues[5]),
        t.Literal(classNameEnum.enumValues[6]),
        t.Literal(classNameEnum.enumValues[7]),
      ])
    ),
    ages: t.Optional(t.String()),
    monday: t.Optional(t.String()),
    tuesday: t.Optional(t.String()),
    wednesday: t.Optional(t.String()),
    thursday: t.Optional(t.String()),
    friday: t.Optional(t.String()),
    saturday: t.Optional(t.String()),
    sunday: t.Optional(t.String()),
    days: t.Optional(
      t.Union([
        t.Literal(daysEnum.enumValues[0]),
        t.Literal(daysEnum.enumValues[1]),
        t.Literal(daysEnum.enumValues[2]),
        t.Literal(daysEnum.enumValues[3]),
        t.Literal(daysEnum.enumValues[4]),
        t.Literal(daysEnum.enumValues[5]),
        t.Literal(daysEnum.enumValues[6]),
      ])
    ),
  })
)

export type updateSchedule = typeof updateSchedule.static