import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '~/lib/treaty'

import type { Booking } from './get-bookings.query'
import { bookingQueryKeys } from './query-keys'

export const useDeleteBookingMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id: string) => {
            const { error } = await api.bookings({ id }).delete()
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
            queryClient.cancelQueries({ queryKey: bookingQueryKeys.list() })

            const previousBookings = queryClient.getQueryData<Booking[]>(
                bookingQueryKeys.list()
            )

            queryClient.setQueryData(bookingQueryKeys.list(), (old: Booking[]): Booking[] =>
                old.filter((booking) => booking.id !== id)
            )

            return { previousBookings }
        },
        onError: (_, __, context) => {
            queryClient.setQueryData(bookingQueryKeys.list(), context?.previousBookings)
        },
    })
}