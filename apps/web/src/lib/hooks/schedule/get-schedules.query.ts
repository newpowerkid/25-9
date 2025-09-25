import { queryOptions, useQuery } from '@tanstack/react-query'

import { FIVE_MINUTES } from '~/lib/constants/time'
import { api } from '~/lib/treaty'

import { scheduleQueryKeys } from './query-keys'
import { handleApiError } from '../utils/error-handler'

export type Schedule = NonNullable<
    Awaited<ReturnType<typeof api.schedules.get>>['data']
>[number]

export const schedulesOptions = queryOptions({
    queryFn: async () => {
        const { data, error } = await api.schedules.get()

        if (error) {
            handleApiError(error, 'Failed to fetch schedules')
        }

        return data
    },
    queryKey: scheduleQueryKeys.list(),
    staleTime: FIVE_MINUTES,
})

export const useGetSchedulesQuery = (options: { enabled?: boolean } = {}) => {
    return useQuery({ ...schedulesOptions, ...options })
}