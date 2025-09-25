import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '~/lib/treaty'

import type { Price } from './get-prices.query'
import { priceQueryKeys } from './query-keys'

export const useDeletePriceMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id: string) => {
            const { error } = await api.prices({ id }).delete()
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
        onMutate: (id) => {
            queryClient.cancelQueries({ queryKey: priceQueryKeys.list() })

            const previousPrices = queryClient.getQueryData<Price[]>(
                priceQueryKeys.list()
            )

            queryClient.setQueryData(priceQueryKeys.list(), (old: Price[]): Price[] =>
                old.filter((price) => price.id !== id)
            )

            return { previousPrices }
        },
        onError: (_, __, context) => {
            queryClient.setQueryData(priceQueryKeys.list(), context?.previousPrices)
        },
    })
}