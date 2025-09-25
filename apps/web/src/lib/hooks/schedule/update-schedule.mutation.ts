import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '~/lib/treaty'

import type { Schedule } from './get-schedules.query'
import { scheduleQueryKeys } from './query-keys'
import { handleApiError } from '../utils/error-handler'

export const useUpdateScheduleMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            id,
            ...schedule
        }: {
            id: string
            classesName?: 'Bugs' | 'Birds' | 'Beasts' | 'SuperBeasts' | 'FunnyBugs' | 'GiggleWorms' | 'GoodFriends' | 'FlipsHotshots'
            ages?: string
            monday?: string
            tuesday?: string
            wednesday?: string
            thursday?: string
            friday?: string
            saturday?: string
            sunday?: string
            days?: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'
        }) => {
            const { error } = await api.schedules({ id }).patch(schedule)
            if (error) {
                handleApiError(error, 'Failed to update schedule')
            }
            return
        },
        onMutate: ({ id, ...data }) => {
            queryClient.cancelQueries({ queryKey: scheduleQueryKeys.list() })

            const previousSchedules = queryClient.getQueryData<Schedule[]>(
                scheduleQueryKeys.list()
            )

            queryClient.setQueryData(scheduleQueryKeys.list(), (old: Schedule[]): Schedule[] =>
                old.map((schedule) => {
                    if (schedule.id === id) {
                        return { ...schedule, ...data }
                    }
                    return schedule
                })
            )

            return { previousSchedules }
        },
        onError: (_, __, context) => {
            queryClient.setQueryData(scheduleQueryKeys.list(), context?.previousSchedules)
        },
    })
}