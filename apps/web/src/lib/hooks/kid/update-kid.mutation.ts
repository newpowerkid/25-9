import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '~/lib/treaty'

import type { Kid } from './get-kids.query'
import { kidQueryKeys } from './query-keys'
import type { KidNationality, KidType, KidTitle, SocialMedia } from './types'

export const useUpdateKidMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            id,
            ...kid
        }: {
            id: string
        } & any) => {
            const { error } = await api.kids({ id }).patch(kid)
            if (error) {
                switch (error.status) {
                    case 422:
                        throw new Error('Parsing error', { cause: JSON.stringify(error.value) })
                    default:
                        throw new Error(JSON.stringify(error.value))
                }
            }
            return
        },
        onMutate: ({ id, ...data }) => {
            queryClient.cancelQueries({ queryKey: kidQueryKeys.list() })

            const previousKids = queryClient.getQueryData<Kid[]>(
                kidQueryKeys.list()
            )

            queryClient.setQueryData(kidQueryKeys.list(), (old: Kid[]): Kid[] =>
                old.map((kid) => {
                    if (kid.id === id) {
                        return { ...kid, ...data }
                    }
                    return kid
                })
            )

            return { previousKids }
        },
        onError: (_, __, context) => {
            queryClient.setQueryData(kidQueryKeys.list(), context?.previousKids)
        },
    })
}