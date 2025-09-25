import { queryOptions, useQuery } from '@tanstack/react-query'

import { FIVE_MINUTES } from '~/lib/constants/time'
import { api } from '~/lib/treaty'

import { billQueryKeys } from './query-keys'

export const billsOptions = queryOptions({
    queryFn: async () => {
        const { data, error } = await api.bills.get()

        if (error) {
            throw new Error('Failed to fetch bills')
        }

        return data
    },
    queryKey: billQueryKeys.list(),
    staleTime: FIVE_MINUTES,
})

export const billsByKidOptions = (kidId: string) => queryOptions({
    queryFn: async () => {
        const { data, error } = await api.bills.kid({ kidId }).get()

        if (error) {
            throw new Error('Failed to fetch bills by kid')
        }

        return data
    },
    queryKey: billQueryKeys.byKid(kidId),
    staleTime: FIVE_MINUTES,
})

export const billPricesOptions = (billId: string) => queryOptions({
    queryFn: async () => {
        const { data, error } = await api.bills({ id: billId }).prices.get()

        if (error) {
            throw new Error('Failed to fetch bill prices')
        }

        return data
    },
    queryKey: billQueryKeys.prices(billId),
    staleTime: FIVE_MINUTES,
})

export const billBookingsOptions = (billId: string) => queryOptions({
    queryFn: async () => {
        const { data, error } = await api.bills({ id: billId }).bookings.get()

        if (error) {
            throw new Error('Failed to fetch bill bookings')
        }

        return data
    },
    queryKey: billQueryKeys.bookings(billId),
    staleTime: FIVE_MINUTES,
})

export const useGetBillsQuery = (options: { enabled?: boolean } = {}) => {
    return useQuery({ ...billsOptions, ...options })
}

export const useGetBillsByKidQuery = (kidId: string, options: { enabled?: boolean } = {}) => {
    return useQuery({ ...billsByKidOptions(kidId), ...options })
}

export const useGetBillPricesQuery = (billId: string, options: { enabled?: boolean } = {}) => {
    return useQuery({ ...billPricesOptions(billId), ...options })
}

export const useGetBillBookingsQuery = (billId: string, options: { enabled?: boolean } = {}) => {
    return useQuery({ ...billBookingsOptions(billId), ...options })
}