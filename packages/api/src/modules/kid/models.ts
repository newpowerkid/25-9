import { titleKidEnum, typeKidEnum, nationalityEnum, socialMediaEnum } from '@repo/db/schemas'
import { t } from 'elysia'

export const createKid = t.Object({
  studentId: t.Optional(t.String()),
  nickName: t.Optional(t.String()),
  identity: t.Optional(t.String()),
  title: t.Optional(
    t.Union([
      t.Literal(titleKidEnum.enumValues[0]),
      t.Literal(titleKidEnum.enumValues[1]),
    ])
  ),
  firstName: t.Optional(t.String()),
  lastName: t.Optional(t.String()),
  birthDay: t.Optional(t.Date()),
  comment: t.Optional(t.String()),
  nationality: t.Optional(
    t.Union(nationalityEnum.enumValues.map(val => t.Literal(val)))
  ),
  socialMedia: t.Optional(
    t.Union([
      t.Literal(socialMediaEnum.enumValues[0]),
      t.Literal(socialMediaEnum.enumValues[1]),
    ])
  ),
  kidType: t.Optional(
    t.Union(typeKidEnum.enumValues.map(val => t.Literal(val)))
  ),
})

export type createKid = typeof createKid.static

export const updateKid = t.Optional(
  t.Object({
    studentId: t.Optional(t.String()),
    nickName: t.Optional(t.String()),
    identity: t.Optional(t.String()),
    title: t.Optional(
      t.Union([
        t.Literal(titleKidEnum.enumValues[0]),
        t.Literal(titleKidEnum.enumValues[1]),
      ])
    ),
    firstName: t.Optional(t.String()),
    lastName: t.Optional(t.String()),
    birthDay: t.Optional(t.Date()),
    comment: t.Optional(t.String()),
    nationality: t.Optional(
      t.Union(nationalityEnum.enumValues.map(val => t.Literal(val)))
    ),
    socialMedia: t.Optional(
      t.Union([
        t.Literal(socialMediaEnum.enumValues[0]),
        t.Literal(socialMediaEnum.enumValues[1]),
      ])
    ),
    kidType: t.Optional(
      t.Union(typeKidEnum.enumValues.map(val => t.Literal(val)))
    ),
  })
)

export type updateKid = typeof updateKid.static

export const createUserKid = t.Object({
  kidId: t.String(),
})

export type createUserKid = typeof createUserKid.static