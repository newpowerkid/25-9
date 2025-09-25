import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '~/lib/treaty'

import type { Kid, UserKid } from './get-kids.query'
import { kidQueryKeys } from './query-keys'

export const useDeleteKidMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id: string) => {
            const { error } = await api.kids({ id }).delete()
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
            queryClient.cancelQueries({ queryKey: kidQueryKeys.list() })

            const previousKids = queryClient.getQueryData<Kid[]>(
                kidQueryKeys.list()
            )

            queryClient.setQueryData(kidQueryKeys.list(), (old: Kid[]): Kid[] =>
                old.filter((kid) => kid.id !== id)
            )

            return { previousKids }
        },
        onError: (_, __, context) => {
            queryClient.setQueryData(kidQueryKeys.list(), context?.previousKids)
        },
    })
}

export const useDeleteUserKidMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (kidId: string) => {
            const { error } = await api.kids.user({ kidId }).delete()
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
        onMutate: (kidId) => {
            queryClient.cancelQueries({ queryKey: kidQueryKeys.userKids() })

            const previousUserKids = queryClient.getQueryData<UserKid[]>(
                kidQueryKeys.userKids()
            )

            queryClient.setQueryData(kidQueryKeys.userKids(), (old: UserKid[]): UserKid[] =>
                old.filter((userKid) => userKid.kidId !== kidId)
            )

            return { previousUserKids }
        },
        onError: (_, __, context) => {
            queryClient.setQueryData(kidQueryKeys.userKids(), context?.previousUserKids)
        },
    })
}