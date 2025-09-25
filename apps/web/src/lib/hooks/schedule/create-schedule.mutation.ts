import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '~/lib/treaty'

import { scheduleQueryKeys } from './query-keys'
import type { ScheduleClassName, ScheduleDay } from './types'
import { handleApiError } from '../utils/error-handler'

export const useCreateScheduleMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (schedule: {
            classesName?: ScheduleClassName
            ages?: string
            monday?: string
            tuesday?: string
            wednesday?: string
            thursday?: string
            friday?: string
            saturday?: string
            sunday?: string
            days?: ScheduleDay
        }) => {
            const { error } = await api.schedules.post(schedule)

            if (error) {
                handleApiError(error, 'Failed to create schedule')
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: scheduleQueryKeys.list() })
        },
    })
}