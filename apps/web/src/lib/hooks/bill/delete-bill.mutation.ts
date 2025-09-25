import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '~/lib/treaty'

import type { Bill } from './types'
import { billQueryKeys } from './query-keys'
import { handleApiError } from '../utils/error-handler'

export const useDeleteBillMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id: string) => {
            const { error } = await api.bills({ id }).delete()
            if (error) {
                handleApiError(error, 'Failed to delete bill')
            }
            return
        },
        onMutate: (id) => {
            queryClient.cancelQueries({ queryKey: billQueryKeys.list() })

            const previousBills = queryClient.getQueryData<Bill[]>(
                billQueryKeys.list()
            )

            queryClient.setQueryData(billQueryKeys.list(), (old: Bill[]): Bill[] =>
                old.filter((bill) => bill.id !== id)
            )

            return { previousBills }
        },
        onError: (_, __, context) => {
            queryClient.setQueryData(billQueryKeys.list(), context?.previousBills)
        },
    })
}

export const useDeleteBillPriceMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (priceId: string) => {
            const { error } = await api.bills.prices({ priceId }).delete()
            if (error) {
                handleApiError(error, 'Failed to delete bill price')
            }
            return
        },
        onSuccess: () => {
            // Invalidate all bill prices queries since we don't know which bill this price belonged to
            queryClient.invalidateQueries({ queryKey: billQueryKeys.all })
        },
    })
}

export const useDeleteBillBookingMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (bookingId: string) => {
            const { error } = await api.bills.bookings({ bookingId }).delete()
            if (error) {
                handleApiError(error, 'Failed to delete bill booking')
            }
            return
        },
        onSuccess: () => {
            // Invalidate all bill bookings queries since we don't know which bill this booking belonged to
            queryClient.invalidateQueries({ queryKey: billQueryKeys.all })
        },
    })
}