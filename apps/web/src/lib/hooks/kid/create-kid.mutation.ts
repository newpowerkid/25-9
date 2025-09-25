import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '~/lib/treaty'

import { kidQueryKeys } from './query-keys'
import { handleApiError } from '../utils/error-handler'

export const useCreateKidMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (kid: Parameters<typeof api.kids.post>[0]) => {
            const { error } = await api.kids.post(kid)

            if (error) {
                throw new Error('Bad request', { cause: JSON.stringify(error.value) })
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: kidQueryKeys.list() })
        },
    })
}

export const useCreateUserKidMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (userKid: { kidId: string }) => {
            const { error } = await api.kids.user.post(userKid)

            if (error) {
                throw new Error('Bad request', { cause: JSON.stringify(error.value) })
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: kidQueryKeys.userKids() })
        },
    })
}