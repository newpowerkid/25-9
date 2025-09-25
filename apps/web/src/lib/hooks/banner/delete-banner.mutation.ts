import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '~/lib/treaty'

import type { Banner } from './get-banners.query'
import { bannerQueryKeys } from './query-keys'

export const useDeleteBannerMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id: string) => {
            const { error } = await api.banners({ id }).delete()
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
            queryClient.cancelQueries({ queryKey: bannerQueryKeys.list() })

            const previousBanners = queryClient.getQueryData<Banner[]>(
                bannerQueryKeys.list()
            )

            queryClient.setQueryData(bannerQueryKeys.list(), (old: Banner[]): Banner[] =>
                old.filter((banner) => banner.id !== id)
            )

            return { previousBanners }
        },
        onError: (_, __, context) => {
            queryClient.setQueryData(bannerQueryKeys.list(), context?.previousBanners)
        },
    })
}