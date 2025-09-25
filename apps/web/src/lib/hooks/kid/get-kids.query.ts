import { queryOptions, useQuery } from '@tanstack/react-query'

import { FIVE_MINUTES } from '~/lib/constants/time'
import { api } from '~/lib/treaty'

import { kidQueryKeys } from './query-keys'

export type Kid = NonNullable<
    Awaited<ReturnType<typeof api.kids.get>>['data']
>[number]

export type UserKid = NonNullable<
    Awaited<ReturnType<typeof api.kids.user.get>>['data']
>[number]

export const kidsOptions = queryOptions({
    queryFn: async () => {
        const { data, error } = await api.kids.get()

        if (error) {
            throw new Error('Failed to fetch kids')
        }

        return data
    },
    queryKey: kidQueryKeys.list(),
    staleTime: FIVE_MINUTES,
})

export const userKidsOptions = queryOptions({
    queryFn: async () => {
        const { data, error } = await api.kids.user.get()

        if (error) {
            throw new Error('Failed to fetch user kids')
        }

        return data
    },
    queryKey: kidQueryKeys.userKids(),
    staleTime: FIVE_MINUTES,
})

export const useGetKidsQuery = (options: { enabled?: boolean } = {}) => {
    return useQuery({ ...kidsOptions, ...options })
}

export const useGetUserKidsQuery = (options: { enabled?: boolean } = {}) => {
    return useQuery({ ...userKidsOptions, ...options })
}