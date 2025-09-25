import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '~/lib/treaty'

import type { Schedule } from './get-schedules.query'
import { scheduleQueryKeys } from './query-keys'
import { handleApiError } from '../utils/error-handler'

export const useDeleteScheduleMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id: string) => {
            const { error } = await api.schedules({ id }).delete()
            if (error) {
                handleApiError(error, 'Failed to delete schedule')
            }
            return
        },
        onMutate: (id) => {
            queryClient.cancelQueries({ queryKey: scheduleQueryKeys.list() })

            const previousSchedules = queryClient.getQueryData<Schedule[]>(
                scheduleQueryKeys.list()
            )

            queryClient.setQueryData(scheduleQueryKeys.list(), (old: Schedule[]): Schedule[] =>
                old.filter((schedule) => schedule.id !== id)
            )

            return { previousSchedules }
        },
        onError: (_, __, context) => {
            queryClient.setQueryData(scheduleQueryKeys.list(), context?.previousSchedules)
        },
    })
}