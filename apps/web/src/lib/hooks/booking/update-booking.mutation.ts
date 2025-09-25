import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '~/lib/treaty'

import type { Booking } from './get-bookings.query'
import { bookingQueryKeys } from './query-keys'

export const useUpdateBookingMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            id,
            ...booking
        }: {
            id: string
            kidId?: string
            billBookingId?: string
            use?: boolean
            comment?: string
            dateBooking?: Date
            timeBooking?: string
            classBooking?: string
            status?: 'Pending' | 'Confirmed' | 'Cancelled'
        }) => {
            const { error } = await api.bookings({ id }).patch(booking)
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
            queryClient.cancelQueries({ queryKey: bookingQueryKeys.list() })

            const previousBookings = queryClient.getQueryData<Booking[]>(
                bookingQueryKeys.list()
            )

            queryClient.setQueryData(bookingQueryKeys.list(), (old: Booking[]): Booking[] =>
                old.map((booking) => {
                    if (booking.id === id) {
                        return { ...booking, ...data }
                    }
                    return booking
                })
            )

            return { previousBookings }
        },
        onError: (_, __, context) => {
            queryClient.setQueryData(bookingQueryKeys.list(), context?.previousBookings)
        },
    })
}