import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '~/lib/treaty'

import type { Price } from './get-prices.query'
import { priceQueryKeys } from './query-keys'

export const useUpdatePriceMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            id,
            ...price
        }: {
            id: string
            list?: string
            noLessons?: number
            checkbox?: boolean
            price?: string
            durationMonths?: number
            unlimited?: boolean
            categoryPrice?: 'Membership' | 'Lessons' | 'Etc'
        }) => {
            const { error } = await api.prices({ id }).patch(price)
            if (error) {
                switch (error.status) {
                    case 422:
                        throw new Error('Parsing error', { cause: error.value })
                    default:
                        throw new Error(error.value)
                }
            }
            return
        },
        onMutate: ({ id, ...data }) => {
            queryClient.cancelQueries({ queryKey: priceQueryKeys.list() })

            const previousPrices = queryClient.getQueryData<Price[]>(
                priceQueryKeys.list()
            )

            queryClient.setQueryData(priceQueryKeys.list(), (old: Price[]): Price[] =>
                old.map((price) => {
                    if (price.id === id) {
                        return { ...price, ...data }
                    }
                    return price
                })
            )

            return { previousPrices }
        },
        onError: (_, __, context) => {
            queryClient.setQueryData(priceQueryKeys.list(), context?.previousPrices)
        },
    })
}