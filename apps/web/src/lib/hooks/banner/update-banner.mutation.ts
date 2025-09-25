import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '~/lib/treaty'

import type { Banner } from './get-banners.query'
import { bannerQueryKeys } from './query-keys'

export const useUpdateBannerMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            id,
            ...banner
        }: {
            id: string
            title?: string
            imageString?: string
            description?: string
        }) => {
            const { error } = await api.banners({ id }).patch(banner)
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
            queryClient.cancelQueries({ queryKey: bannerQueryKeys.list() })

            const previousBanners = queryClient.getQueryData<Banner[]>(
                bannerQueryKeys.list()
            )

            queryClient.setQueryData(bannerQueryKeys.list(), (old: Banner[]): Banner[] =>
                old.map((banner) => {
                    if (banner.id === id) {
                        return { ...banner, ...data }
                    }
                    return banner
                })
            )

            return { previousBanners }
        },
        onError: (_, __, context) => {
            queryClient.setQueryData(bannerQueryKeys.list(), context?.previousBanners)
        },
    })
}