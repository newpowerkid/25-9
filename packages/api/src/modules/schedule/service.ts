import { db } from '@repo/db'
import { schedules } from '@repo/db/schemas'
import { asc, eq } from 'drizzle-orm'

import type { createSchedule, updateSchedule } from './models'

export const Schedules = {
  getAllSchedules: async () => {
    return await db.query.schedules.findMany({
      orderBy: [asc(schedules.createdAt)],
    })
  },

  getSchedule: async (scheduleId: string) => {
    return await db.query.schedules.findFirst({ where: eq(schedules.id, scheduleId) })
  },

  createSchedule: async (scheduleData: createSchedule) => {
    return await db.insert(schedules).values(scheduleData)
  },

  updateSchedule: async (scheduleId: string, scheduleData: updateSchedule) => {
    return await db.update(schedules).set(scheduleData).where(eq(schedules.id, scheduleId))
  },

  deleteSchedule: async (scheduleId: string) => {
    return await db.delete(schedules).where(eq(schedules.id, scheduleId))
  },
}