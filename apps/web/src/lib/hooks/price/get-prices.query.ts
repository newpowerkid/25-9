import { queryOptions, useQuery } from '@tanstack/react-query'

import { FIVE_MINUTES } from '~/lib/constants/time'
import { api } from '~/lib/treaty'

import { priceQueryKeys } from './query-keys'

export type Price = NonNullable<
    Awaited<ReturnType<typeof api.prices.get>>['data']
>[number]

export const pricesOptions = queryOptions({
    queryFn: async () => {
        const { data, error } = await api.prices.get()

        if (error) {
            throw new Error('Failed to fetch prices')
        }

        return data
    },
    queryKey: priceQueryKeys.list(),
    staleTime: FIVE_MINUTES,
})

export const useGetPricesQuery = (options: { enabled?: boolean } = {}) => {
    return useQuery({ ...pricesOptions, ...options })
}