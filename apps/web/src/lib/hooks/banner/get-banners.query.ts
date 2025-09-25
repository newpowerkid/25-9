import { queryOptions, useQuery } from '@tanstack/react-query'

import { FIVE_MINUTES } from '~/lib/constants/time'
import { api } from '~/lib/treaty'

import { bannerQueryKeys } from './query-keys'

export type Banner = NonNullable<
    Awaited<ReturnType<typeof api.banners.get>>['data']
>[number]

export const bannersOptions = queryOptions({
    queryFn: async () => {
        const { data, error } = await api.banners.get()

        if (error) {
            throw new Error('Failed to fetch banners')
        }

        return data
    },
    queryKey: bannerQueryKeys.list(),
    staleTime: FIVE_MINUTES,
})

export const useGetBannersQuery = (options: { enabled?: boolean } = {}) => {
    return useQuery({ ...bannersOptions, ...options })
}