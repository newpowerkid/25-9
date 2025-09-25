import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '~/lib/treaty'

import { bannerQueryKeys } from './query-keys'

export const useCreateBannerMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (banner: {
            title?: string
            imageString: string
            description?: string
        }) => {
            const { error } = await api.banners.post(banner)

            if (error) {
                throw new Error('Bad request', { cause: error.value })
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: bannerQueryKeys.list() })
        },
    })
}