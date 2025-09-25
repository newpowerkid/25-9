import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '~/lib/treaty'

import { priceQueryKeys } from './query-keys'
import type { PriceCategory } from './types'

export const useCreatePriceMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (price: {
            list?: string
            noLessons?: number
            checkbox: boolean
            price?: string
            durationMonths?: number
            unlimited?: boolean
            categoryPrice?: PriceCategory
        }) => {
            const { error } = await api.prices.post(price)

            if (error) {
                throw new Error('Bad request', { cause: error.value })
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: priceQueryKeys.list() })
        },
    })
}