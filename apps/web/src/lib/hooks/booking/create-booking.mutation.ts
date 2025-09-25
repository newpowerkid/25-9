import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '~/lib/treaty'

import { bookingQueryKeys } from './query-keys'
import type { BookingStatus } from './types'

export const useCreateBookingMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (booking: {
            kidId?: string
            billBookingId?: string
            use?: boolean
            comment?: string
            dateBooking: Date
            timeBooking?: string
            classBooking?: string
            status?: BookingStatus
        }) => {
            const { error } = await api.bookings.post(booking)

            if (error) {
                throw new Error('Bad request', { cause: error.value })
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: bookingQueryKeys.list() })
        },
    })
}