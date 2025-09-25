export const bannerQueryKeys = {
    all: ['banners'] as const,
    item: (id: string) => [...bannerQueryKeys.all, id] as const,
    list: () => [...bannerQueryKeys.all, 'list'] as const,
}