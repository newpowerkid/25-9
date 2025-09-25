import { queryOptions, useQuery } from '@tanstack/react-query'

import { FIVE_MINUTES } from '~/lib/constants/time'
import { api } from '~/lib/treaty'

import { bookingQueryKeys } from './query-keys'

export type Booking = NonNullable<
    Awaited<ReturnType<typeof api.bookings.get>>['data']
>[number]

export const bookingsOptions = queryOptions({
    queryFn: async () => {
        const { data, error } = await api.bookings.get()

        if (error) {
            throw new Error('Failed to fetch bookings')
        }

        return data
    },
    queryKey: bookingQueryKeys.list(),
    staleTime: FIVE_MINUTES,
})

export const bookingsByKidOptions = (kidId: string) => queryOptions({
    queryFn: async () => {
        const { data, error } = await api.bookings.kid({ kidId }).get()

        if (error) {
            throw new Error('Failed to fetch bookings by kid')
        }

        return data
    },
    queryKey: bookingQueryKeys.byKid(kidId),
    staleTime: FIVE_MINUTES,
})

export const useGetBookingsQuery = (options: { enabled?: boolean } = {}) => {
    return useQuery({ ...bookingsOptions, ...options })
}

export const useGetBookingsByKidQuery = (kidId: string, options: { enabled?: boolean } = {}) => {
    return useQuery({ ...bookingsByKidOptions(kidId), ...options })
}