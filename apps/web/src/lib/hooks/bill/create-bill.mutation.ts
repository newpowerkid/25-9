import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '~/lib/treaty'

import { billQueryKeys } from './query-keys'
import type { BillPaidBy } from './types'

export const useCreateBillMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (bill: {
            kidId?: string
            paidBy?: BillPaidBy
            reportId?: string
            classBill?: string
            isPaid?: boolean
            totalPaid?: string
            comment?: string
        }) => {
            const { error } = await api.bills.post(bill)

            if (error) {
                throw new Error('Bad request', { cause: error.value })
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: billQueryKeys.list() })
        },
    })
}

export const useCreateBillPriceMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ billId, ...billPrice }: {
            billId: string
            priceId: string
            quantity?: number
            plusAndMinus?: number
            discountAmt?: string
            discountPct?: string
            startDate?: Date
            expiryDate?: Date
        }) => {
            const { error } = await api.bills({ id: billId }).prices.post(billPrice)

            if (error) {
                throw new Error('Bad request', { cause: error.value })
            }
        },
        onSuccess: (_, { billId }) => {
            queryClient.invalidateQueries({ queryKey: billQueryKeys.prices(billId) })
        },
    })
}

export const useCreateBillBookingMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ billId, ...billBooking }: {
            billId: string
            kidId: string
            priceId: string
            remainingLessons?: number
            expiryDate?: Date
        }) => {
            const { error } = await api.bills({ id: billId }).bookings.post(billBooking)

            if (error) {
                throw new Error('Bad request', { cause: error.value })
            }
        },
        onSuccess: (_, { billId }) => {
            queryClient.invalidateQueries({ queryKey: billQueryKeys.bookings(billId) })
        },
    })
}